const client = require('../../config/database')();
const uuid = require('uuid/v1');

module.exports = function() {

    let dao = {};

    dao.create = function(log, callback) {

        let query = "INSERT INTO log (id, plataform, log) VALUES (uuid(), '" + log.plataform + "', '" + log.log + "');";

        client.execute(query, callback);
    };

    dao.read = function(callback) {

        let query = "";

        client.execute(query, callback);
    };

    dao.update = function(id, log, callback) {

        let query = "";

        client.execute();
    };

    dao.delete = function(id, callback) {

        let query = "";

        client.execute(query, callback);
    };

    return dao;
};