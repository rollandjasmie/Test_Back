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
var mysql_1 = require("../config/mysql");
var db_1 = __importDefault(require("../config/db"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Load env variables
var accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET || 'encryptedsecret';
var accessTokenExpiryTime = process.env.JWT_ACCESS_TOKEN_EXPIRETIME || '2H';
var refreshTokenExpiryTime = process.env.JWT_REFRESH_TOKEN_EXPIRETIME || '1Y';
var refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET || 'encryptedsecret2';
/**
 * function to page index
 * @param req
 * @param res
 */
//
var index = function (req, res) {
    res.status(200).send();
};
/**
 * function to register
 * @param req
 * @param res
 */
var register = function (req, res) {
    var _a = req.body, firstname = _a.firstname, lastname = _a.lastname, email = _a.email, password = _a.password, date_naissance = _a.date_naissance, sexe = _a.sexe;
    bcryptjs_1.default.hash(password, 10, function (hashError, hash) {
        if (hashError) {
            return res.status(401).json({
                message: hashError.message,
                error: hashError
            });
        }
        var query = "INSERT INTO user (firstname, lastname, email, password, date_naissance, sexe) VALUES (?,?,?,?,?,?)";
        mysql_1.Connect()
            .then(function (connection) {
            mysql_1.Query(connection, query, [firstname, lastname, email, hash, date_naissance, sexe])
                .then(function (result) {
                //create token and refreshToken
                var token = jsonwebtoken_1.default.sign({ email: email, id: result.insertId }, accessTokenSecret, {
                    expiresIn: accessTokenExpiryTime
                });
                var refresh_token = jsonwebtoken_1.default.sign({ email: email, id: result.insertId }, refreshTokenSecret, {
                    expiresIn: refreshTokenExpiryTime
                });
                var createdAt = new Date();
                return res.status(201).json({
                    error: false,
                    message: 'L\'utulistauer a bien été créé avec succès',
                    tokens: {
                        token: token,
                        refresh_token: refresh_token,
                        createdAt: createdAt
                    },
                });
            })
                .catch(function (error) {
                return res.status(500).json({
                    message: error.message,
                    error: error
                });
            });
        })
            .catch(function (error) {
            return res.status(500).json({
                message: error.message,
                error: error
            });
        });
    });
};
/**
 * function to login, verify password and email and give tokens to the user
 * @param req
 * @param res
 * @param next
 */
var login = function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    var query = "SELECT * FROM user WHERE email like ?";
    mysql_1.Connect()
        .then(function (connection) {
        mysql_1.Query(connection, query, [email])
            .then(function (users) {
            if (!users.length)
                return res.status(401).json({ message: 'Votre email ou password est erroné' });
            bcryptjs_1.default.compare(password, users[0].password, function (error, result) { return __awaiter(void 0, void 0, void 0, function () {
                var token, refresh_token;
                return __generator(this, function (_a) {
                    if (error) {
                        return [2 /*return*/, res.status(401).json({
                                errors: error
                            })];
                    }
                    else if (!result) {
                        return [2 /*return*/, res.status(401).json({
                                message: 'Votre email ou password est erroné'
                            })];
                    }
                    else if (result) {
                        token = jsonwebtoken_1.default.sign({ id: users[0].iduser }, accessTokenSecret, {
                            expiresIn: accessTokenExpiryTime
                        });
                        refresh_token = jsonwebtoken_1.default.sign({ id: users[0].iduser }, refreshTokenSecret, {
                            expiresIn: refreshTokenExpiryTime
                        });
                        return [2 /*return*/, res.status(200).json({
                                error: false,
                                message: 'L\'utulistauer a  été authentifié  succès',
                                tokens: {
                                    token: token,
                                    refresh_token: refresh_token,
                                    createdAt: users[0].createdAt
                                },
                            })];
                    }
                    return [2 /*return*/];
                });
            }); });
        })
            .catch(function (error) {
            return res.status(500).json({
                message: error.message,
                error: error
            });
        });
    })
        .catch(function (error) {
        return res.status(500).json({
            message: error.message,
            error: error
        });
    });
};
/**
 * function to get one user
 * @param req
 * @param res
 */
//
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, verification, query, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, db_1.default.query('SELECT iduser FROM user WHERE iduser=?', [id])];
            case 1:
                verification = _a.sent();
                if (verification.length === 0) {
                    return [2 /*return*/, res.status(404).send({ message: "id n'existe pas" })];
                }
                ;
                if (!id) return [3 /*break*/, 3];
                query = 'SELECT firstname, lastname, email,date_naissance,sexe,createdAt FROM user WHERE iduser=?';
                return [4 /*yield*/, db_1.default.query(query, [id])];
            case 2:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        error: false,
                        firstname: user[0].firstname,
                        lastname: user[0].lastname,
                        email: user[0].email,
                        date_naissance: user[0].date_naissance,
                        sexe: user[0].sexe,
                        createdAt: user[0].createdAt
                    })];
            case 3:
                ;
                return [2 /*return*/];
        }
    });
}); };
/**
 * function to update one user
 * @param req
 * @param res
 */
//
var UpdateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstname, lastname, date_naissance, sexe, iduser, verification, query_1, params_1, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, firstname = _a.firstname, lastname = _a.lastname, date_naissance = _a.date_naissance, sexe = _a.sexe;
                req.body = { firstname: firstname, lastname: lastname, date_naissance: date_naissance, sexe: sexe };
                iduser = req.params.id;
                return [4 /*yield*/, db_1.default.query('SELECT iduser FROM user WHERE iduser=?', [iduser])];
            case 1:
                verification = _c.sent();
                if (verification.length === 0) {
                    return [2 /*return*/, res.status(404).send({ message: "id n'existe pas" })];
                }
                ;
                _c.label = 2;
            case 2:
                _c.trys.push([2, 5, , 6]);
                if (!iduser) return [3 /*break*/, 4];
                query_1 = 'UPDATE user SET ';
                params_1 = [];
                //check all value in req.body and push in @query and params
                Object.keys(req.body).forEach(function (key) {
                    if (req.body[key]) {
                        query_1 += key + ' = ?, ';
                        params_1.push(req.body[key]);
                    }
                });
                //delete last comma in query
                query_1 = query_1.slice(0, -2);
                query_1 += ' WHERE iduser = ?';
                params_1.push(req.params.id);
                //requet for update 
                return [4 /*yield*/, db_1.default.query(query_1, params_1)];
            case 3:
                //requet for update 
                _c.sent();
                res.status(200).json({
                    error: false,
                    message: "L'utilisateur a été modifiée succès"
                });
                _c.label = 4;
            case 4:
                ;
                return [3 /*break*/, 6];
            case 5:
                _b = _c.sent();
                return [2 /*return*/, res.status(401).json({
                        error: true,
                        messages: "Aucune donnée n'a été envoyée"
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
/**
 * function to update password one user
 * @param req
 * @param res
 */
//
var changePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, currentPassword, newPassword, iduser, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, currentPassword = _a.currentPassword, newPassword = _a.newPassword;
                iduser = req.params.id;
                return [4 /*yield*/, db_1.default.query('SELECT iduser,password FROM user WHERE iduser=?', [iduser])];
            case 1:
                user = _b.sent();
                if (user.length === 0) {
                    return [2 /*return*/, res.status(404).send({ message: "utilisateur n'existe pas" })];
                }
                ;
                try {
                    //check if the password matches the user
                    bcryptjs_1.default.compare(currentPassword, user[0].password, function (error, result) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (error) {
                                return [2 /*return*/, res.status(401).json({
                                        errors: error
                                    })];
                            }
                            else if (!result) {
                                return [2 /*return*/, res.status(401).json({
                                        message: 'Entrez un mot de passe correct et réessayez'
                                    })];
                            }
                            else if (result) {
                                bcryptjs_1.default.hash(newPassword, 10, function (hashError, hash) { return __awaiter(void 0, void 0, void 0, function () {
                                    var query;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (hashError) {
                                                    return [2 /*return*/, res.status(401).json({
                                                            message: hashError.message,
                                                            error: hashError
                                                        })];
                                                }
                                                query = 'UPDATE user SET password=? WHERE iduser=?';
                                                //requet for update 
                                                return [4 /*yield*/, db_1.default.query(query, [hash, iduser])];
                                            case 1:
                                                //requet for update 
                                                _a.sent();
                                                res.status(200).json({
                                                    error: false,
                                                    message: "Le mot de passe a été modifiée succès"
                                                });
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                }
                catch (error) {
                    return [2 /*return*/, res.status(401).json({
                            error: error
                        })];
                }
                return [2 /*return*/];
        }
    });
}); };
/**
 * function to get all user
 * @param req
 * @param res
 */
//
var getAllUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query;
    return __generator(this, function (_a) {
        query = 'SELECT firstname,lastname,email,sexe FROM user';
        // const users : any = await db.query(query,[])
        // return res.status(200).json({error:false,users:users})
        mysql_1.Connect()
            .then(function (connection) {
            mysql_1.Query(connection, query, [])
                .then(function (users) {
                if (!users.length)
                    return res.status(401).json({
                        error: true,
                        message: 'Aucun utilisateur'
                    });
                return res.status(200).json({ error: false, users: users });
            })
                .catch(function (error) {
                return res.status(500).json({
                    message: error.message,
                    error: error
                });
            });
        })
            .catch(function (error) {
            return res.status(500).json({
                message: error.message,
            });
        });
        return [2 /*return*/];
    });
}); };
var logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).json({ error: false, message: "L'utilisateur a été déconnecté succès" });
        return [2 /*return*/];
    });
}); };
exports.default = { index: index, register: register, login: login, getUser: getUser, UpdateUser: UpdateUser, changePassword: changePassword, getAllUser: getAllUser, logout: logout };
