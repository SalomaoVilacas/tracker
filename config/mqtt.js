const mqtt = require('mqtt');

const mqttConstant = require('../resource/constant/mqtt');
const client  = mqtt.connect('mqtt://' + mqttConstant.IP);

module.exports = client;