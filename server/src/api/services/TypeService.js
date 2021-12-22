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
var config_1 = require("../../config");
var typedi_1 = require("typedi");
var Type_1 = require("../entities/Type");
var typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
var class_validator_1 = require("class-validator");
var CRUD_1 = require("./CRUD");
var ErrorHandler_1 = require("../../helpers/ErrorHandler");
var TypeService = /** @class */ (function (_super) {
    __extends(TypeService, _super);
    function TypeService(typeRepo, logger) {
        var _this = _super.call(this, typeRepo, logger) || this;
        _this.typeRepo = typeRepo;
        _this.logger = logger;
        return _this;
    }
    Object.defineProperty(TypeService.prototype, "setRequest", {
        set: function (request) {
            this.request = request;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TypeService.prototype, "getRequest", {
        get: function () {
            return this.request;
        },
        enumerable: false,
        configurable: true
    });
    TypeService.prototype.getRepo = function () {
        return this.typeRepo;
    };
    TypeService.prototype.createType = function (typeInputDTO) {
        return __awaiter(this, void 0, void 0, function () {
            var id, newType, errors, foundtype, typeRecord, type;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('Type(service) setting ...');
                        id = this.request.currentUser.id;
                        newType = new Type_1.Type({
                            typeName: typeInputDTO.typeName
                        });
                        return [4 /*yield*/, (0, class_validator_1.validate)(newType, {
                                validationError: { target: false }
                            })];
                    case 1:
                        errors = _a.sent();
                        if (errors.length > 0)
                            throw errors;
                        return [4 /*yield*/, this.typeRepo.findOne({
                                typeName: newType.typeName
                            })];
                    case 2:
                        foundtype = _a.sent();
                        if (foundtype)
                            throw new ErrorHandler_1.ErrorHandler(400, 'The type already exists');
                        return [4 /*yield*/, this.typeRepo.save(newType)];
                    case 3:
                        typeRecord = _a.sent();
                        if (!typeRecord)
                            throw new ErrorHandler_1.ErrorHandler(500, 'type(Service) cannot be created');
                        type = typeRecord;
                        return [2 /*return*/, { type: type }];
                }
            });
        });
    };
    TypeService.prototype.generateToken = function (typeRecord) {
        var today = new Date();
        var exp = new Date(today);
        exp.setDate(today.getDate() + 7);
        this.logger.debug("Signing JWT for bookingId: " + typeRecord.id);
        return jsonwebtoken_1["default"].sign({
            id: typeRecord.id,
            exp: exp.getTime() / 1000
        }, config_1["default"].jwtSecret);
    };
    TypeService.prototype.find = function () {
        return __awaiter(this, void 0, void 0, function () {
            var type, _i, type_1, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repo.find()];
                    case 1:
                        type = _a.sent();
                        for (_i = 0, type_1 = type; _i < type_1.length; _i++) {
                            b = type_1[_i];
                            // Reflect.deleteProperty(user, 'password');
                        }
                        return [2 /*return*/, type];
                }
            });
        });
    };
    TypeService = __decorate([
        (0, typedi_1.Service)({ transient: true }),
        __param(0, (0, typeorm_typedi_extensions_1.InjectRepository)(Type_1.Type)),
        __param(1, (0, typedi_1.Inject)('logger'))
    ], TypeService);
    return TypeService;
}(CRUD_1["default"]));
exports["default"] = TypeService;
