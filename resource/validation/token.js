const errorCodeConstant = require('../constant/errorCode');

const tokenUtility = require('../utility/token');

module.exports = function(req, res, next) {

    tokenUtility.decoding(req.query.token || req.body.token, function(error, result) {

        if(error) {
            res.status(400).json({
                'status': false,
                'errorCode': errorCodeConstant.INVALID_TOKEN
            });
        }else {
            req.decoded = result;
            next();
        }
    });
};