const mqtt = require('mqtt');
const mqttConstant = require('../../resource/constant/mqtt');
const readingDAO = require('../dao/readingDAO')();

const client  = mqtt.connect('mqtt://' + mqttConstant.IP_BROKER);

module.exports = function() {

    client.on('connect', function() {

        client.subscribe(mqttConstant.TOPIC, function(error) {
    
            if(error) {
                console.log(error);
            }else {
                console.log("Tópico assinado");
            }
        });
    });
    
    client.on('message', function(topic, message) {

        message = JSON.parse(message.toString());

        readingOneAntenna(message);
    });
};

function readingOneAntenna(message) {

    readingDAO.readById(message.id, (error, result) => {

        if(error) {
            console.log(error);
        }else {
            if(result.rowLength == 0) {
                readingDAO.create(message, (error) => {

                    if(error) console.log(error);
                    else console.log(message);
                });
            }
        }
    });
};

function readingTwoAntennas() {

    readingDAO.readById(message.id, (error, result) => {

        if(error) {
            console.log(error);
        }else {
            if(result.rowLength == 0) {
                readingDAO.create(message, (error) => {

                    if(error) console.log(error);
                });
            }else {
                if(result.rows[0].mode == 'in' && message.mode == 'out') {
                    readingDAO.create(message, (error) => {

                        if(error) {
                            console.log(error);
                        }else {
                            console.log("ENTROU");
                        }
                    });
                }else if(result.rows[0].mode == 'out' && message.mode == 'in') {
                    readingDAO.create(message, (error) => {

                        if(error) {
                            console.log(error);
                        }else {
                            console.log("SAIU");
                        }
                    });
                }
            }
        }
    });
};