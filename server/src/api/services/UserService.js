"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
var jsonwebtoken_1 = require("jsonwebtoken");
var bcryptjs_1 = require("bcryptjs");
var crypto_1 = require("crypto");
var config_1 = require("../../config");
var typedi_1 = require("typedi");
var User_1 = require("../entities/User");
var typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
var class_validator_1 = require("class-validator");
var CRUD_1 = require("./CRUD");
var ErrorHandler_1 = require("../../helpers/ErrorHandler");
var RefreshToken_1 = require("../entities/RefreshToken");
var send_email_1 = require("../../helpers/send-email");
// const sendEmail = require('_helpers/send-email');
var UserService = /** @class */ (function (_super) {
    __extends(UserService, _super);
    function UserService(userRepo, refreshTokenRepo, logger) {
        var _this = _super.call(this, userRepo, logger) || this;
        _this.userRepo = userRepo;
        _this.refreshTokenRepo = refreshTokenRepo;
        _this.logger = logger;
        return _this;
    }
    Object.defineProperty(UserService.prototype, "setRequest", {
        set: function (request) {
            this.request = request;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "getRequest", {
        get: function () {
            return this.request;
        },
        enumerable: false,
        configurable: true
    });
    UserService.prototype.getRepo = function () {
        return this.userRepo;
    };
    UserService.prototype.register = function (userInputDTO, origin) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, newUser, errors, foundUser, isUserExists, userRecord, jwtToken, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('Registering user...');
                        return [4 /*yield*/, this.hash(userInputDTO.password)];
                    case 1:
                        hashedPassword = _a.sent();
                        newUser = new User_1.User({
                            firstName: userInputDTO.firstName,
                            lastName: userInputDTO.lastName,
                            email: userInputDTO.email,
                            password: hashedPassword,
                            role: userInputDTO.role,
                            active: true
                            // refresh_token: userInputDTO.refresh_token,
                        });
                        return [4 /*yield*/, (0, class_validator_1.validate)(newUser, {
                                validationError: { target: false }
                            })];
                    case 2:
                        errors = _a.sent();
                        if (errors.length > 0)
                            throw errors;
                        return [4 /*yield*/, this.userRepo.findOne({ email: newUser.email })];
                    case 3:
                        foundUser = _a.sent();
                        isUserExists = false;
                        if (foundUser) {
                            // isUserExists=!isUserExists;
                            // console.log('checking isUserExists: ',isUserExists)
                            throw new ErrorHandler_1.ErrorHandler(400, 'The email address already exists');
                        }
                        ///assigning randomtoken temp/////
                        newUser.verificationToken = this.randomTokenString();
                        return [4 /*yield*/, this.userRepo.save(newUser)];
                    case 4:
                        userRecord = _a.sent();
                        if (!userRecord)
                            throw new ErrorHandler_1.ErrorHandler(500, 'User cannot be created');
                        // send email
                        return [4 /*yield*/, this.sendVerificationEmail(userRecord, origin)];
                    case 5:
                        // send email
                        _a.sent();
                        jwtToken = this.generateJwtToken(userRecord);
                        user = userRecord;
                        Reflect.deleteProperty(user, 'password');
                        return [2 /*return*/, { user: user, jwtToken: jwtToken, isUserExists: isUserExists }];
                }
            });
        });
    };
    //////verify email with token sent to email////
    UserService.prototype.verifyEmail = function (_a) {
        var token = _a.token;
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userRepo.findOne({ verificationToken: token })];
                    case 1:
                        user = _b.sent();
                        if (!user)
                            throw 'Verification failed';
                        user.verified = new Date().toISOString();
                        user.verificationToken = undefined;
                        console.log('after deleting user will be: ', user);
                        return [4 /*yield*/, this.userRepo.update(user.id, user)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ///////////forgot password function ////////
    UserService.prototype.forgotPassword = function (_a, origin) {
        var email = _a.email;
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userRepo.findOne({ email: email })];
                    case 1:
                        user = _b.sent();
                        // always return ok response to prevent email enumeration
                        if (!user)
                            return [2 /*return*/];
                        // create reset token that expires after 24 hours
                        user.resetToken = this.randomTokenString();
                        user.expires = Date.now() + 24 * 60 * 60 * 1000;
                        return [4 /*yield*/, this.userRepo.update(user.id, user)];
                    case 2:
                        _b.sent();
                        // send email
                        return [4 /*yield*/, this.sendPasswordResetEmail(user, origin)];
                    case 3:
                        // send email
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //////send password reset email ////////
    UserService.prototype.sendPasswordResetEmail = function (user, origin) {
        return __awaiter(this, void 0, void 0, function () {
            var message, resetUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (origin) {
                            resetUrl = origin + "/account/reset-password?token=" + user.resetToken;
                            message = "<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>\n                 <p><a href=\"" + resetUrl + "\">" + resetUrl + "</a></p>";
                        }
                        else {
                            message = "<p>Please use the below token to reset your password with the <code>/account/reset-password</code> api route:</p>\n                 <p><code>" + user.resetToken + "</code></p>";
                        }
                        return [4 /*yield*/, send_email_1["default"].sendEmail({
                                to: user.email,
                                subject: 'Sign-up Verification API - Reset Password',
                                html: "<h4>Reset Password Email</h4>\n             " + message
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //////Reset Password///////
    UserService.prototype.resetPassword = function (_a) {
        var token = _a.token, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var currentUtcTimeAsSqliteString, user, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        currentUtcTimeAsSqliteString = Date.now();
                        return [4 /*yield*/, this.userRepo.findOne({
                                where: {
                                    resetToken: token,
                                    expires: { $gt: currentUtcTimeAsSqliteString }
                                }
                            })];
                    case 1:
                        user = _c.sent();
                        if (!user)
                            throw 'Invalid token';
                        // update password and remove reset token
                        _b = user;
                        return [4 /*yield*/, this.hash(password)];
                    case 2:
                        // update password and remove reset token
                        _b.password = _c.sent();
                        user.passwordReset = new Date().toISOString();
                        user.resetToken = undefined;
                        console.log('Inside of resetPassword: ', user);
                        return [4 /*yield*/, this.userRepo.update(user.id, user)];
                    case 3:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //////CHECKING WHETHER USER IS VERIFIED WITH TOKEN OR NOT/////
    UserService.prototype.isVerified = function (userRecord) {
        return !!(userRecord.verified != null || userRecord.passwordReset != null);
    };
    UserService.prototype.login = function (email, password, ipAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var userRecord, validPassword, jwtToken, refreshToken, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('Authenticating user...');
                        return [4 /*yield*/, this.userRepo.findOne({ email: email })];
                    case 1:
                        userRecord = _a.sent();
                        if (!userRecord)
                            throw new ErrorHandler_1.ErrorHandler(404, "Account  doesn't Exists please create new one");
                        if (!this.isVerified(userRecord))
                            throw new ErrorHandler_1.ErrorHandler(403, 'Please Verify your email id Before you login ');
                        return [4 /*yield*/, bcryptjs_1["default"].compare(password, userRecord.password)];
                    case 2:
                        validPassword = _a.sent();
                        if (!validPassword) return [3 /*break*/, 4];
                        jwtToken = this.generateJwtToken(userRecord);
                        return [4 /*yield*/, this.generateRefreshToken(userRecord, ipAddress)];
                    case 3:
                        refreshToken = _a.sent();
                        this.refreshTokenRepo.save(refreshToken);
                        user = userRecord;
                        Reflect.deleteProperty(user, 'password');
                        return [2 /*return*/, { user: user, jwtToken: jwtToken, refreshToken: refreshToken.token }];
                    case 4: throw new ErrorHandler_1.ErrorHandler(405, 'Invalid email or password');
                }
            });
        });
    };
    /////GetRefreshToken////////
    UserService.prototype.isActive = function (refreshToken) {
        return !refreshToken.revoked && !refreshToken.isExpired;
    };
    UserService.prototype.getRefreshToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.refreshTokenRepo.findOne({ token: token }, { relations: ['user'] })];
                    case 1:
                        refreshToken = _a.sent();
                        if (!refreshToken || !this.isActive(refreshToken))
                            throw 'Invalid token';
                        return [2 /*return*/, refreshToken];
                }
            });
        });
    };
    UserService.prototype.hash = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcryptjs_1["default"].hash(password, 12)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.generateJwtToken = function (userRecord) {
        // create a jwt token containing the account id that expires in 15 minutes
        return jsonwebtoken_1["default"].sign({ id: userRecord.id, email: userRecord.email }, config_1["default"].jwtSecret, { expiresIn: "15m" });
    };
    UserService.prototype.generateRefreshToken = function (user, ipAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken;
            return __generator(this, function (_a) {
                refreshToken = {
                    // user: user.id,
                    token: this.randomTokenString(),
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    createdByIp: ipAddress
                };
                return [2 /*return*/, refreshToken];
            });
        });
    };
    UserService.prototype.randomTokenString = function () {
        return crypto_1["default"].randomBytes(40).toString('hex');
    };
    UserService.prototype.find = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users, _i, users_1, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repo.find()];
                    case 1:
                        users = _a.sent();
                        for (_i = 0, users_1 = users; _i < users_1.length; _i++) {
                            user = users_1[_i];
                            Reflect.deleteProperty(user, 'password');
                        }
                        // console.log('Request value getting: ',this.request.currentUser);
                        return [2 /*return*/, users];
                }
            });
        });
    };
    /////Revoke Token///////
    UserService.prototype.revokeToken = function (_a) {
        var token = _a.token, ipAddress = _a.ipAddress;
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getRefreshToken(token)];
                    case 1:
                        refreshToken = _b.sent();
                        // revoke token and save
                        refreshToken.revoked = new Date(Date.now());
                        refreshToken.revokedByIp = ipAddress;
                        return [4 /*yield*/, this.refreshTokenRepo.update(refreshToken.id, refreshToken)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ////////////refreshToken///////////
    UserService.prototype.refreshToken = function (_a) {
        var token = _a.token, ipAddress = _a.ipAddress;
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getRefreshToken(token)];
                    case 1:
                        refreshToken = _b.sent();
                        // const { user } = refreshToken;
                        console.log('RefreshToken in refreshToken Method: ', refreshToken);
                        return [2 /*return*/];
                }
            });
        });
    };
    ////////SendVerificationEmail////////
    UserService.prototype.sendVerificationEmail = function (user, origin) {
        return __awaiter(this, void 0, void 0, function () {
            var message, verifyUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (origin) {
                            verifyUrl = origin + "/verify-email?token=" + user.verificationToken;
                            message = "<p>Please click the below link to verify your email address:</p>\n                    \n                   <p><a href=\"" + verifyUrl + "\">" + verifyUrl + "</a></p>\n                   <p>Or copy and paste this token " + user.verificationToken + "\n                   in the form of " + origin + "/verify-email link\n                   </p>\n                   ";
                        }
                        else {
                            message = "\n      <p>Please use the below token to verify your email address with the <code>/verify-email</code> api route:</p>\n                   <p><code>" + user.verificationToken + "</code></p>";
                        }
                        return [4 /*yield*/, send_email_1["default"].sendEmail({
                                to: user.email,
                                subject: 'Sign-up Verification API - Verify Email',
                                html: "<h4>Verify Email</h4>\n               <p>Thanks for registering!</p>\n               " + message
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repo.findOne(id)];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            Reflect.deleteProperty(user, 'password');
                        }
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService = __decorate([
        (0, typedi_1.Service)({ transient: true }),
        __param(0, (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User)),
        __param(1, (0, typeorm_typedi_extensions_1.InjectRepository)(RefreshToken_1.RefreshToken)),
        __param(2, (0, typedi_1.Inject)('logger'))
    ], UserService);
    return UserService;
}(CRUD_1["default"]));
exports["default"] = UserService;
