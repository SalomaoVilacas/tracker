const routeConstant = require('../../resource/constant/route');
const errorCodeConstant = require('../../resource/constant/errorCode');
const httpStatusCodeConstant = require('../../resource/constant/httpStatusCode');

const nameValidation = require('../../resource/validation/name');
const passwordValidation = require('../../resource/validation/password');

const tokenUtility = require('../../resource/utility/token');

module.exports = function(app) {

    let storeDAO = app.dao.storeDAO;

    app.post(routeConstant.LOGIN, function(req, res) {

        let name = req.body.email;
        let password = req.body.password;

        if(nameValidation(name) && passwordValidation(password)) {
            storeDAO.readByNamePassword(name, password, function(error, result) {

                if(error) {
                    res.status(httpStatusCodeConstant.INTERNAL_SERVER_ERROR).json({
                        'status': false,
                        'errorCode': errorCodeConstant.DATABASE_ERROR
                    });

                    return;
                }else {
                    if(result) {
                        let store = result;

                        tokenUtility.create(store, function(error, token) {

                            if(error) {
                                res.status(httpStatusCodeConstant.INTERNAL_SERVER_ERROR).json({
                                    'status': false,
                                    'errorCode': errorCodeConstant.CREATE_TOKEN_ERROR
                                });

                                return;
                            }else {
                                res.status(httpStatusCodeConstant.CREATED).json({
                                    'status': true,
                                    'results': {
                                        'token': token
                                    }
                                });
                            }
                        });
                    }else {
                        res.status(httpStatusCodeConstant.UNAUTHORIZED).json({
                            'status': false,
                            'errorCode': errorCodeConstant.AUTHENTICATION_ERROR
                        });

                        return;
                    }
                }
            });
        }else {
            res.status(httpStatusCodeConstant.BAD_REQUEST).json({
                'status': false,
                'errorCode': errorCodeConstant.INVALID_REQUEST
            });

            return;
        }
    });
};