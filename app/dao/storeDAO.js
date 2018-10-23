const mongoose = require('mongoose');

module.exports = function(app) {

    let dao = {};
    const model = mongoose.model('store');

    dao.create = function(listener, callback) {

        model.create(listener, callback);
    };

    dao.read = function(callback) {

        model.find({}, callback);
    };

    dao.update = function(listener, callback) {

        model.update({'id': listener.id}, listener, callback);
    };

    dao.delete = function(id, callback) {

        model.remove({'id': id}, callback);
    };

    return dao;
};