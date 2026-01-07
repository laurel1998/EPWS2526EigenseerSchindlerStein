#include <iostream>

#include <mosquitto.h>
#include <nlohmann/json.hpp>
#include <map>
#include <string>

#include <Antilatency.InterfaceContract.LibraryLoader.h>
#include <Antilatency.DeviceNetwork.h>
#if defined(__linux__)
	#include <dlfcn.h>
#endif
#include <thread>
#include <chrono>

using json = nlohmann::json;

std::map<Antilatency::DeviceNetwork::NodeHandle, std::string> nodeAltIds;

Antilatency::DeviceNetwork::NodeHandle getIdleTrackingNode(Antilatency::DeviceNetwork::INetwork network, Antilatency::Alt::Tracking::ITrackingCotaskConstructor altTrackingCotaskConstructor) {
    // Get all currently connected nodes that support the alt tracking task.
    std::vector<Antilatency::DeviceNetwork::NodeHandle> altNodes = altTrackingCotaskConstructor.findSupportedNodes(network);
    if (altNodes.size() == 0) {
        std::cout << "No nodes with Alt Tracking Task support found" << std::endl;
        return Antilatency::DeviceNetwork::NodeHandle::Null;
    }

    // Return first idle node.
    for (auto node : altNodes) {
        if (network.nodeGetStatus(node) == Antilatency::DeviceNetwork::NodeStatus::Idle) {
            return node;
        }
    }

    std::cout << "No idle nodes with Alt Tracking Task support found" << std::endl;
    return Antilatency::DeviceNetwork::NodeHandle::Null;
}


#if defined(__linux__)
std::string getParentPath(const char *inp){
    auto len = strlen(inp);
    if(len == 0) throw std::runtime_error("no parent path: " + std::string(inp));
    int i = len - 1;
    while(i > 0){
        if(inp[i] == '/'){
            return std::string(inp, inp + i + 1);
        }
        --i;
    }
    throw std::runtime_error("no parent path: " + std::string(inp));
}
#endif

int main(int argc, char* argv[]) {
    if(argc != 3){
        std::cout << "Wrong arguments. Pass environment data string as first argument and placement data as second.";
        return 1;
    }

    const char* mqtt_host = "hivemq.dock.moxd.io";
    const int mqtt_port = 1883;
    const char* mqtt_topic = "antilatency/tracker/pose";

    mosquitto_lib_init();
    
    struct mosquitto *mosq = mosquitto_new(nullptr, true, nullptr);
    if(!mosq){
        std::cerr << "Error: Failed to create mosquitto instance." << std::endl;
        return 1;
    }

    // Connect to the broker
    if(mosquitto_connect(mosq, mqtt_host, mqtt_port, 60) != MOSQ_ERR_SUCCESS){
        std::cerr << "Error: Unable to connect to MQTT broker." << std::endl;
        return 1;
    }

    mosquitto_loop_start(mosq);
    std::cout << "Connected to MQTT Broker at " << mqtt_host << std::endl;

    #if defined(__linux__)
        Dl_info dlinfo;
        dladdr(reinterpret_cast<void*>(&main), &dlinfo);
        std::string path = getParentPath(dlinfo.dli_fname);
        std::string libNameADN = path + "/libAntilatencyDeviceNetwork.so";
        std::string libNameTracking = path + "/libAntilatencyAltTracking.so";
        std::string libNameEnvironmentSelector = path + "/libAntilatencyAltEnvironmentSelector.so";
    #else
        std::string libNameADN = "AntilatencyDeviceNetwork";
        std::string libNameTracking = "AntilatencyAltTracking";
        std::string libNameEnvironmentSelector = "AntilatencyAltEnvironmentSelector";
    #endif

    // Load the Antilatency Device Network library
    Antilatency::DeviceNetwork::ILibrary deviceNetworkLibrary = Antilatency::InterfaceContract::getLibraryInterface<Antilatency::DeviceNetwork::ILibrary>(libNameADN.c_str());
    if (deviceNetworkLibrary == nullptr) {
        std::cout << "Failed to get Antilatency Device Network Library" << std::endl;
        return 1;
    }

    // Load the Antilatency Alt Tracking library
    Antilatency::Alt::Tracking::ILibrary altTrackingLibrary = Antilatency::InterfaceContract::getLibraryInterface<Antilatency::Alt::Tracking::ILibrary>(libNameTracking.c_str());
    if (altTrackingLibrary == nullptr) {
        std::cout << "Failed to get Antilatency Alt Tracking Library" << std::endl;
        return 1;
    }

    // Load the Antilatency Alt Environment Selector library
    Antilatency::Alt::Environment::Selector::ILibrary environmentSelectorLibrary = Antilatency::InterfaceContract::getLibraryInterface<Antilatency::Alt::Environment::Selector::ILibrary>(libNameEnvironmentSelector.c_str());
    if (environmentSelectorLibrary == nullptr) {
        std::cout << "Failed to get Antilatency Alt Environment Selector Library" << std::endl;
        return 1;
    }

    // Create a device network filter and then create a network using that filter.
    Antilatency::DeviceNetwork::IDeviceFilter filter = deviceNetworkLibrary.createFilter();
    filter.addUsbDevice(Antilatency::DeviceNetwork::Constants::AllUsbDevices);
    Antilatency::DeviceNetwork::INetwork network = deviceNetworkLibrary.createNetwork(filter);
    if (network == nullptr) {
        std::cout << "Failed to create Antilatency Device Network" << std::endl;
        return 1;
    }
    std::cout << "Antilatency Device Network created" << std::endl;

    auto environment = environmentSelectorLibrary.createEnvironment(argv[1]);
    auto placement = altTrackingLibrary.createPlacement(argv[2]);
    auto altTrackingCotaskConstructor = altTrackingLibrary.createTrackingCotaskConstructor();

    std::map<Antilatency::DeviceNetwork::NodeHandle, Antilatency::Alt::Tracking::ITrackingCotask> activeTrackers;

    // Each time the device network is changed due to connection or disconnection of a device that matches the device filter of the network,
    // or start or stop of a task on any network device, the network update id is incremented by 1. 
    uint32_t prevUpdateId = 0;

    while (network != nullptr) {
        const uint32_t currentUpdateId = network.getUpdateId();

        if (prevUpdateId != currentUpdateId) {
            prevUpdateId = currentUpdateId;
            std::cout << "--- Network update: " << currentUpdateId << " ---" << std::endl;

            // Remove trackers that have stopped/failed
            for (auto it = activeTrackers.begin(); it != activeTrackers.end(); ) {
                if (it->second.isTaskFinished()) {
                    std::cout << "Tracker task finished (or node disconnected) for Handle: " 
                              << static_cast<int>(it->first) << std::endl;
                    it = activeTrackers.erase(it);
                } else {
                    ++it;
                }
            }

            // Find new idle nodes to start
            std::vector<Antilatency::DeviceNetwork::NodeHandle> supportedNodes = altTrackingCotaskConstructor.findSupportedNodes(network);
            
            for (auto node : supportedNodes) {
                if (activeTrackers.find(node) == activeTrackers.end()) {
                    if (network.nodeGetStatus(node) == Antilatency::DeviceNetwork::NodeStatus::Idle) {
                        
                        std::string customId = network.nodeGetStringProperty(node, "altId");
                        // Fallback: If "altId" is empty, use the numeric handle as a string
                        if (customId.empty()) {
                            customId = std::to_string(static_cast<int>(node));
                        }
                        
                        std::cout << "Starting node " << static_cast<int>(node) << " with Custom ID: " << customId << std::endl;
                        auto cotask = altTrackingCotaskConstructor.startTask(network, node, environment);
                        
                        if (cotask != nullptr) {
                            activeTrackers[node] = cotask;
                            nodeAltIds[node] = customId;
                            break;
                        } else {
                            std::cout << "Failed to start task on node: " << static_cast<int>(node) << std::endl;
                        }
                    }
                }
            }
        }

        // MQTT publish loop
        if (!activeTrackers.empty()) {
            for (auto& [node, cotask] : activeTrackers) {
                if (cotask != nullptr && !cotask.isTaskFinished()) {
                    // Get State
                    Antilatency::Alt::Tracking::State state = cotask.getExtrapolatedState(placement, 0.03f);

                    // Create JSON
                    json j;
                    j["id"] = nodeAltIds[node];
                    j["timestamp"] = std::chrono::duration_cast<std::chrono::milliseconds>(
                        std::chrono::system_clock::now().time_since_epoch()
                    ).count();
                    
                    j["pose"] = {
                        {"position", {{"x", state.pose.position.x}, {"y", state.pose.position.y}, {"z", state.pose.position.z}}},
                        {"rotation", {{"x", state.pose.rotation.x}, {"y", state.pose.rotation.y}, {"z", state.pose.rotation.z}, {"w", state.pose.rotation.w}}}
                    };
                    j["stability"] = {{"stage", static_cast<int32_t>(state.stability.stage)}, {"value", state.stability.value}};

                    j["velocity"] = {
                        {"x", state.velocity.x},
                        {"y", state.velocity.y},
                        {"z", state.velocity.z},
                    };

                    std::string payload = j.dump();

                    // Topic hierarchy: antilatency/tracker/{NodeID}
                    std::string topic = "antilatency/tracker/" + nodeAltIds[node];
                    mosquitto_publish(mosq, nullptr, topic.c_str(), payload.length(), payload.c_str(), 0, false);
                }
            }
            // 60 FPS sleep
            std::this_thread::sleep_for(std::chrono::milliseconds(16));
        } else {
            std::this_thread::sleep_for(std::chrono::milliseconds(100));
        }
    }

    mosquitto_loop_stop(mosq, true);
    mosquitto_destroy(mosq);
    mosquitto_lib_cleanup();
    
    return 0;
}
