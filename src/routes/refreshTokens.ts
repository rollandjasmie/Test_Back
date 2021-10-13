import express from 'express';
import { refreshTokens } from '../middleware/jwt/TokenJWT';


const router = express.Router();
/**
 * @api {get} /token/refreshTokens refreshTokens
 * @apiName refreshTokens
 * @apiGroup Refresh_Tokens
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
router.get('/refreshTokens', refreshTokens);

export = router;