const mongoose = require('mongoose');

module.exports = function(app) {

    let dao = {};
    const model = mongoose.model('listener');

    dao.create = function(listener, callback) {

        model.create(listener, callback);
    };

    dao.read = function(callback) {

        model.find({}, callback);
    };

    dao.update = function(listener, callback) {

        model.update({'id': listener.id}, listener, callback);
    };

    dao.delete = function(token, callback) {

        model.remove({'token': token}, callback);
    };

    dao.readByToken = function(token, callback) {

        model.findOne({'token': token}, callback);
    };

    return dao;
};