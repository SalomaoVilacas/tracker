const mqttConstant = require('../../resource/constant/mqtt');
const assetConstant = require('../../resource/constant/asset');
const logMessage = require('../../resource/utility/logMessage');
const logger = require('../../resource/utility/log');
const assetDAO = require('../dao/assetDAO')();
const mqttClient  = require('../../config/mqtt');

var tagScanMode = {};

mqttClient.on('connect', function() {

    logger.info(logMessage.info('Connected to broker', __filename));

    mqttClient.subscribe(mqttConstant.TOPIC, function(error) {

        if(error) logger.error(logMessage.error(error, __filename, 'Subscribe to the topic'));
        else logger.info(logMessage.info('Subscribed topic', __filename));
    });
});

mqttClient.on('message', function(topic, event) {

    event = JSON.parse(event.toString());

    checkAssetById(event.id, function(exist, available) {

        if(exist) {
            if(available) {
                createEvent(event);
            }else {
                let id = event.id;
                let asset = createStandardAsset();

                updateAsset(id, asset, function(error) {

                    if(error) logger.error(logMessage.error(error, __filename, 'updateAsset()'));
                    else {
                        createEvent(event);
                    }
                });
            }
        }else {
            let asset = createStandardAsset();
            asset.id = event.id;

            createAsset(asset, function(error) {

                if(error) logger.error(logMessage.error(error, __filename, 'createAsset()'));
                else {
                    createEvent(event);
                }
            });
        }
    });
});

function checkAssetById(id, callback) {

    assetDAO.readById(id, function(error, result) {

        if(error) logger.error(logMessage.error(error, __filename, 'assetDAO.readById()'));
        else {
            if(result) {
                if(result.status[0] == assetConstant.STATUS_AVAILABLE) {
                    callback(true, true);
                }else {
                    callback(true, false)
                }
            }else {
                callback(false);
            }
        }
    });
};

function createStandardAsset() {

    let asset = {};
    asset.name = assetConstant.STANDARD_NAME;
    asset.type = assetConstant.STANDARD_TYPE;
    asset.description = assetConstant.STANDARD_DESCRIPTION;
    asset.local = assetConstant.STANDARD_LOCAL;
    asset.status = [assetConstant.STATUS_AVAILABLE, new Date().getTime()];

    return asset;
};

function createAsset(asset, callback) {

    assetDAO.create(asset, callback);
};

function updateAsset(id, asset, callback) {

    assetDAO.update(id, asset, callback);
};

function createEvent(event) {

    let date = new Date(0);
    event.creationDate = date.setUTCSeconds(event.timestamp);
    delete event.timestamp;

    switch(event.type) {
        case 'in':
            createInEvent(event);
            break;
        case 'out':
            createOutEvent(event);
            break;
        case 'scan_in':
            createScanInEvent(event);
            break;
        case 'scan_out':
            createScanOutEvent(event);
            break;
        default:
            logger.info(logMessage.info('Tipo de evento desconhecido', __filename));
    }
};

function createInEvent(event) {

    let id = event.id;
    delete event.id;

    assetDAO.createEvent(id, event, function(error) {

        if(error) logger.error(logMessage.error(error, __filename, 'assetDAO.creatEvent()'));
    });
};

function createOutEvent(event) {

    let id = event.id;
    delete event.id;

    assetDAO.createEvent(id, event, function(error) {

        if(error) logger.error(logMessage.error(error, __filename, 'assetDAO.creatEvent()'));
    });
};

function createScanInEvent(event) {

    let id = event.id;
    delete event.id;

    assetDAO.readLastPositionEventHistoric(id, function(error, result) {

        if(error) logger.error(logMessage.error(error, __filename, 'assetDAO.readLastPositionHistoricById()'));
        else {
            if(result.eventHistoric.length > 0 && result.eventHistoric[0].type == 'scan_in') {
                clearTimeout(tagScanMode[id]);
                tagScanMode[id] = setTimeout(expiredScanInEvent, 60 * 1000, id, event.local);
            }else {
                assetDAO.createEvent(id, event, function(error) {

                    if(error) logger.error(logMessage.error(error, __filename, 'assetDAO.creatEvent()'));
                    else {
                        clearTimeout(tagScanMode[id]);
                        tagScanMode[id] = setTimeout(expiredScanInEvent, 60 * 1000, id, event.local);
                    }
                });
            }
        }
    });
};

function createScanOutEvent(event) {

    let id = event.id;
    delete event.id;

    assetDAO.readLastPositionEventHistoric(id, function(error, result) {

        if(error) logger.error(logMessage.error(error, __filename, 'assetDAO.readLastPositionHistoricById()'));
        else {
            if(result.eventHistoric.length > 0 && result.eventHistoric[0].type == 'scan_in') {
                clearTimeout(tagScanMode[id]);

                assetDAO.createEvent(id, event, function(error) {

                    if(error) logger.error(logMessage.error(error, __filename, 'assetDAO.creatEvent()'));
                });
            }else {
                logger.error(logMessage.error('Foi gerado um evento de SCAN_OUT sem um evento de SCAN_IN prévio', __filename, 'Buscar evento SCAN_IN'));
            }
        }
    });
};

function expiredScanInEvent(id, local) {

    let event = {};
    event.type = 'scan_out';
    event.local = local;
    event.creationDate = new Date().getTime();

    assetDAO.createEvent(id, event, function(error) {

        if(error) logger.error(logMessage.error(error, __filename, 'assetDAO.createEvent()'));
    });
};