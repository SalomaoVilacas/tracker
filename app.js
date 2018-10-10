const app = require('./config/express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const serverConstant = require('./resource/constant/server');

require('./config/database')();
require('./app/mqtt/readRFID')();

io.on('connection', function(socket) {

    console.log('a user connected');

    socket.on('chat message', function(msg) {

        console.log('message: ' + msg);
        io.emit('chat message', {'message': msg});
    });
});

http.listen(serverConstant.PORT, () => {

    console.log("IOTECH service running on port: " + serverConstant.PORT);
});