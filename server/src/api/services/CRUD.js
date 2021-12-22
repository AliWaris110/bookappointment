"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var typedi_1 = require("typedi");
var class_validator_1 = require("class-validator");
var ErrorHandler_1 = require("../../helpers/ErrorHandler");
var lodash_1 = require("lodash");
var CRUD = /** @class */ (function () {
    function CRUD(repo, logger) {
        this.repo = repo;
        this.logger = logger;
    }
    CRUD.prototype.getRepo = function () {
        return this.repo;
    };
    CRUD.prototype.fillObjectIdField = function (entity, fieldName, fieldEntityService) {
        return __awaiter(this, void 0, void 0, function () {
            var entityName, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        entityName = entity.constructor.name;
                        if (!entity)
                            throw new ErrorHandler_1.ErrorHandler(500, entityName + " not found");
                        if (!(fieldName in entity))
                            throw new ErrorHandler_1.ErrorHandler(500, fieldName + " does not exist in " + entityName);
                        _a = entity;
                        _b = fieldName;
                        return [4 /*yield*/, fieldEntityService.findOne(entity[fieldName])];
                    case 1:
                        _a[_b] = _c.sent();
                        if (!entity[fieldName]) {
                            throw new ErrorHandler_1.ErrorHandler(500, "Invalid " + fieldName);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CRUD.prototype.create = function (entity, identifier) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, foundEntity, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, (0, class_validator_1.validate)(entity, {
                            validationError: { target: false }
                        })];
                    case 1:
                        errors = _c.sent();
                        _a = identifier;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.repo.findOne((_b = {},
                                _b[identifier] = entity[identifier],
                                _b))];
                    case 2:
                        _a = (_c.sent());
                        _c.label = 3;
                    case 3:
                        foundEntity = _a;
                        if (foundEntity)
                            throw new ErrorHandler_1.ErrorHandler(400, "The " + entity.constructor.name + " already exists");
                        if (errors.length > 0)
                            throw errors;
                        return [4 /*yield*/, this.repo.save(entity)];
                    case 4: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    CRUD.prototype.find = function () {
        return __awaiter(this, void 0, void 0, function () {
            var entities;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repo.find()];
                    case 1:
                        entities = _a.sent();
                        if (entities) {
                            return [2 /*return*/, entities];
                        }
                        throw new ErrorHandler_1.ErrorHandler(404, 'Not found');
                }
            });
        });
    };
    CRUD.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repo.findOne(id)];
                    case 1:
                        entity = _a.sent();
                        if (entity) {
                            return [2 /*return*/, entity];
                        }
                        throw new ErrorHandler_1.ErrorHandler(404, 'Not found');
                }
            });
        });
    };
    CRUD.prototype.update = function (id, updatedFields) {
        return __awaiter(this, void 0, void 0, function () {
            var cloneUpdatedFields, entity, errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cloneUpdatedFields = __assign({}, updatedFields);
                        cloneUpdatedFields.active = false;
                        console.log('finding cloneUpdatedRecord: ', cloneUpdatedFields);
                        return [4 /*yield*/, this.repo.findOne(id)];
                    case 1:
                        entity = _a.sent();
                        if (!entity) {
                            throw new ErrorHandler_1.ErrorHandler(404, 'Not found');
                        }
                        Object.keys(cloneUpdatedFields).forEach(function (key) {
                            if (!!cloneUpdatedFields[key] && lodash_1["default"].has(entity, key)) {
                                entity[key] = cloneUpdatedFields[key];
                            }
                        });
                        return [4 /*yield*/, (0, class_validator_1.validate)(entity, {
                                validationError: { target: false }
                            })];
                    case 2:
                        errors = _a.sent();
                        if (errors.length > 0)
                            throw errors;
                        if (lodash_1["default"].has(entity, 'updatedAt')) {
                            entity['updatedAt'] = new Date().toISOString();
                        }
                        return [4 /*yield*/, this.repo.save(entity)];
                    case 3: 
                    // console.log("in update method before saving updated booking :",updatedFields)
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /////////Update active to false inorder to make it Invisible on screen (delete)
    CRUD.prototype.updateActive = function (id, updatedFields) {
        return __awaiter(this, void 0, void 0, function () {
            var cloneUpdatedFields, entity, errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cloneUpdatedFields = __assign({}, updatedFields);
                        cloneUpdatedFields.active = false;
                        return [4 /*yield*/, this.repo.findOne(id)];
                    case 1:
                        entity = _a.sent();
                        if (!entity) {
                            throw new ErrorHandler_1.ErrorHandler(404, 'Not found');
                        }
                        Object.keys(cloneUpdatedFields).forEach(function (key) {
                            entity[key] = cloneUpdatedFields[key];
                        });
                        return [4 /*yield*/, (0, class_validator_1.validate)(entity, {
                                validationError: { target: false }
                            })];
                    case 2:
                        errors = _a.sent();
                        if (errors.length > 0)
                            throw errors;
                        if (lodash_1["default"].has(entity, 'updatedAt')) {
                            entity['updatedAt'] = new Date().toISOString();
                        }
                        return [4 /*yield*/, this.repo.save(entity)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ///////Update Booking with ID////////// setting modifiedBy=currentUser.id
    CRUD.prototype.updateBooking = function (id, updatedFields) {
        return __awaiter(this, void 0, void 0, function () {
            var entity, errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repo.findOne(id)];
                    case 1:
                        entity = _a.sent();
                        // console.log('Finding entity: ', entity['active']);
                        if (!(entity && entity['active'])) {
                            throw new ErrorHandler_1.ErrorHandler(404, 'Not found');
                        }
                        Object.keys(updatedFields).forEach(function (key) {
                            entity[key] = updatedFields[key];
                        });
                        return [4 /*yield*/, (0, class_validator_1.validate)(entity, {
                                validationError: { target: false }
                            })];
                    case 2:
                        errors = _a.sent();
                        if (errors.length > 0)
                            throw errors;
                        if (lodash_1["default"].has(entity, 'updatedAt')) {
                            entity['updatedAt'] = new Date().toISOString();
                        }
                        return [4 /*yield*/, this.repo.save(entity)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CRUD.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repo["delete"](id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CRUD.prototype.findTypeIdWithName = function (typeName) {
        return __awaiter(this, void 0, void 0, function () {
            var typename, entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        typename = { typeName: typeName };
                        return [4 /*yield*/, this.repo.findOne(typename)];
                    case 1:
                        entity = _a.sent();
                        if (entity) {
                            return [2 /*return*/, entity];
                        }
                        throw new ErrorHandler_1.ErrorHandler(404, 'Not found');
                }
            });
        });
    };
    CRUD = __decorate([
        (0, typedi_1.Service)()
    ], CRUD);
    return CRUD;
}());
exports["default"] = CRUD;
