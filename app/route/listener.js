const routeConstant = require('../../resource/constant/route');
const errorCodeConstant = require('../../resource/constant/errorCode');
const httpStatusCodeConstant = require('../../resource/constant/httpStatusCode');
const tokenValidation = require('../../resource/validation/token');
const logger = require('../../resource/utility/log');

module.exports = function(app) {

    let listenerDAO = app.dao.listenerDAO;

    /**
     * @api {post} /listener Rota para a criação de um listener
     * 
     * @apiName Criação
     * @apiGroup Listener
     * @apiPermission admin
     * 
     * @apiParam {String} token O token para validação do usuário
     * @apiParam {String} idLocal O id do local cujo usuário quer monitorar
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 Created
     * 
     * @apiError 1 Ocorreu um erro no banco de dados
     * 
     * @apiErrorExample Error-Response 1:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "errorCode": "1"
     *     }
     */
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