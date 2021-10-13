"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokens = exports.verificationToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var db_1 = __importDefault(require("../../config/db"));
require('dotenv').config();
var accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET || 'JKh78gh8kh';
var refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET || 'encryptedsecret2';
var accessTokenExpiryTime = process.env.JWT_ACCESS_TOKEN_EXPIRETIME || '2H';
/**
 * Checks if a valid token is provided
 * @param req
 * @param res
 * @param next
 * @returns unauthorised error status if no valid token is provided
 */
exports.verificationToken = function (req, res, next) {
    var _a;
    var token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
    if (token) {
        jsonwebtoken_1.default.verify(token, accessTokenSecret, function (error, decoded) {
            if (error) {
                if (error.message === "jwt expired") {
                    return res.status(401).json({
                        error: true,
                        message: "Votre token n'ai plus valide,veuillez le réinitinaliser"
                    });
                }
                else if (error.message === "jwt malformed") {
                    return res.status(401).json({
                        error: true,
                        message: "Le token envoyer n'existe pas"
                    });
                }
                else {
                    return res.status(401).json({
                        error: true,
                        message: "Le token envoyer n'est pas conforme"
                    });
                }
            }
            else {
                res.locals.jwt = decoded;
                next();
            }
        });
    }
    else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};
exports.refreshTokens = function (req, res) {
    var _a;
    var token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
    if (token) {
        jsonwebtoken_1.default.verify(token, refreshTokenSecret, function (error, decoded) { return __awaiter(void 0, void 0, void 0, function () {
            var iduser, verification, token_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!error) return [3 /*break*/, 1];
                        if (error.message === "jwt expired") {
                            return [2 /*return*/, res.status(401).json({
                                    error: true,
                                    message: "Votre token n'ai plus valide,veuillez le réinitinaliser"
                                })];
                        }
                        else if (error.message === "jwt malformed") {
                            return [2 /*return*/, res.status(401).json({
                                    error: true,
                                    message: "Le token envoyer n'existe pas"
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(401).json({
                                    error: true,
                                    message: "Le token envoyer n'est pas conforme"
                                })];
                        }
                        return [3 /*break*/, 3];
                    case 1:
                        iduser = decoded.id;
                        return [4 /*yield*/, db_1.default.query('SELECT iduser FROM user WHERE iduser=?', [iduser])];
                    case 2:
                        verification = _a.sent();
                        if (verification.length === 0) {
                            return [2 /*return*/, res.status(404).send({ message: "Le token n'est plus valide" })];
                        }
                        ;
                        console.log(iduser);
                        token_1 = jsonwebtoken_1.default.sign({ id: iduser }, accessTokenSecret, {
                            expiresIn: accessTokenExpiryTime
                        });
                        return [2 /*return*/, res.status(200).json({
                                error: false,
                                tokens: {
                                    token: token_1,
                                },
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    }
    else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};
