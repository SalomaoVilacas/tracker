const client = require('../../config/database')();
const uuid = require('uuid/v1');

module.exports = function() {

    let dao = {};

    dao.create = function(user, callback) {

        let query = "";

        client.execute(query, callback);
    };

    dao.read = function(callback) {

        let query = "SELECT id, name FROM store";

        client.execute(query, callback);
    };

    dao.update = function(id, user, callback) {

        let query = "";

        client.execute();
    };

    dao.delete = function(id, callback) {

        let query = "";

        client.execute();
    };

    dao.readByNamePassword = function(name, password, callback) {

        let query = "SELECT * FROM store WHERE name = '" + name + "' AND password = '" + password + "' ALLOW FILTERING;";

        client.execute(query, callback);
    };

    return dao;
};