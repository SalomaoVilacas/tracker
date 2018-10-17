const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const consign = require('consign');
const morgan = require('morgan');

const serverConstant = require('../resource/constant/server');

const log = require('../resource/utility/log');

module.exports = function() {

    let app = express();

    app.set('secret', serverConstant.SECRET);

    app.use(morgan('common', {
        'stream': {
            'write': function(message) {

                log.info(message);
            }
        }
    }));
    app.use(bodyParser.json({
        'limit': serverConstant.REQUEST_SIZE
    }));
    app.use(bodyParser.urlencoded({
        'limit': serverConstant.REQUEST_SIZE,
        'extended': true
    }));
    app.use(cors());

    consign({'cwd': 'app'})
    .include('dao')
    .then('route')
    .into(app);

    return app;
};