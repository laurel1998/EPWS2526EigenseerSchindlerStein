cmake_minimum_required(VERSION 3.10)
project(TrackingMinimalDemo)
set(CMAKE_CXX_STANDARD 17)
find_package(nlohmann_json REQUIRED)
include_directories(${CMAKE_SOURCE_DIR}/AntilatencySdk/Api)
add_executable(TrackingMinimalDemo TrackingMinimalDemoCpp.cpp)

target_link_libraries(TrackingMinimalDemo PRIVATE nlohmann_json::nlohmann_json)

if (WIN32)
    file(GLOB ANTILATENCY_LIBS ${CMAKE_SOURCE_DIR}/AntilatencySdk/Bin/WindowsDesktop/x64/*.dll)
endif (WIN32)
if (UNIX)
    target_link_libraries(TrackingMinimalDemo PRIVATE dl stdc++fs pthread mosquitto)

    EXECUTE_PROCESS( COMMAND uname -m COMMAND tr -d '\n' OUTPUT_VARIABLE ARCHITECTURE )
    message( STATUS "Architecture: ${ARCHITECTURE}" )

    if( ${ARCHITECTURE} STREQUAL "aarch64" )
        file(GLOB ANTILATENCY_LIBS ${CMAKE_SOURCE_DIR}/AntilatencySdk/Bin/Linux/aarch64_linux_gnu/*.so)
    elseif( ${ARCHITECTURE} STREQUAL "armv7l" )
        file(GLOB ANTILATENCY_LIBS ${CMAKE_SOURCE_DIR}/AntilatencySdk/Bin/Linux/arm_linux_gnueabihf/*.so)
    elseif( ${ARCHITECTURE} STREQUAL "x86_64" )
        file(GLOB ANTILATENCY_LIBS ${CMAKE_SOURCE_DIR}/AntilatencySdk/Bin/Linux/x86_64/*.so)
    endif()

endif (UNIX)

add_custom_command(TARGET TrackingMinimalDemo POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy_if_different ${ANTILATENCY_LIBS} $<TARGET_FILE_DIR:TrackingMinimalDemo>)
