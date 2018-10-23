const mongoose = require('mongoose');

module.exports = {
    "id": {
        "type": mongoose.Types.ObjectId,
        "required": true
    },
    "name": {
        "type": String,
        "required": true
    },
    "department": [String],
    "latitude": {
        "type": Number,
        "required": true
    },
    "longitude": {
        "type": Number,
        "required": true
    }
};