const validator = require('validator');

module.exports = function(password) {

    return (typeof password === 'string') && (password.length > 0);
};