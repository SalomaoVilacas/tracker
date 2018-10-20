const app = require('./config/express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const serverConstant = require('./resource/constant/server');

require('./config/database')();
require('./resource/utility/socket')(io);
require('./app/mqtt/readRFID')(io);

http.listen(serverConstant.PORT, () => {

    console.log("IOTECH service running on port: " + serverConstant.PORT);
});