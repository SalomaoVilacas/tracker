const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const consign = require('consign');
const serverConstant = require('../resource/constant/server');

module.exports = function() {

    let app = express();

    app.set('secret', serverConstant.SECRET);

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