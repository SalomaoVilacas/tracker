const routeConstant = require('../../resource/constant/route');
const errorCodeConstant = require('../../resource/constant/errorCode');
const httpStatusCodeConstant = require('../../resource/constant/httpStatusCode');
const tokenValidation = require('../../resource/validation/token');
const logger = require('../../resource/utility/log');

module.exports = function(app) {

    let logDAO = app.dao.logDAO;

    app.post(routeConstant.CREATE_LOG, tokenValidation, function(req, res) {

        let log = {};
        log.message = req.body.message;
        log.plataform = req.body.plataform;

        logDAO.create(log, function(error) {

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