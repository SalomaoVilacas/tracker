const mongoose = require('mongoose');

const storeModel = require('../../resource/model/store');

const storeSchema = mongoose.Schema(storeModel, {'versionKey': false});

mongoose.model('store', storeSchema, 'store');