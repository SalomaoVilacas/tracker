const mongoose = require('mongoose');

const logModel = require('../../resource/model/log');

const logSchema = mongoose.Schema(logModel, {'versionKey': false});

mongoose.model('log', logSchema, 'log');