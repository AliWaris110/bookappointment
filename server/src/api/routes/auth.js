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
exports.__esModule = true;
exports.setTokenCookie = void 0;
var express_1 = require("express");
var typedi_1 = require("typedi");
var celebrate_1 = require("celebrate");
var UserService_1 = require("../services/UserService");
var route = (0, express_1.Router)();
route.post('/register', (0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object({
        firstName: celebrate_1.Joi.string().required(),
        lastName: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().required(),
        password: celebrate_1.Joi.string().required(),
        role: celebrate_1.Joi.string()
    })
}), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, userServiceInstance, _a, user, jwtToken, isUserExists, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling /register endpoint with body: %o', req.body);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                userServiceInstance = typedi_1.Container.get(UserService_1["default"]);
                return [4 /*yield*/, userServiceInstance.register(req.body, req.get('origin'))];
            case 2:
                _a = _b.sent(), user = _a.user, jwtToken = _a.jwtToken, isUserExists = _a.isUserExists;
                return [2 /*return*/, res.status(201).json({ message: "Successful" })];
            case 3:
                e_1 = _b.sent();
                return [2 /*return*/, next(e_1)];
            case 4: return [2 /*return*/];
        }
    });
}); });
route.post('/login', (0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object({
        email: celebrate_1.Joi.string().required(),
        password: celebrate_1.Joi.string().required()
    })
}), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, userServiceInstance, ipAddress, _a, jwtToken, refreshToken, user, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling /login endpoint with email: %s', req.body.email);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                userServiceInstance = typedi_1.Container.get(UserService_1["default"]);
                ipAddress = req.ip;
                return [4 /*yield*/, userServiceInstance.login(req.body.email, req.body.password, ipAddress)];
            case 2:
                _a = _b.sent(), jwtToken = _a.jwtToken, refreshToken = _a.refreshToken, user = _a.user;
                setTokenCookie(res, refreshToken);
                return [2 /*return*/, res.json({ user: user, jwtToken: jwtToken }).status(200)];
            case 3:
                e_2 = _b.sent();
                return [2 /*return*/, next(e_2)];
            case 4: return [2 /*return*/];
        }
    });
}); });
/////setting up cookie/////
function setTokenCookie(res, token) {
    // create cookie with refresh token that expires in 7 days
    var cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    };
    res.cookie('refreshToken', token, cookieOptions);
}
exports.setTokenCookie = setTokenCookie;
exports["default"] = route;
