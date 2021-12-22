"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Booking = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var Booking = /** @class */ (function () {
    function Booking(data) {
        if (data) {
            (this.title = data.title),
                (this.venue = data.venue),
                (this.location = data.location),
                (this.date = data.date),
                (this.time = data.time),
                (this.status = data.status),
                (this.typeId = data.typeId),
                (this.userId = data.userId),
                (this.createdBy = data.createdBy),
                (this.createdDate = data.createdDate),
                (this.modifiedBy = data.modifiedBy),
                (this.modifiedDate = data.modifiedDate),
                (this.active = data.active);
        }
    }
    __decorate([
        (0, typeorm_1.ObjectIdColumn)()
    ], Booking.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Booking.prototype, "title");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsString)()
    ], Booking.prototype, "venue");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsString)()
    ], Booking.prototype, "location");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Booking.prototype, "date");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsString)()
    ], Booking.prototype, "time");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsString)()
    ], Booking.prototype, "status");
    __decorate([
        (0, typeorm_1.Column)()
    ], Booking.prototype, "typeId");
    __decorate([
        (0, typeorm_1.Column)()
    ], Booking.prototype, "userId");
    __decorate([
        (0, typeorm_1.Column)()
    ], Booking.prototype, "createdBy");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Booking.prototype, "createdDate");
    __decorate([
        (0, typeorm_1.Column)()
    ], Booking.prototype, "modifiedBy");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Booking.prototype, "modifiedDate");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsBoolean)()
    ], Booking.prototype, "active");
    Booking = __decorate([
        (0, typeorm_1.Entity)()
    ], Booking);
    return Booking;
}());
exports.Booking = Booking;
