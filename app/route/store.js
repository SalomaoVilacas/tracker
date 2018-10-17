const routeConstant = require('../../resource/constant/route');
const errorCodeConstant = require('../../resource/constant/errorCode');
const httpStatusCodeConstant = require('../../resource/constant/httpStatusCode');

const tokenValidation = require('../../resource/validation/token');

const log = require('../../resource/utility/log');

module.exports = function(app) {

    let storeDAO = app.dao.storeDAO;

    app.post(routeConstant.CREATE_STORE, tokenValidation, function(req, res) {

        res.status(httpStatusCodeConstant.NOT_IMPLEMENTED).json({
            'status': false,
            'errorCode': errorCodeConstant.NOT_IMPLEMENTED
        });
    });

    app.get(routeConstant.READ_STORE, tokenValidation, function(req, res) {

        storeDAO.read(function(error, result) {

            if(error) {
                log.error(error);

                res.status(500).json({
                    'status': false,
                    'errorCode': errorCodeConstant.DATABASE_ERROR
                });

                return;
            }else {
                res.status(200).json({
                    'status': true,
                    'results': {
                        'stores': result.rows
                    }
                });
            }
        });
    });

    app.put(routeConstant.UPDATE_STORE, tokenValidation, function(req, res) {

        res.status(httpStatusCodeConstant.NOT_IMPLEMENTED).json({
            'status': false,
            'errorCode': errorCodeConstant.NOT_IMPLEMENTED
        });
    });

    app.delete(routeConstant.DELETE_STORE, tokenValidation, function(req, res) {

        res.status(httpStatusCodeConstant.NOT_IMPLEMENTED).json({
            'status': false,
            'errorCode': errorCodeConstant.NOT_IMPLEMENTED
        });
    });
};