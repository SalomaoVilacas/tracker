const mongoose = require('mongoose');
const assetConstant = require('../../resource/constant/asset');

module.exports = function(app) {

    let dao = {};
    const model = mongoose.model('asset');

    dao.create = function(asset, callback) {

        model.create(asset, callback);
    };

    dao.read = function(callback) {

        model.find({}, callback);
    };

    dao.update = function(id, asset, callback) {

        model.updateOne({'id': id}, asset, callback);
    };

    dao.delete = function(id, callback) {

        model.remove({'id': id}, callback);
    };

    dao.readById = function(id, callback) {

        model.findOne({"id": id}, callback);
    };

    dao.readAvailableDocuments = function(callback) {

        model.find({'status.0': assetConstant.STATUS_AVAILABLE}, '-_id -status -historic', callback);
    };

    dao.readAvailableDocumentsById = function(id, callback) {

        model.findOne({'id': id, 'status.0': assetConstant.STATUS_AVAILABLE}, '-_id -status -historic', callback);
    };

    dao.partialUpdate = function(id, asset, callback) {
        
        model.updateOne({'id': id}, {$set: asset}, callback);
    };

    dao.disable = function(id, callback) {

        model.updateOne({'id': id}, {$set: {'status.0': assetConstant.STATUS_UNAVAILABLE, 'status.1': new Date().getTime()}}, callback);
    };

    dao.filterAvailableDocuments = function(assetFilterParameter, callback) {

        model.find({$and: [assetFilterParameter, {'status.0': assetConstant.STATUS_AVAILABLE}]}, '-_id -status -historic', callback);
    };

    dao.readLastPositionEventHistoric = function(id, callback) {

        model.findOne({'id': id}, {"eventHistoric": {$slice: -1}}, callback);
    };

    dao.partialUpdateLastPositionEventHistoric = function(id, asset, callback) {

        model.updateOne({'id': id, 'eventHistoric.type': 'scan_in'}, {'eventHistoric.$.creationDate': new Date().getTime()}, callback);
    };

    dao.createEvent = function(id, event, callback) {

        model.updateOne({'id': id}, {$push: {'eventHistoric': event}}, callback);
    };

    return dao;
};