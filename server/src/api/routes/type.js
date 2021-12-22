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
var middlewares_1 = require("../middlewares");
var TypeService_1 = require("../services/TypeService");
var route = (0, express_1.Router)();
///authorization is mandatory to get list of types///
route.get('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, typeServiceInstance, types, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling GET /type endpoint');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                typeServiceInstance = typedi_1.Container.get(TypeService_1["default"]);
                typeServiceInstance.request = req;
                return [4 /*yield*/, typeServiceInstance.find()];
            case 2:
                types = _a.sent();
                return [2 /*return*/, res.json({ types: types, message: 'successfully fetched all types' }).status(200)];
            case 3:
                e_1 = _a.sent();
                return [2 /*return*/, next(e_1)];
            case 4: return [2 /*return*/];
        }
    });
}); });
/////adding new type//////
route.post('/createType', middlewares_1.isAuth, middlewares_1.attachUser, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, typeServiceInstance, types, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling GET /type endpoint');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                typeServiceInstance = typedi_1.Container.get(TypeService_1["default"]);
                typeServiceInstance.request = req;
                return [4 /*yield*/, typeServiceInstance.createType(req.body)];
            case 2:
                types = _a.sent();
                return [2 /*return*/, res.json(types).status(200)];
            case 3:
                e_2 = _a.sent();
                res.json({ message: e_2 });
                return [2 /*return*/, next(e_2)];
            case 4: return [2 /*return*/];
        }
    });
}); });
/////////Find type info by giving id/////
route.get('/getType/:id', middlewares_1.isAuth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, typeServiceInstance, type, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling GET /type/find/:id endpoint');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                typeServiceInstance = typedi_1.Container.get(TypeService_1["default"]);
                return [4 /*yield*/, typeServiceInstance.findOne(req.params.id)];
            case 2:
                type = _a.sent();
                if (type) {
                    return [2 /*return*/, res
                            .json({
                            message: 'Type data fetched Successfully',
                            Type: type
                        })
                            .status(200)];
                }
                else {
                    return [2 /*return*/, res.json({ message: 'Record not found' }).status(404)];
                }
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                return [2 /*return*/, res.status(404).send({ message: e_3 })];
            case 4: return [2 /*return*/];
        }
    });
}); });
///Deleting type with admin permission just changing active=false////
// route.patch(
//   '/delete/:id',
//   isAuth,
//   attachUser,
//   async (req: Request, res: Response) => {
//     const logger: Logger = Container.get('logger');
//     logger.debug('Calling GET /type/delete/:id endpoint');
//     try {
//       const id = req.params.id;
//       const typeServiceInstance = Container.get(TypeService);
//       const getTypeRecordWithId = await typeServiceInstance.findOne(id);
//       typeServiceInstance.request = req;
//       const setModifiedBy = typeServiceInstance.request.currentUser.id;
//       const setDateForRecordModification=new Date().toISOString()
//       let typeRecordFromBody = {
//         ...getTypeRecordWithId,
//         modifiedBy: setModifiedBy,
//         modifiedDate:setDateForRecordModification
//       };
//       const type = await typeServiceInstance.updateActive(
//         id,
//         typeRecordFromBody
//       );
//       if (type) {
//         return res
//           .json({
//             message: 'Booking deleted Successfully',
//             // Booking: type.active,
//             // Fancy: getTypeRecordWithId.active,
//           })
//           .status(200);
//       } else {
//         return res
//           .json({
//             message: 'Booking Record Not Found',
//           })
//           .status(404);
//       }
//     } catch (e) {
//       return res.status(404).send({ message: e });
//     }
//   }
// );
///// update  Type with an admin access only/////////
route.patch('/update/:id', middlewares_1.isAuth, middlewares_1.attachUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, id, typeServiceInstance, setModifiedBy, typeRecordFromBody, types, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling patch /type endpoint');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                id = req.params.id;
                typeServiceInstance = typedi_1.Container.get(TypeService_1["default"]);
                typeServiceInstance.request = req;
                setModifiedBy = typeServiceInstance.request.currentUser.id;
                typeRecordFromBody = __assign(__assign({}, req.body), { modifiedBy: setModifiedBy });
                return [4 /*yield*/, typeServiceInstance.update(id, req.body)];
            case 2:
                types = _a.sent();
                if (types) {
                    return [2 /*return*/, res
                            .json({
                            message: 'Type(service) Record Updated Successfully',
                            Type: types
                        })
                            .status(200)];
                }
                else {
                    return [2 /*return*/, res
                            .json({
                            message: 'Type Record Updated Failed',
                            Type: types
                        })
                            .status(400)];
                }
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                res.status(404).json({ message: e_4 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
///Deleting type with admin permission////
route["delete"]('/delete/:id', middlewares_1.isAuth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, typeServiceInstance, type, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling GET /type/delete/:id endpoint');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                typeServiceInstance = typedi_1.Container.get(TypeService_1["default"]);
                return [4 /*yield*/, typeServiceInstance["delete"](req.params.id)];
            case 2:
                type = _a.sent();
                return [2 /*return*/, res
                        .json({ message: 'Type deleted Successfully', Type: type })
                        .status(200)];
            case 3:
                e_5 = _a.sent();
                return [2 /*return*/, res.status(404).send({ message: e_5 })];
            case 4: return [2 /*return*/];
        }
    });
}); });
////getting type id with providing name in params///
route.get('/getIdWithName', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, typeServiceInstance, typename, findIdWithName, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling GET /type/getIdWithName/ endpoint');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                typeServiceInstance = typedi_1.Container.get(TypeService_1["default"]);
                typename = req.query.typeName;
                return [4 /*yield*/, typeServiceInstance.findTypeIdWithName(typename)];
            case 2:
                findIdWithName = _a.sent();
                return [2 /*return*/, res
                        .json({
                        message: 'Type Id by Given Name ', TypeId: findIdWithName.id
                        //   TypeId: findIdWithName.id,
                    })
                        .status(200)];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(404).send({ message: error_1 })];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports["default"] = route;
