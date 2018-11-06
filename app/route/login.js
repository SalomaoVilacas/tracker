const routeConstant = require('../../resource/constant/route');
const errorCodeConstant = require('../../resource/constant/errorCode');
const httpStatusCodeConstant = require('../../resource/constant/httpStatusCode');
const nameValidation = require('../../resource/validation/name');
const passwordValidation = require('../../resource/validation/password');
const tokenUtility = require('../../resource/utility/token');
const logMessage = require('../../resource/utility/logMessage');
const logger = require('../../resource/utility/log');

module.exports = function(app) {

    let storeDAO = app.dao.storeDAO;

    app.post(routeConstant.LOGIN, function(req, res) {

        let name = req.body.name;
        let password = req.body.password;

        if(nameValidation(name) && passwordValidation(password)) {
            storeDAO.readByNamePassword(name, password, function(error, result) {

                if(error) {
                    logger.error(logMessage.error(error, __filename, 'storeDAO.readByNamePassword()'));

                    res.status(httpStatusCodeConstant.INTERNAL_SERVER_ERROR).json({
                        'errorCode': errorCodeConstant.DATABASE_ERROR
                    });

                    return;
                }else {
                    if(result) {
                        let store = result.toObject();

                        tokenUtility.create(store, function(error, token) {

                            if(error) {
                                logger.error(logMessage.error(error, __filename, 'tokenUtility.create()'));

                                res.status(httpStatusCodeConstant.INTERNAL_SERVER_ERROR).json({
                                    'errorCode': errorCodeConstant.CREATE_TOKEN_ERROR
                                });

                                return;
                            }else {
                                res.status(httpStatusCodeConstant.CREATED).json({
                                    'token': token
                                });
                            }
                        });
                    }else {
                        res.status(httpStatusCodeConstant.UNAUTHORIZED).json({
                            'errorCode': errorCodeConstant.AUTHENTICATION_ERROR
                        });

                        return;
                    }
                }
            });
        }else {
            res.status(httpStatusCodeConstant.BAD_REQUEST).json({
                'errorCode': errorCodeConstant.INVALID_REQUEST
            });

            return;
        }
    });
};