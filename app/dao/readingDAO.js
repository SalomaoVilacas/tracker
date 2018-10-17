const client = require('../../config/database')();
const uuid = require('uuid/v1');

module.exports = function() {

    let dao = {};

    dao.create = function(reading, callback) {


        let query = "INSERT INTO reading (id_tag, id_door, type, timestamp) VALUES ('" + reading.id + "', 2db25a82-2a86-4683-9eb2-2c54fc9f0652, '" + reading.mode + "', '" + reading.timestamp + "');";

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

        let query = "SELECT id_door, type FROM reading WHERE id_tag='" + id + "' LIMIT 1;";

        client.execute(query, callback);
    };

    return dao;
};