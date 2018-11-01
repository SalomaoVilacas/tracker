const path = require('path');

module.exports = function(app) {

    app.get('/', function(req, res) {

        res.sendFile(path.resolve(__dirname + '/../public/site/index.html')); 
    });

    app.get('/socket', function(req, res) {

        res.sendFile(path.resolve(__dirname + '/../public/socket/socket.html'));
    });

    app.get('/apidoc', function(req, res) {

        res.sendFile(path.resolve(__dirname + '/../public/apidoc/index.html'));
    });
};