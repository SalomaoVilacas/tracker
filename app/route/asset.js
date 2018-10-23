const routeConstant = require('../../resource/constant/route');
const errorCodeConstant = require('../../resource/constant/errorCode');
const httpStatusCodeConstant = require('../../resource/constant/httpStatusCode');
const tokenValidation = require('../../resource/validation/token');
const logger = require('../../resource/utility/log');

module.exports = function(app) {

    let assetDAO = app.dao.assetDAO;

    app.post(routeConstant.CREATE_ASSET, tokenValidation, function(req, res) {

        let asset = req.body.asset;
        asset.status = 1;

        assetDAO.create(asset, function(error) {

            if(error) {
                logger.error(error);

                res.status(httpStatusCodeConstant.INTERNAL_SERVER_ERROR).json({
                    'errorCode': errorCodeConstant.DATABASE_ERROR
                });

                return;
            }else {
                res.status(httpStatusCodeConstant.RESET_CONTENT).json();

                return;
            }
        });
    });

    app.get(routeConstant.READ_ASSET, tokenValidation, function(req, res) {

        assetDAO.read(function(error, result) {

            if(error) {
                logger.error(error);

                res.status(httpStatusCodeConstant.INTERNAL_SERVER_ERROR).json({
                    'errorCode': errorCodeConstant.DATABASE_ERROR
                });

                return;
            }else {
                res.status(httpStatusCodeConstant.OK).json({
                    'assets': result
                });

                return;
            }
        });
    });

    app.put(routeConstant.UPDATE_ASSET, tokenValidation, function(req, res) {

        let asset = req.body.asset;
        asset.status = 1;

        assetDAO.update(asset, function(error) {

            if(error) {
                logger.error(error);

                res.status(httpStatusCodeConstant.INTERNAL_SERVER_ERROR).json({
                    'errorCode': errorCodeConstant.DATABASE_ERROR
                });

                return;
            }else {
                res.status(httpStatusCodeConstant.NO_CONTENT).json();

                return;
            }
        });
    });

    app.delete(routeConstant.DELETE_LISTENER, tokenValidation, function(req, res) {

        let id = req.query.id;

        assetDAO.delete(id, function(error) {

            if(error) {
                logger.error(error);

                res.status(httpStatusCodeConstant.INTERNAL_SERVER_ERROR).json({
                    'errorCode': errorCodeConstant.DATABASE_ERROR
                });

                return;
            }else {
                res.status(httpStatusCodeConstant.RESET_CONTENT).json();

                return;
            }
        });
    });

    app.get(routeConstant.READ_ASSET_BY_ID, function(req, res) {

        let id = req.param.id;

        assetDAO.readById(id, function(error, result) {

            if(error) {
                logger.error(error);

                res.status(httpStatusCodeConstant.INTERNAL_SERVER_ERROR).json({
                    'errorCode': errorCodeConstant.DATABASE_ERROR
                });

                return;
            }else {
                res.status(httpStatusCodeConstant.OK).json({
                    'asset': result
                });

                return;
            }
        });
    });

    app.patch(routeConstant.PARTIAL_UPDATE_ASSET, function(req, res) {

        let asset = req.body.asset;
        asset.status = 1;

        assetDAO.partialUpdate(asset, function(error) {

            if(error) {
                logger.error(error);

                res.status(httpStatusCodeConstant.INTERNAL_SERVER_ERROR).json({
                    'errorCode': errorCodeConstant.DATABASE_ERROR
                });

                return;
            }else {
                res.status(httpStatusCodeConstant.NO_CONTENT).json();

                return;
            }
        });
    });
}; 