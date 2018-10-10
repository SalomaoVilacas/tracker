const client = require('../../config/database');

module.exports = {
    "createDatabase": function(name, callback) {

        let query = 'CREATE KEYSPACE IF NOT EXISTS "' + name + '"' +
                    'WITH replication = {"class": "SimpleStrategy", "replication_factor": 1}';
        client.execute(query, callback)
    },
    "createTable": function(name) {

    }
}