const client = require('../../config/database')();
const uuid = require('uuid/v1');

module.exports = function() {

    let dao = {};

    dao.create = function(event, callback) {

        let query = "";

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

    dao.readById = function(id, callback) {

        let query = "SELECT id_store FROM antenna WHERE id=" + id;

        client.execute(query, callback);
    };

    return dao;
};