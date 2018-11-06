module.exports = function(io) {

    io.on('connection', function(socket) {
    
        console.log("User connected");

        socket.on('disconnect', function() {

            console.log("User disconnected");
        });

        socket.on('chat message', function(msg) {
    
            io.emit('chat message', {'message': msg});
        });
    });
};