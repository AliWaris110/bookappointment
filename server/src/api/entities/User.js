"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var RefreshToken_1 = require("./RefreshToken");
var User = /** @class */ (function () {
    function User(data) {
        this.role = 'user';
        if (data) {
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.email = data.email;
            this.password = data.password;
            this.role = data.role || this.role;
            this.verificationToken = data.verificationToken || '';
            this.verified = data.verified;
            this.resetToken = data.resetToken;
            this.passwordReset = data.passwordReset;
            this.created = data.created;
            this.active = data.active;
        }
        console.log('Contructor Role:', this);
    }
    User.prototype.hasAccessTo = function (role) {
        var roles = ['user', 'mod', 'admin'];
        console.log('1-Checking role: ', this.role);
        console.log('2-Checking role: ', role);
        return roles.indexOf(this.role) >= roles.indexOf(role);
    };
    __decorate([
        (0, typeorm_1.ObjectIdColumn)()
    ], User.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsString)()
    ], User.prototype, "firstName");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsString)()
    ], User.prototype, "lastName");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, typeorm_1.Index)({ unique: true }),
        (0, class_validator_1.IsEmail)({}, {
            message: 'Invalid email address'
        })
    ], User.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsString)()
    ], User.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "role");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsString)()
    ], User.prototype, "verificationToken");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "verified");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "resetToken");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "expires");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "passwordReset");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], User.prototype, "created");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsBoolean)()
    ], User.prototype, "active");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return RefreshToken_1.RefreshToken; }, function (refresh_token) { return refresh_token.user; })
    ], User.prototype, "refresh_token");
    User = __decorate([
        (0, typeorm_1.Entity)()
    ], User);
    return User;
}());
exports.User = User;
