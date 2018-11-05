const routeConstant = require('../../resource/constant/route');
const errorCodeConstant = require('../../resource/constant/errorCode');
const httpStatusCodeConstant = require('../../resource/constant/httpStatusCode');
const assetConstant = require('../../resource/constant/asset');
const tokenValidation = require('../../resource/validation/token');
const logger = require('../../resource/utility/log');

module.exports = function(app) {

    let assetDAO = app.dao.assetDAO;

    /**
     * @api {post} /asset Rota para a criação de um ativo
     * 
     * @apiName Criação
     * @apiGroup Ativo
     * @apiPermission admin
     * 
     * @apiParam {String} token O token para validação do usuário
     * @apiParam {Object} asset O objeto ativo que deseja criar
     * @apiParam {String} asset.id O id do ativo
     * @apiParam {String} asset.name O nome do ativo
     * @apiParam {String} asset.type O tipo do ativo
     * @apiParam {String} asset.descripton A descrição do ativo
     * @apiParam {String} asset.local O local que o ativo está localizado no momento
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 Created
     * 
     * @apiError 1 Ocorreu um erro no banco de dados
     * @apiError 7 O id do ativo já existe
     * 
     * @apiErrorExample Error-Response 1:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "errorCode": "1"
     *     }
     * 
     * @apiErrorExample Error-Response 2:
     *     HTTP/1.1 403 Forbidden
     *     {
     *         "errorCode": "7"
     *     }
     */
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
                        let id = asset.id;
                        delete asset.id;

                        assetDAO.update(id, asset, function(error) {

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
                            res.status(httpStatusCodeConstant.CREATED).json();
            
                            return;
                        }
                    });
                }
            }
        });
    });

    /**
     * @api {get} /asset Rota que retorna uma lista com todos os ativos disponíveis
     * 
     * @apiName Leitura
     * @apiGroup Ativo
     * 
     * @apiParam {String} token O token para validação do usuário
     * 
     * @apiSuccess {Object[]} assets Uma lista de ativos
     * @apiSuccess {String} assets.id O id de um ativo
     * @apiSuccess {String} assets.name O nome de um ativo
     * @apiSuccess {String} assets.type O tipo do ativo
     * @apiSuccess {String} assets.description A descrição do ativo
     * @apiSuccess {String} assets.local O local que o ativo está localizado no momento
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 Ok
     *      {
     *          "assets": [
     *              {
     *                  "id": "3005fb63ac1f3681ec880468",
     *                  "name": "asset name",
     *                  "type": "asset_type",
     *                  "description": "asset description",
     *                  "local": "asset_local"
     *              }
     *          ]
     *      }
     * 
     * @apiError 1 Ocorreu um erro no banco de dados
     * 
     * @apiErrorExample Error-Response 1:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "errorCode": "1"
     *     }
     */
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

    app.get(routeConstant.READ_VISIBLE_TAGS, function(req, res) {

        let local = req.query.local;
        let timestamp = req.query.timestamp;
        let visibleTags = [];

        assetDAO.readAvailableDocumentsVisible(local, timestamp, function(error, result) {

            if(error) logger.error(error);
            else {
                for(let i = 0; i < result.length; i++) {
                    let tag = result[i].toObject();

                    if(tag.eventHistoric[0] && tag.eventHistoric[0].type == 'scan_in') {
                        delete tag.status;
                        delete tag._id;
                        delete tag.eventHistoric;

                        visibleTags.push(tag);
                    }
                }

                res.status(httpStatusCodeConstant.OK).json({
                    "assets": visibleTags
                })

                return;
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
                if(result) {
                    res.status(httpStatusCodeConstant.OK).json({
                        'asset': result
                    });

                    return;
                }else {
                    res.status(httpStatusCodeConstant.NOT_FOUND).json({
                        'errorCode': errorCodeConstant.RESOURCE_NOT_FOUNT
                    });
                }
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