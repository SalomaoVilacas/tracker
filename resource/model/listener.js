const mongoose = require('mongoose');

module.exports = {
    "token": {
        "type": String,
        "required": true
    },
    "idStore": {
        "type": mongoose.Types.ObjectId,
        "required": true
    }
};