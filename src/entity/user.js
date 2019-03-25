"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var book_1 = require("./book");
var User = (function () {
    function User() {
    }
    return User;
}());
__decorate([
    typeorm_1.PrimaryGeneratedColumn()
], User.prototype, "id");
__decorate([
    typeorm_1.Column({
        length: 80
    }),
    class_validator_1.Length(10, 80)
], User.prototype, "name");
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    class_validator_1.Length(10, 100),
    class_validator_1.IsEmail()
], User.prototype, "email");
__decorate([
    typeorm_1.OneToMany(function (type) { return book_1.Book; }, function (book) { return book.user; }),
    typeorm_1.JoinTable()
], User.prototype, "books");
__decorate([
    typeorm_1.CreateDateColumn()
], User.prototype, "created_at");
__decorate([
    typeorm_1.UpdateDateColumn()
], User.prototype, "updated_at");
User = __decorate([
    typeorm_1.Entity('users')
], User);
exports.User = User;
