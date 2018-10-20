const mqtt = require('mqtt');

const mqttConstant = require('../../resource/constant/mqtt');

const log = require('../../resource/utility/log');

const readingDAO = require('../dao/readingDAO')();
const eventDAO = require('../dao/eventDAO')();
const antennaDAO = require('../dao/antennaDAO')();
const listenerDAO = require('../dao/listenerDAO')();

const client  = mqtt.connect('mqtt://' + mqttConstant.IP_BROKER);

module.exports = function(io) {

    client.on('connect', function() {

        client.subscribe(mqttConstant.TOPIC, function(error) {

            if(error) log.error(error);
            else log.debug('Tópico assinado');
        });
    });
    
    client.on('message', function(topic, reading) {

        reading = JSON.parse(reading.toString());

        readOneAntenna(reading, io);
    });
};

function readOneAntenna(reading, io) {

    readingDAO.readByIdTag(reading.id, function(error, result) {

        if(error) log.error(error);
        else {
            let id_antenna = (reading.mode == 'in') ? '264c28f6-85af-4e21-9b32-635f2caf8f92' : '5ca8865a-5538-4734-9c37-ebcb8105a937';

            if(result.rowLength == 0) {
                reading.id_antenna = id_antenna;

                readingDAO.create(reading, function(error) {

                    if(error) log.error(error);
                    else {
                        antennaDAO.readById(id_antenna, function(error, result) {

                            if(error) log.error(error);
                            else {
                                let event = {};
                                event.id_tag = reading.id;
                                event.timestamp = reading.timestamp;
                                event.type = reading.mode;
                                event.id_store = result.rows[0].id_store;

                                eventDAO.create(event, function(error) {

                                    if(error) log.error(error);
                                    else {
                                        listenerDAO.readByIdStore(event.id_store, function(error, result) {

                                            if(error) log.error(error);
                                            else {
                                                for(let i = 0; i < result.rowLength; i++) {
                                                    io.emit(result.rows[i].emit_event, {'id_tag': event.id_tag, 'type': event.type});
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }else {
                if(result.rows[0].id_antenna != id_antenna) {
                    reading.id_antenna = id_antenna;

                    readingDAO.create(reading, function(error) {
    
                        if(error) log.error(error);
                        else {
                            antennaDAO.readById(id_antenna, function(error, result) {

                                if(error) log.error(error);
                                else {
                                    let event = {};
                                    event.id_tag = reading.id;
                                    event.timestamp = reading.timestamp;
                                    event.type = reading.mode;
                                    event.id_store = result.rows[0].id_store;
    
                                    eventDAO.create(event, function(error) {
    
                                        if(error) log.error(error);
                                        else {
                                            listenerDAO.readByIdStore(event.id_store, function(error, result) {
    
                                                if(error) log.error(error);
                                                else {
                                                    for(let i = 0; i < result.rowLength; i++) {
                                                        io.emit(result.rows[i].emit_event, {'id_tag': event.id_tag, 'type': event.type});
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        }
    });
};

// Algoritmo para duas antenas
function readTwoAntennas(reading, io) {

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

                                io.emit('chat message', {'message': event.type});
    
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