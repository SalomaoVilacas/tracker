const routeConstant = require('../../resource/constant/route');
const errorCodeConstant = require('../../resource/constant/errorCode');
const httpStatusCodeConstant = require('../../resource/constant/httpStatusCode');

const tokenValidation = require('../../resource/validation/token');

const log = require('../../resource/utility/log');

module.exports = function(app) {

    let logDAO = app.dao.logDAO;

    app.post(routeConstant.CREATE_LOG, tokenValidation, function(req, res) {

        let logger = req.body.log;
        let plataform = req.body.plataform;

        logDAO.create({'log': logger, 'plataform': plataform}, function(error) {

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