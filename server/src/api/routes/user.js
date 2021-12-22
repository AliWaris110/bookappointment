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
var express_1 = require("express");
var typedi_1 = require("typedi");
var auth_1 = require("./auth");
var middlewares_1 = require("../middlewares");
var UserService_1 = require("../services/UserService");
// import requestIp from 'request-ip';
// app.use(requestIp.mw())
var route = (0, express_1.Router)();
///authorization is mandatory to get users///
route.get('/', 
// isAuth,
// attachUser,
// checkRole('admin'),
function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, userServiceInstance, activeUsers, inActiveUsers, allUsers, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling GET /user endpoint');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                userServiceInstance = typedi_1.Container.get(UserService_1["default"]);
                userServiceInstance.request = req;
                return [4 /*yield*/, userServiceInstance.find()];
            case 2:
                activeUsers = (_a.sent()).filter(function (isActive) { return isActive.active === true && isActive.role === 'user'; });
                return [4 /*yield*/, userServiceInstance.find()];
            case 3:
                inActiveUsers = (_a.sent()).filter(function (isActive) { return isActive.active === false; });
                return [4 /*yield*/, userServiceInstance.find()];
            case 4:
                allUsers = _a.sent();
                ////Will set it for admin after redux setting/////
                // const allUsers = beforeFilteringAllUsers.filter(
                //   (item) => item.id.toString() != req.currentUser.id.toString()
                // );
                return [2 /*return*/, res
                        .json({
                        users: activeUsers,
                        inActiveUsers: inActiveUsers,
                        allUsers: allUsers
                    })
                        .status(200)];
            case 5:
                e_1 = _a.sent();
                return [2 /*return*/, next(e_1)];
            case 6: return [2 /*return*/];
        }
    });
}); });
////checking current admin rol user///////
route.get('/current', middlewares_1.isAuth, middlewares_1.attachUser, function (req, res, next) {
    var logger = typedi_1.Container.get('logger');
    logger.debug('Calling GET /user/current endpoint');
    try {
        return res.json({ user: req.currentUser }).status(200);
    }
    catch (error) {
        next(error);
    }
});
////for verify email
route.post('/verify-email', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, userServiceInstance, verifyEmail, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling post /verify-email endpoint');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                userServiceInstance = typedi_1.Container.get(UserService_1["default"]);
                return [4 /*yield*/, userServiceInstance.verifyEmail(req.body)];
            case 2:
                verifyEmail = _a.sent();
                return [2 /*return*/, res
                        .json({ message: 'Verification successful, you can now login' })
                        .status(200)];
            case 3:
                e_2 = _a.sent();
                res.status(404).json({ message: e_2 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//////forgot password//////
route.post('/forgot-password', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, userServiceInstance, forgotPassword, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling post /forgot-password endpoint');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                userServiceInstance = typedi_1.Container.get(UserService_1["default"]);
                return [4 /*yield*/, userServiceInstance.forgotPassword(req.body, req.get('origin'))];
            case 2:
                forgotPassword = _a.sent();
                return [2 /*return*/, res
                        .json({
                        message: 'Please check your email for password reset instructions'
                    })
                        .status(200)];
            case 3:
                e_3 = _a.sent();
                res.status(404).json({ message: e_3 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
route.post('/reset-password', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, userServiceInstance, resetPassword, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling post /reset-password endpoint');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                userServiceInstance = typedi_1.Container.get(UserService_1["default"]);
                return [4 /*yield*/, userServiceInstance.resetPassword(req.body)];
            case 2:
                resetPassword = _a.sent();
                return [2 /*return*/, res
                        .json({ message: 'Password reset successful, you can now login' })
                        .status(200)];
            case 3:
                e_4 = _a.sent();
                res.status(404).json({ messageresetpassword: e_4 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//////////RefreshTOken//////
route.post('/refresh-token', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, userServiceInstance, token, ipAddress, getRefreshToken, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling post /refresh-token endpoint');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                userServiceInstance = typedi_1.Container.get(UserService_1["default"]);
                token = req.cookies.refreshToken;
                ipAddress = req.ip;
                console.log('token inside of cookie: ', token);
                return [4 /*yield*/, userServiceInstance.refreshToken({
                        token: token,
                        ipAddress: ipAddress
                    })];
            case 2:
                getRefreshToken = _a.sent();
                res.status(200).json({ refreshToken: getRefreshToken });
                (0, auth_1.setTokenCookie)(res, getRefreshToken.refreshToken);
                res.json(getRefreshToken);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log('Refresh-token route:', error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/////////Find user info by giving id/////
route.get('/:id', middlewares_1.isAuth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, userServiceInstance, user, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling GET /user/find/:id endpoint');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                userServiceInstance = typedi_1.Container.get(UserService_1["default"]);
                return [4 /*yield*/, userServiceInstance.findOne(req.params.id)];
            case 2:
                user = _a.sent();
                if (user.active) {
                    return [2 /*return*/, res
                            .json({ message: 'User fetched Successfully', User: user })
                            .status(200)];
                }
                else {
                    return [2 /*return*/, res.json({ message: 'User not found' }).status(404)];
                }
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                return [2 /*return*/, res.status(404).send({ message: e_5 })];
            case 4: return [2 /*return*/];
        }
    });
}); });
///Deleting user with admin permission////
route.patch('/:id', 
/*isAuth, attachUser, */ function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, id, userServiceInstance, getUserWithId, user, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling GET /user/delete/:id endpoint');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                id = req.params.id;
                userServiceInstance = typedi_1.Container.get(UserService_1["default"]);
                return [4 /*yield*/, userServiceInstance.findOne(id)];
            case 2:
                getUserWithId = _a.sent();
                userServiceInstance.request = req;
                return [4 /*yield*/, userServiceInstance.updateActive(id, getUserWithId)];
            case 3:
                user = _a.sent();
                if (user) {
                    return [2 /*return*/, res
                            .json({ message: 'User deleted Successfully', User: user })
                            .status(200)];
                }
                else {
                    return [2 /*return*/, res
                            .json({
                            message: 'User Record Not Found'
                        })
                            .status(404)];
                }
                return [3 /*break*/, 5];
            case 4:
                e_6 = _a.sent();
                return [2 /*return*/, res.status(404).send({ message: e_6 })];
            case 5: return [2 /*return*/];
        }
    });
}); });
route.patch('/:id', middlewares_1.isAuth, middlewares_1.attachUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, userServiceInstance, users, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling patch /user endpoint');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                userServiceInstance = typedi_1.Container.get(UserService_1["default"]);
                return [4 /*yield*/, userServiceInstance.update(req.params.id, req.body)];
            case 2:
                users = _a.sent();
                // console.log('Users of patch route', users);
                return [2 /*return*/, res.json(users).status(200)];
            case 3:
                e_7 = _a.sent();
                res.status(404).json({ message: e_7 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// /////setting up cookie/////
//  function setTokenCookie(res:Response, token:string) {
//   // create cookie with refresh token that expires in 7 days
//   const cookieOptions = {
//       httpOnly: true,
//       expires: new Date(Date.now() + 7*24*60*60*1000)
//   };
//   res.cookie('refreshToken', token, cookieOptions);
// }
exports["default"] = route;
