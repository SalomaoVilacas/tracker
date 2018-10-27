module.exports = {
    'error': function(error, local, action) {

        let message = {};
        message.error = error;
        message.local = local;
        message.action = action;
        message.timestamp = new Date().getTime();

        return message;
    },
    'warn': function(warn, local, action) {

        let message = {};
        message.warn = warn;
        message.local = local;
        message.action = action;
        message.timestamp = new Date().getTime();

        return message;
    },
    'info': function(info, local) {

        let message = {};
        message.info = info;
        message.local = local;
        message.timestamp = new Date().getTime();

        return message;
    },
    'debug': function(debug, local, action) {

        let message = {};
        message.debug = debug;
        message.local = local;
        message.action = action;
        message.timestamp = new Date().getTime();

        return message;
    }
};