const mongoose = require('mongoose');

module.exports = {
    "id": {
        "type": String,
        "required": true
    },
    "idTag": {
        "type": String,
        "required": false
    },
    "name": {
        "type": String,
        "required": true
    },
    "type": {
        "type": String,
        "required": true
    },
    "description": {
        "type": String,
        "required": true
    },
    "local": {
        "type": String,
        "required": true
    },
    "historic": [
        {
            "event": {
                "type": String,
                "required": true
            },
            "local": {
                "type": String,
                "required": true
            },
            "creationDate": {
                "type": Date,
                "required": true
            }
        }
    ],
    "status": [Number] //[position0: (1-available || 2-unavailable || 3-noLink), position1: modification date]
};