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
 *     HTTP/1.1 205 Reset Content
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

/**
 * @api {get} /asset Rota que retorna uma lista com todos os ativos disponíveis
 * 
 * @apiName Leitura
 * @apiGroup Ativo
 * 
 * @apiParam {String} token O token para validação do usuário
 * 
 * @apiSuccess {Array} assets Uma lista de ativos
 * @apiSuccess {String} asset.id Uma lista de ativos
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 205 Reset Content
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

/**
 * @apiDefinePermission admin Admin access rights needed
 * Optionally you can write here further Informations about the permission
 *
 *
 * @apiVersion 1.0.0
 */