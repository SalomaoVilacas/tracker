const routeConstant = require('../../resource/constant/route');
const errorCodeConstant = require('../../resource/constant/errorCode');
const httpStatusCodeConstant = require('../../resource/constant/httpStatusCode');
const tokenValidation = require('../../resource/validation/token');
const logger = require('../../resource/utility/log');

module.exports = function(app) {

    let listenerDAO = app.dao.listenerDAO;

    app.post(routeConstant.CREATE_LISTENER, tokenValidation, function(req, res) {

        let listener = {};
        listener.token = req.body.token;
        listener.idStore = req.body.idStore;

        listenerDAO.create(listener, function(error) {

            if(error) {
                logger.error(error);

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

    app.delete(routeConstant.DELETE_LISTENER, function(req, res) {

        let token = req.body.token;

        listenerDAO.delete(token, function(error) {

            if(error) {
                logger.error(error);

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
}; 