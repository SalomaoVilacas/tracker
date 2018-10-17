const client = require('../../config/database')();
const uuid = require('uuid/v1');

module.exports = function() {

    let dao = {};

    dao.create = function(event, callback) {

        let query = "INSERT INTO event (id_tag, type, timestamp) VALUES ('" + event.idTag + "', '" + event.type + "', " + event.timestamp + ");";

        client.execute(query, callback);
    };

    dao.read = function(callback) {

        let query = "";

        client.execute(query, callback);
    };

    dao.update = function(id, reading, callback) {

        let query = "";

        client.execute(query, callback);
    };

    dao.delete = function(id, callback) {

        let query = "";

        client.execute(query, callback);
    };

    dao.readByIdTag = function(id, callback) {

        let query = "SELECT * FROM event WHERE idTag='" + id + "';";
    };

    return dao;
};