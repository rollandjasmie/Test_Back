"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("./routes/users"));
var refreshTokens_1 = __importDefault(require("./routes/refreshTokens"));
require('dotenv').config();
/** PORT AND HOSTNAME */
var app = express_1.default();
/** Parse the body of the request */
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
/** Rules of our API */
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'x-access-token,Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
/** use api doc */
app.use(express_1.default.static('apidoc'));
/** Routes go user */
app.use('/', users_1.default);
/** Routes go refreshTokens */
app.use('/token', refreshTokens_1.default);
/** Error handling */
app.use(function (req, res, next) {
    var error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});
app.listen(process.env.PORT || 5000)
