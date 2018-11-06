const routeConstant = require('../../resource/constant/route');
const errorCodeConstant = require('../../resource/constant/errorCode');
const httpStatusCodeConstant = require('../../resource/constant/httpStatusCode');
const tokenValidation = require('../../resource/validation/token');
const logMessage = require('../../resource/utility/logMessage');
const logger = require('../../resource/utility/log');

module.exports = function(app) {

    let storeDAO = app.dao.storeDAO;

    app.post(routeConstant.CREATE_STORE, function(req, res) {

        let store = req.body.store;

        storeDAO.create(store, function(error) {

            if(error) {
                logger.error(logMessage.error(error, __filename, 'storeDAO.create()'));

                res.status(httpStatusCodeConstant.INTERNAL_SERVER_ERROR).json({
                    'errorCode': errorCodeConstant.DATABASE_ERROR
                });

                return;
            }else {
                res.status(httpStatusCodeConstant.CREATED).json();

                return;
            }
        });
    });

    app.get(routeConstant.READ_STORE, tokenValidation, function(req, res) {

        storeDAO.readAvailableDocuments(function(error, result) {

            if(error) {
                logger.error(logMessage.error(error, __filename, 'storeDAO.readAvailableDocuments()'));

                res.status(httpStatusCodeConstant.INTERNAL_SERVER_ERROR).json({
                    'errorCode': errorCodeConstant.DATABASE_ERROR
                });

                return;
            }else {
                res.status(httpStatusCodeConstant.OK).json({
                    'stores': result
                });

                return;
            }
        });
    });

    app.put(routeConstant.UPDATE_STORE, tokenValidation, function(req, res) {

        res.status(httpStatusCodeConstant.NOT_IMPLEMENTED).json({
            'errorCode': errorCodeConstant.NOT_IMPLEMENTED
        });
    });

    app.delete(routeConstant.DELETE_STORE, tokenValidation, function(req, res) {

        res.status(httpStatusCodeConstant.NOT_IMPLEMENTED).json({
            'errorCode': errorCodeConstant.NOT_IMPLEMENTED
        });
    });
};