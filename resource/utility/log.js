const winston = require('winston');
const fs = require('fs');

if(!fs.existsSync('resource/log')) {
    fs.mkdirSync('resource/log');
}

module.exports = winston.createLogger({
    'transports': [
        new winston.transports.File({
            'level': 'error',
            'filename': 'resource/log/error.log',
            'maxsize': 10000
        }),
        new winston.transports.File({
            'level': 'warn',
            'filename': 'resource/log/warn.log',
            'maxsize': 10000
        }),
        new winston.transports.File({
            'level': 'info',
            'filename': 'resource/log/info.log',
            'maxsize': 10000
        }),
        new winston.transports.File({
            'level': 'debug',
            'filename': 'resource/log/debug.log',
            'maxsize': 10000
        })
    ]
});