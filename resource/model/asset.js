const mongoose = require('mongoose');

module.exports = {
    "id": {
        "type": String,
        "required": true
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
            "timestamp": {
                "type": Number,
                "required": true
            }
        }
    ],
    "status": {
        "type": Number,
        "required": true
    }
};