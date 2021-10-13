"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var TokenJWT_1 = require("../middleware/jwt/TokenJWT");
var router = express_1.default.Router();
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
router.get('/refreshTokens', TokenJWT_1.refreshTokens);
module.exports = router;
