"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RefreshToken = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var User_1 = require("./User");
///UserToken
var RefreshToken = /** @class */ (function () {
    function RefreshToken(data) {
        if (data) {
            this.user = data.user;
            this.token = data.token;
            this.expires = data.expires;
            this.created = data.created;
            this.createdByIp = data.createdByIp;
            this.revoked = data.revoked;
            this.revokedByIp = data.revokedByIp;
            this.replacedByToken = data.replacedByToken;
        }
    }
    __decorate([
        (0, typeorm_1.ObjectIdColumn)()
    ], RefreshToken.prototype, "id");
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return User_1.User; }, function (user) { return user.id; }, { cascade: true, eager: true }),
        (0, typeorm_1.JoinColumn)()
    ], RefreshToken.prototype, "user");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsString)()
    ], RefreshToken.prototype, "token");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], RefreshToken.prototype, "expires");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], RefreshToken.prototype, "created");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsString)()
    ], RefreshToken.prototype, "createdByIp");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], RefreshToken.prototype, "revoked");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsString)()
    ], RefreshToken.prototype, "revokedByIp");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsString)()
    ], RefreshToken.prototype, "replacedByToken");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsBoolean)()
    ], RefreshToken.prototype, "isActive");
    RefreshToken = __decorate([
        (0, typeorm_1.Entity)()
    ], RefreshToken);
    return RefreshToken;
}());
exports.RefreshToken = RefreshToken;
