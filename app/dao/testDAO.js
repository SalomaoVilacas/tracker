const client = require('../../config/database')();
const uuid = require('uuid/v1');

module.exports = function() {

    let dao = {};

    dao.create = function(user, callback) {

        let query = "INSERT INTO test (id, timestamp, local, mode) VALUES ('" + user.id + "', " + user.timestamp + ", '" + user.local + "', '" + user.mode + "')";

        client.execute(query, callback);
    };

    dao.read = function(callback) {

        let query = "SELECT * FROM user";

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

    dao.readById = function(id, callback) {

        let query = "SELECT * FROM test WHERE id='" + id + "';";

        client.execute(query, callback);
    };

    return dao;
};