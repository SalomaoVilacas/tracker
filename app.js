const app = require('./config/express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const serverConstant = require('./resource/constant/server');
const databaseConstant = require('./resource/constant/database');

require('./config/database')(databaseConstant.IP + ':' + databaseConstant.PORT + '/' + databaseConstant.DB);
require('./resource/utility/socket')(io);

http.listen(serverConstant.PORT, () => {

    console.log("IOTECH service running on port: " + serverConstant.PORT);
});