const client = require('../../config/database')();
const uuid = require('uuid/v1');

module.exports = function() {

    let dao = {};

    dao.create = function(reading, callback) {


        let query = "INSERT INTO reading (id_tag, id_antenna, type, timestamp) VALUES ('" + reading.id + "', " + reading.id_antenna + ", '" + reading.mode + "', '" + reading.timestamp + "');";

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

        let query = "SELECT id_antenna, type FROM reading WHERE id_tag='" + id + "' LIMIT 1;";

        client.execute(query, callback);
    };

    return dao;
};