const mongoose = require('mongoose');

const listenerModel = require('../../resource/model/listener');

const listenerSchema = mongoose.Schema(listenerModel, {'versionKey': false});

mongoose.model('listener', listenerSchema, 'listener');