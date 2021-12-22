"use strict";
exports.__esModule = true;
var express_jwt_1 = require("express-jwt");
var config_1 = require("../../config");
var getTokenFromHeader = function (req) {
    if ((req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Token') ||
        (req.headers.authorization &&
            req.headers.authorization.split(' ')[0] === 'Bearer')) {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};
var isAuth = (0, express_jwt_1["default"])({
    secret: config_1["default"].jwtSecret,
    requestProperty: 'token',
    getToken: getTokenFromHeader,
    algorithms: ['HS256']
});
exports["default"] = isAuth;
