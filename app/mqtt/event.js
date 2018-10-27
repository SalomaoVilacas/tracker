const mqttConstant = require('../../resource/constant/mqtt');
const assetConstant = require('../../resource/constant/asset');
const logMessage = require('../../resource/utility/logMessage');
const logger = require('../../resource/utility/log');
const assetDAO = require('../dao/assetDAO')();
const mqttClient  = require('../../config/mqtt');

mqttClient.on('connect', function() {

    logger.info(logMessage.info('Connected to broker', __filename));

    mqttClient.subscribe(mqttConstant.TOPIC, function(error) {

        if(error) logger.error(logMessage.error(error, __filename, 'Subscribe to the topic'));
        else logger.info(logMessage.info('Subscribed topic', __filename));
    });
});

mqttClient.on('message', function(topic, event) {

    let store = topic.split('/')[2];
    event = JSON.parse(event.toString());

    if(event.type == 'in' || event.type == 'out') {
        console.log("Evento de entrada ou saída");
    }else if(event.type == 'scan') {
        assetDAO.readById(event.id, function(error, result) {

            if(error) {
                logger.error(logMessage.error(error, __filename, 'assetDAO.readById()'));
            }else {
                if(!result) {
                    let asset = {};
                    asset.id = event.id;
                    asset.name = assetConstant.STANDARD_NAME;
                    asset.type = assetConstant.STANDARD_TYPE;
                    asset.description = assetConstant.STANDARD_DESCRIPTION;
                    asset.local = assetConstant.STANDARD_LOCAL;

                    assetDAO.create(asset, function(error) {

                        if(error) logger.error(error);
                        else logger.info();
                    });
                }
            }
        });
    }else {
        console.log("Evento desconhecido");
    }
});