const mongoose = require('mongoose');
const storeConstant = require('../../resource/constant/store');

module.exports = function(app) {

    let dao = {};
    const model = mongoose.model('store');

    dao.create = function(store, callback) {

        model.create(store, callback);
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

    dao.readByNamePassword = function(name, password, callback) {

        model.findOne({'status.0': storeConstant.STATUS_AVAILABLE, 'name': name, 'password': password}, callback);
    };

    dao.readAvailableDocuments = function(callback) {

        model.find({'status.0': storeConstant.STATUS_AVAILABLE}, '-_id id name', callback);
    };

    return dao;
};