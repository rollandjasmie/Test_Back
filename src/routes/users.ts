import express from 'express';
import controller from '../controllers/user';
import { dataVideUpdate, updateUser } from '../middleware/validation/datavideupdate';
import {verificationToken} from '../middleware/jwt/TokenJWT';
import { changePassword, validationChangePassword } from '../middleware/validation/changePassword';
import { emailAlreadyExists } from '../middleware/user/emailAlreadyExists';
import { validatorDataMissingRegister, register } from '../middleware/validation/validatorDataMissingRegister';
import { validatorDataMissingLogin, login } from '../middleware/validation/validatorDataMissingLogin';
import { dataNotCompliant, checkMailAndpassword } from '../middleware/validation/dataNotCompliant';

const router = express.Router();


/**
 * @api {get} / index page
 * @apiName index page
 * @apiGroup Users
 *
 * @apiSuccess (200)             send page index
 * @apiError  (404) send page index 404
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *   
 */
router.get('/', controller.index);


/**
 * @api {post} /auht/register Create user
 * @apiName Create user
 * @apiGroup Authenfication
 *
 * @apiParam {String} firstname firstname of user
 * @apiParam {String} lastname lastname of user
 * @apiParam {String} email email of user
 * @apiParam {String} password password of user
 * @apiParam {String} date_naissance date de naissance of user
 * @apiParam {String} sexe sexe of user

 *
 * @apiSuccess (200) {String}             message   message confirmant l'opération
 * @apiSuccess (200) {String}             error   false
 * @apiSuccess (200) {Object}             tokens   tokens 
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
  "error": false,
  "message": "L'utulistauer a bien été créé avec succès",
  "tokens": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvemV6emR6bGxhbmR6QGdtYWlsLmNvbSIsImlkIjozMCwiaWF0IjoxNjM0MDQ0MTk3LCJleHAiOjE2MzQwNTEzOTd9.wkzOQ524QDj9YE7iHH1h4r38B0Qk0tZXfQ95e-mo9cA",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvemV6emR6bGxhbmR6QGdtYWlsLmNvbSIsImlkIjozMCwiaWF0IjoxNjM0MDQ0MTk3LCJleHAiOjE2MzQ2NDg5OTd9.rROZwHPCm5MUV4Jn03ZboXDaGwwgOfONd2ZnzPYXXPM"
  }
}
 */
router.post('/register', validatorDataMissingRegister(register), dataNotCompliant(checkMailAndpassword), emailAlreadyExists, controller.register);


/**
 * @api {post} /auht/login Login
 * @apiName Login
 * @apiGroup Authenfication
 *
 * @apiParam {String} email email of the user.
 * @apiParam {String} password password of the user.

 * @apiSuccess (200) {String}              authentication successful
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 * "error": false,
 * "message": "L'utulistauer a  été authentifié  succès",
 * "tokens": {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUsImlhdCI6MTYzNDEwNzQ2MCwiZXhwIjoxNjM0MTE0NjYwfQ.aGe5ZSayVvMchH95tY9NthbSb0TYmCaU9juWajAuBHs",
 *   "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUsImlhdCI6MTYzNDEwNzQ2MCwiZXhwIjoxNjM0NzEyMjYwfQ.-dgt8yOQQSODplbDJmLKQYdiNTNAsjiVPIePFbqmAEA",
 *   "createdAt": "2021-10-11T21:00:00.000Z"
 * }
}
 */
router.post('/login', validatorDataMissingLogin(login), controller.login);


/**
 * @api {get} /user/:id get one user
 * @apiName Get one user
 * @apiGroup User
 *
 * @apiParam {String} id id of the user.
 * @apiHeader {String} access-key Users unique access-key

 * @apiSuccess (200) {String}             get one user succès
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 *     "error": false,
 *     "firstname": "rolland",
 *     "lastname": "SAF",
 *     "email": "rea@gmail.com",
*      "date_naissance": "2020-12-03T21:00:00.000Z",
*      "sexe": "male",
 *     "createdAt": "2021-10-11T21:00:00.000Z"
 * }
 */
router.get('/user/:id', verificationToken, controller.getUser);


/**
 * @api {put} /user/:id update an user
 * @apiName update an user
 * @apiGroup User
 *
 * @apiParam {String} id id of the user.
 * @apiParam {String} firstname firstname of user
 * @apiParam {String} lastname lastname of user
 * @apiParam {String} date_naissance date de naissance of user
 * @apiParam {String} sexe sexe of user
 * @apiHeader {String} access-key Users unique access-key
 * 
 * @apiSuccess (200) {String}             modification succès
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 *  "error": false,
 * "message": "L'utilisateur a été modifiée succès"
 * }
 */
router.put('/user/:id', dataVideUpdate(updateUser),verificationToken, controller.UpdateUser);


/**
 * @api {put} /changePassword/:id update password
 * @apiName get update password
 * @apiGroup User
 *
 * @apiParam {String} id id of the user.
 * @apiParam {String} currenPassword currenPassword of the user.
 * @apiParam {String} newPassword newPassword of the user.
 * @apiParam {String} confirmPassword confirmPassword of the user.
 *
 * @apiHeader {String} access-key Users unique access-key
 *
 * @apiSuccess (200) {String}             modification succès
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 *  "error": false,
 *  "message": "Le mot de passe a été modifiée succès"
 * }
 */
router.put('/changePassword/:id', verificationToken, validationChangePassword(changePassword), controller.changePassword);



/**
 * @api {get} /users get all user
 * @apiName get all user
 * @apiGroup User
 *
 *
 * @apiHeader {String} access-key Users unique access-key
 * 
 * @apiSuccess (200) {String}             modification succès
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 *  "error": false,
 * "message": "L'utilisateur a été modifiée succès"
 * }
 */
router.get('/users', verificationToken, controller.getAllUser);

/**
 * @api {delete} /auht/user disconnection
 * @apiName logout
 * @apiGroup User
 *
 *
 * @apiHeader {String} access-key Users unique access-key
 * 
 * @apiSuccess (200) {String}             modification succès
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 * "error": false,
 * "message": "L'utilisateur a été déconnecté succès"
 *  }
 */
router.delete('/user', controller.logout);




export = router;
