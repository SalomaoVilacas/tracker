const mqttConstant = require('../../resource/constant/mqtt');
const logger = require('../../resource/utility/log');
const mqttClient  = require('../../config/mqtt');

mqttClient.on('connect', function() {

    mqttClient.subscribe(mqttConstant.TOPIC, function(error) {

        if(error) logger.error(error);
        else logger.info('Tópico assinado');
    });
});

mqttClient.on('message', function(topic, message) {

    message = JSON.parse(message.toString());
    // console.log(topic);
    // console.log(message);
});