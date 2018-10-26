const routeConstant = require('../../resource/constant/route');
const errorCodeConstant = require('../../resource/constant/errorCode');
const httpStatusCodeConstant = require('../../resource/constant/httpStatusCode');
const assetConstant = require('../../resource/constant/asset');
const tokenValidation = require('../../resource/validation/token');
const logger = require('../../resource/utility/log');

module.exports = function(app) {

    let assetDAO = app.dao.assetDAO;

    app.post(routeConstant.CREATE_ASSET, function(req, res) {

        let asset = req.body.asset;
        asset.status = [assetConstant.STATUS_AVAILABLE, new Date().getTime()];

        assetDAO.readById(asset.id, function(error, result) {

            if(error) {
                logger.error(error);

                res.status(httpStatusCodeConstant.INTERNAL_SERVER_ERROR).json({
                    'errorCode': errorCodeConstant.DATABASE_ERROR
                });

                return;
            }else {
                if(result) {
                    if(result.status[0] == assetConstant.STATUS_AVAILABLE) {
                        res.status(httpStatusCodeConstant.FORBIDDEN).json({
                            'errorCode': errorCodeConstant.ID_ALREADY_EXIST
                        });
        
                        return;
                    }else {
                        assetDAO.update(asset, function(error, result) {

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
                    }
                }else {
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
                }
            }
        });
    });

    app.get(routeConstant.READ_ASSET, function(req, res) {

        assetDAO.readAvailableDocuments(function(error, result) {

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

    app.put(routeConstant.UPDATE_ASSET, function(req, res) {

        let id = req.params.id;
        let asset = req.body.asset;
        asset.status = [assetConstant.STATUS_AVAILABLE, new Date().getTime()];

        assetDAO.readById(id, function(error, result) {

            if(error) {
                logger.error(error);

                res.status(httpStatusCodeConstant.INTERNAL_SERVER_ERROR).json({
                    'errorCode': errorCodeConstant.DATABASE_ERROR
                });

                return;
            }else {
                if(result) {
                    if(result.status[0] == assetConstant.STATUS_AVAILABLE) {
                        assetDAO.update(id, asset, function(error) {

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
                    }else {
                        res.status(httpStatusCodeConstant.NOT_FOUND).json({
                            "errorCode": errorCodeConstant.RESOURCE_DELETED
                        });

                        return;
                    }
                }else {
                    res.status(httpStatusCodeConstant.NOT_FOUND).json({
                        "errorCode": errorCodeConstant.RESOURCE_NOT_FOUNT
                    });

                    return;
                }
            }
        });
    });

    app.delete(routeConstant.DELETE_ASSET, function(req, res) {

        let id = req.params.id;

        assetDAO.readById(id, function(error, result) {

            if(error) {
                logger.error(error);

                res.status(httpStatusCodeConstant.INTERNAL_SERVER_ERROR).json({
                    'errorCode': errorCodeConstant.DATABASE_ERROR
                });

                return;
            }else {
                if(result) {
                    if(result.status[0] == assetConstant.STATUS_AVAILABLE) {
                        assetDAO.disable(id, function(error) {

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
                    }else {
                        res.status(httpStatusCodeConstant.FORBIDDEN).json({
                            "errorCode": errorCodeConstant.RESOURCE_DELETED
                        });

                        return;
                    }
                }else {
                    res.status(httpStatusCodeConstant.NOT_FOUND).json({
                        "errorCode": errorCodeConstant.RESOURCE_NOT_FOUNT
                    });

                    return;
                }
            }
        });
    });

    app.get(routeConstant.READ_ASSET_BY_ID, function(req, res) {

        let id = req.params.id;

        assetDAO.readAvailableDocumentsById(id, function(error, result) {

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

        let id = req.params.id;
        let asset = req.body.asset;
        asset.status = [assetConstant.STATUS_AVAILABLE, new Date().getTime()];

        assetDAO.readById(id, function(error, result) {

            if(error) {
                logger.error(error);

                res.status(httpStatusCodeConstant.INTERNAL_SERVER_ERROR).json({
                    'errorCode': errorCodeConstant.DATABASE_ERROR
                });

                return;
            }else {
                if(result) {
                    if(result.status[0] == assetConstant.STATUS_AVAILABLE) {
                        assetDAO.partialUpdate(id, asset, function(error) {

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
                    }else {
                        res.status(httpStatusCodeConstant.NOT_FOUND).json({
                            "errorCode": errorCodeConstant.RESOURCE_DELETED
                        });

                        return;
                    }
                }else {
                    res.status(httpStatusCodeConstant.NOT_FOUND).json({
                        "errorCode": errorCodeConstant.RESOURCE_NOT_FOUNT
                    });

                    return;
                }
            }
        });
    });

    app.post(routeConstant.FILTER_ASSET_LIST, function(req, res) {

        let assetFilterParameter = req.body.assetFilterParameter;

        assetDAO.filterAvailableDocuments(assetFilterParameter, function(error, result) {

            if(error) {
                logger.error(error);

                res.status(httpStatusCodeConstant.INTERNAL_SERVER_ERROR).json({
                    'errorCode': errorCodeConstant.DATABASE_ERROR
                });

                return;
            }else {
                res.status(httpStatusCodeConstant.ACCEPTED).json({
                    'assets': result
                });

                return;
            }
        });
    });
};