const mongoose = require('mongoose');

module.exports = {
    "token": {
        "type": String,
        "required": true
    },
    "idStore": {
        "type": String,
        "required": true
    },
    "department": {
        "type": String,
        "required": true
    }
};