const jwt = require('jsonwebtoken');

const serverConstant = require('../constant/server');

module.exports = {
    'create': function(object, callback) {

        jwt.sign(object, serverConstant.SECRET, callback);
    },
    'decoding': function(token, callback) {

        jwt.verify(token, serverConstant.SECRET, callback);
    }
};