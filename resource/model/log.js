const mongoose = require('mongoose');

module.exports = {
    "id": {
        "type": mongoose.Types.ObjectId,
        "required": true
    },
    "message": {
        "type": String,
        "required": true
    },
    "plataform": {
        "type": String,
        "required": true
    }
};