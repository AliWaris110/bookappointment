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
var BookingService_1 = require("../services/BookingService");
var route = (0, express_1.Router)();
///authorization is mandatory to get list of bookings///
route.get('/', 
// isAuth,
// attachUser,
function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, bookingServiceInstance, availableBookings, bookings, inActiveBookings, completedBookings, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling GET /booking endpoint');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                bookingServiceInstance = typedi_1.Container.get(BookingService_1["default"]);
                bookingServiceInstance.request = req;
                return [4 /*yield*/, bookingServiceInstance.find()];
            case 2:
                availableBookings = (_a.sent()).filter(function (isActive) {
                    return isActive.active === true &&
                        (isActive.status === 'available' || isActive.status === 'pending');
                });
                return [4 /*yield*/, bookingServiceInstance.find()];
            case 3:
                bookings = (_a.sent()).filter(function (isActive) { return isActive.active === true && isActive.status === 'pending'; });
                return [4 /*yield*/, bookingServiceInstance.find()];
            case 4:
                inActiveBookings = (_a.sent()).filter(function (isActive) { return isActive.active === false; });
                return [4 /*yield*/, bookingServiceInstance.find()];
            case 5:
                completedBookings = (_a.sent()).filter(function (item) { return item.status === 'completed'; });
                return [2 /*return*/, res
                        .json({
                        availableBookings: availableBookings,
                        bookings: bookings,
                        inActiveBookings: inActiveBookings,
                        completedBookings: completedBookings
                    })
                        .status(200)];
            case 6:
                e_1 = _a.sent();
                return [2 /*return*/, next(e_1)];
            case 7: return [2 /*return*/];
        }
    });
}); });
/////adding new booking//////
route.post('/createBooking', middlewares_1.isAuth, middlewares_1.attachUser, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, bookingServiceInstance, setCreatedDate, bookingRecordFromBody, bookings, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling GET /booking endpoint');
                console.log('1');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                bookingServiceInstance = typedi_1.Container.get(BookingService_1["default"]);
                bookingServiceInstance.request = req;
                setCreatedDate = new Date().toISOString();
                bookingRecordFromBody = __assign(__assign({}, req.body), { modifiedBy: null, status: 'available', createdDate: setCreatedDate });
                return [4 /*yield*/, bookingServiceInstance.createBooking(bookingRecordFromBody)];
            case 2:
                bookings = _a.sent();
                return [2 /*return*/, res.json(bookings).status(200)];
            case 3:
                e_2 = _a.sent();
                res.json({ message: e_2 });
                return [2 /*return*/, next(e_2)];
            case 4: return [2 /*return*/];
        }
    });
}); });
/////////Find booking info by giving id/////
route.get('/:id', middlewares_1.isAuth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, bookingServiceInstance, booking, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling GET /booking/find/:id endpoint');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                bookingServiceInstance = typedi_1.Container.get(BookingService_1["default"]);
                return [4 /*yield*/, bookingServiceInstance.findOne(req.params.id)];
            case 2:
                booking = _a.sent();
                if (booking.active) {
                    return [2 /*return*/, res
                            .json({
                            message: 'Booking data fetched Successfully',
                            Booking: booking
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
///Deleting booking with admin permission just changing active=false////
route.patch('/delete/:id', middlewares_1.isAuth, middlewares_1.attachUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, id, bookingServiceInstance, getBookingRecordWithId, setModifiedBy, setDateForRecordModification, bookingRecordFromBody, booking, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling GET /booking/delete/:id endpoint');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                id = req.params.id;
                bookingServiceInstance = typedi_1.Container.get(BookingService_1["default"]);
                return [4 /*yield*/, bookingServiceInstance.findOne(id)];
            case 2:
                getBookingRecordWithId = _a.sent();
                bookingServiceInstance.request = req;
                setModifiedBy = bookingServiceInstance.request.currentUser.id;
                setDateForRecordModification = new Date().toISOString();
                bookingRecordFromBody = __assign(__assign({}, getBookingRecordWithId), { modifiedBy: setModifiedBy, modifiedDate: setDateForRecordModification });
                return [4 /*yield*/, bookingServiceInstance.updateActive(id, bookingRecordFromBody)];
            case 3:
                booking = _a.sent();
                if (booking) {
                    return [2 /*return*/, res
                            .json({
                            message: 'Booking deleted Successfully',
                            Booking: booking.active,
                            Fancy: getBookingRecordWithId.active
                        })
                            .status(200)];
                }
                else {
                    return [2 /*return*/, res
                            .json({
                            message: 'Booking Record Not Found'
                        })
                            .status(404)];
                }
                return [3 /*break*/, 5];
            case 4:
                e_4 = _a.sent();
                return [2 /*return*/, res.status(404).send({ message: e_4 })];
            case 5: return [2 /*return*/];
        }
    });
}); });
///// update with an admin access only/////////
route.patch('/update/:id', middlewares_1.isAuth, middlewares_1.attachUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, id, bookingServiceInstance, setModifiedBy, bodyData, bookingRecordFromBody, bookings, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                logger.debug('Calling patch /booking endpoint');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log('1');
                id = req.params.id;
                bookingServiceInstance = typedi_1.Container.get(BookingService_1["default"]);
                console.log('2');
                bookingServiceInstance.request = req;
                setModifiedBy = bookingServiceInstance.request.currentUser.id;
                bodyData = __assign({}, req.body);
                bookingRecordFromBody = __assign(__assign({}, bodyData['newData']), { modifiedBy: setModifiedBy, userId: setModifiedBy });
                console.log('Booking record from body: ', bookingRecordFromBody);
                delete bookingRecordFromBody['id'];
                return [4 /*yield*/, bookingServiceInstance.updateBooking(id, bookingRecordFromBody)];
            case 2:
                bookings = _a.sent();
                console.log('4');
                if (bookings) {
                    console.log('5');
                    return [2 /*return*/, res
                            .json({
                            message: 'Booking Record Updated Successfully',
                            Booking: bookings
                        })
                            .status(200)];
                }
                else {
                    console.log('6');
                    return [2 /*return*/, res
                            .json({
                            message: 'Booking Record Updated Failed',
                            Booking: bookings
                        })
                            .status(400)];
                }
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                console.log('7 ', e_5);
                res.status(404).json({ message: e_5 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports["default"] = route;
