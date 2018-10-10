// const route = require('../../../RESOURCE/route/account');
// const errorCode = require('../../../RESOURCE/utility/errorCode');
// const errorLogger = require('../../../RESOURCE/log/error');

// const tokenCreation = require('../../../RESOURCE/utility/tokenCreation');

// const emailValidation = require('../../../RESOURCE/validation/email');
// const passwordValidation = require('../../../RESOURCE/validation/password');
// const authenticationTypeValidation = require('../../../RESOURCE/validation/authenticationType');

// module.exports = function(app) {

//     let userDAO = app.dao.userDAO;  
//     let authenticatedUserDAO = app.dao.authenticatedUserDAO;

//     app.post(route.LOGIN, function(req, res) {

//         let email = req.body.email;
//         let password = req.body.password;
//         let type = req.body.type;

//         if(emailValidation(email) && passwordValidation(password) && authenticationTypeValidation(type)) {
//             userDAO.readByEmailPassword(email, password, function(error, result) {

//                 if(error) {
//                     errorLogger.error(error);

//                     res.json({
//                         'status': false,
//                         'errorCode': errorCode.DATABASE_ERROR
//                     });

//                     return;
//                 }else {
//                     if(result) {
//                         let user = result;
//                         let token = tokenCreation(user);

//                         authenticatedUserDAO.deleteByIdUserType(user._id, type, function(error) {

//                             if(error) {
//                                 errorLogger.error(error);

//                                 res.json({
//                                     'status': false,
//                                     'errorCode': errorCode.DATABASE_ERROR
//                                 });

//                                 return;
//                             }else {
//                                 authenticatedUserDAO.create(user._id, token, type, function(error) {

//                                     if(error) {
//                                         errorLogger.error(error);

//                                         res.json({
//                                             'status': false,
//                                             'errorCode': errorCode.DATABASE_ERROR
//                                         });

//                                         return;
//                                     }else {
//                                         res.json({
//                                             'status': true,
//                                             'results': {
//                                                 'token': token,
//                                                 'lastEditionDate': user.lastEditionDate
//                                             }
//                                         });

//                                         return;
//                                     }
//                                 });
//                             }
//                         });
//                     }else {
//                         res.json({
//                             'status': false,
//                             'errorCode': errorCode.INCORRECT_EMAIL_PASSWORD
//                         });

//                         return;
//                     }
//                 }
//             });
//         }else {
//             res.json({
//                 'status': false,
//                 'errorCode': errorCode.INVALID_REQUEST
//             });

//             return;
//         }
//     });
// };