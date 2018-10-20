const client = require('../../config/database')();
const uuid = require('uuid/v1');

module.exports = function() {

    let dao = {};

    dao.create = function(listener, callback) {

        let query = "INSERT INTO listener (emit_event, id_store) VALUES ('" + listener.emit_event + "', " + listener.id_store + ");";

        client.execute(query, callback);
    };

    dao.read = function(callback) {

        let query = "";

        client.execute(query, callback);
    };

    dao.update = function(id, user, callback) {

        let query = "";

        client.execute();
    };

    dao.delete = function(token, callback) {

        let query = "DELETE FROM listener WHERE emit_event='" + token + "';";

        client.execute(query, callback);
    };

    dao.readByIdStore = function(id_store, callback) {

        let query = "SELECT emit_event FROM listener WHERE id_store=" + id_store + " ALLOW FILTERING;";

        client.execute(query, callback);
    };

    return dao;
};