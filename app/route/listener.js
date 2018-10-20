const routeConstant = require('../../resource/constant/route');
const errorCodeConstant = require('../../resource/constant/errorCode');
const httpStatusCodeConstant = require('../../resource/constant/httpStatusCode');

const tokenValidation = require('../../resource/validation/token');

const log = require('../../resource/utility/log');

module.exports = function(app) {

    let listenerDAO = app.dao.listenerDAO;

    app.post(routeConstant.CREATE_LISTENER, tokenValidation, function(req, res) {

        let emit_event = req.body.token;
        let id_store = req.body.id_store;

        listenerDAO.create({'emit_event': emit_event, 'id_store': id_store}, function(error) {

            if(error) {
                log.error(error);

                res.status(httpStatusCodeConstant.INTERNAL_SERVER_ERROR).json({
                    'status': false,
                    'errorCode': errorCodeConstant.DATABASE_ERROR
                });

                return;
            }else {
                res.status(httpStatusCodeConstant.CREATED).json({
                    'status': true
                });

                return;
            }
        });
    });

    app.delete(routeConstant.DELETE_LISTENER, function(req, res) {

        let token = req.body.token;

        listenerDAO.delete(token, function(error) {

            if(error) {
                log.error(error);

                res.status(httpStatusCodeConstant.INTERNAL_SERVER_ERROR).json({
                    'status': false,
                    'errorCode': errorCodeConstant.DATABASE_ERROR
                });

                return;
            }else {
                res.status(httpStatusCodeConstant.CREATED).json({
                    'status': true
                });

                return;
            }
        });
    });
}; 