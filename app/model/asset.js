const mongoose = require('mongoose');

const assetModel = require('../../resource/model/asset');

const assetSchema = mongoose.Schema(assetModel, {'versionKey': false});

mongoose.model('asset', assetSchema, 'asset');