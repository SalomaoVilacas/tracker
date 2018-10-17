const mqtt = require('mqtt');

const mqttConstant = require('../../resource/constant/mqtt');

const log = require('../../resource/utility/log');

const readingDAO = require('../dao/readingDAO')();
const eventDAO = require('../dao/eventDAO')();

const client  = mqtt.connect('mqtt://' + mqttConstant.IP_BROKER);

module.exports = function() {

    client.on('connect', function() {

        client.subscribe(mqttConstant.TOPIC, function(error) {

            if(error) log.error(error);
            else log.info('Tópico assinado');
        });
    });
    
    client.on('message', function(topic, reading) {

        reading = JSON.parse(reading.toString());

        read(reading);
    });
};

function read(reading) {

    readingDAO.readByIdTag(reading.id, function(error, result) {

        if(error) log.error(error);
        else {
            if(result.rowLength == 0) {
                readingDAO.create(reading, function(error) {

                    if(error) log.error(error);
                });
            }else {
                if(result.rows[0].id_door == '2db25a82-2a86-4683-9eb2-2c54fc9f0652') {
                    if(result.rows[0].type != reading.mode) {
                        readingDAO.create(reading, function(error) {

                            if(error) log.error(error);
                            else {
                                let event = {};
                                event.idTag = reading.id;
                                event.type = (reading.mode == 'out') ? 'entrou' : 'saiu';
                                event.timestamp = reading.timestamp;
    
                                eventDAO.create(event, function(error) {
    
                                    if(error) log.error(error);
                                });
                            }
                        });
                    }
                }else {
                    readingDAO.create(reading, function(error) {

                        if(error) log.error(error);
                    });
                }
            }
        }
    });
};