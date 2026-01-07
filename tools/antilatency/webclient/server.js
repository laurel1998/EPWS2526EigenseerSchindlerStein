const mqtt = require('mqtt');
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');

const MQTT_HOST = 'mqtt://hivemq.dock.moxd.io:1883';
const MQTT_TOPIC = 'antilatency/tracker/#';
const WEB_PORT = 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

console.log(`Connecting to MQTT Broker at ${MQTT_HOST}...`);
const mqttClient = mqtt.connect(MQTT_HOST);

mqttClient.on('connect', () => {
    console.log(`✅ Connected to MQTT broker ${MQTT_HOST}`);
    mqttClient.subscribe(MQTT_TOPIC, (err) => {
        if (!err) console.log(`📡 Subscribed to topic ${MQTT_TOPIC}`);
    });
});

// Forward raw MQTT payload to browser client
mqttClient.on('message', (topic, message) => {
    io.emit('tracking_data', message.toString());
});

server.listen(WEB_PORT, () => {
    console.log(`Web client running at http://localhost:${WEB_PORT}`);
});