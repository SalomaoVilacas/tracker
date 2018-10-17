const errorCodeConstant = require('../constant/errorCode');
const httpStatusCodeConstant = require('../constant/httpStatusCode');

const tokenUtility = require('../utility/token');

module.exports = function(req, res, next) {

    tokenUtility.decoding(req.query.token || req.body.token, function(error, result) {

        if(error) {
            res.status(httpStatusCodeConstant.BAD_REQUEST).json({
                'status': false,
                'errorCode': errorCodeConstant.INVALID_TOKEN
            });
        }else {
            req.decoded = result;
            next();
        }
    });
};