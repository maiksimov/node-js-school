"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var book_1 = require("../entity/book");
var user_1 = require("../entity/user");
var BookController = (function () {
    function BookController() {
    }
    BookController.getUserBooks = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var manager, user, books;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        manager = typeorm_1.getManager();
                        return [4 /*yield*/, manager.findOne(user_1.User, ctx.params.id)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, user.books];
                    case 2:
                        books = _a.sent();
                        // TODO Refactor below to some function
                        ctx.status = 200;
                        ctx.body = books;
                        return [2 /*return*/];
                }
            });
        });
    };
    BookController.getAllBooks = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var manager, books;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        manager = typeorm_1.getManager();
                        return [4 /*yield*/, manager.find(book_1.Book, { relations: ['user'] })];
                    case 1:
                        books = _a.sent();
                        ctx.status = 200;
                        ctx.body = books;
                        return [2 /*return*/];
                }
            });
        });
    };
    BookController.getBook = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var manager, book;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        manager = typeorm_1.getManager();
                        return [4 /*yield*/, manager.findOne(book_1.Book, { where: { id: ctx.params.id }, relations: ['user'] })];
                    case 1:
                        book = _a.sent();
                        if (!book) {
                            ctx.status = 400;
                            ctx.body = 'The book you are trying to find doesn\'t exist in the db';
                            return [2 /*return*/];
                        }
                        ctx.status = 200;
                        ctx.body = book;
                        return [2 /*return*/];
                }
            });
        });
    };
    BookController.createBook = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var manager, user, newBook, errors, book;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        manager = typeorm_1.getManager();
                        return [4 /*yield*/, manager.findOne(user_1.User, ctx.request.body.user_id)];
                    case 1:
                        user = _a.sent();
                        newBook = new book_1.Book();
                        newBook.title = ctx.request.body.title;
                        newBook.description = ctx.request.body.description;
                        newBook.user = user;
                        return [4 /*yield*/, class_validator_1.validate(newBook)];
                    case 2:
                        errors = _a.sent();
                        if (errors.length > 0) {
                            ctx.status = 400;
                            ctx.body = errors;
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, manager.findOne(book_1.Book, { where: { title: newBook.title, user: newBook.user } })];
                    case 3:
                        if (_a.sent()) {
                            ctx.status = 400;
                            ctx.body = 'Book with this title and author already exists';
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, manager.save(newBook)];
                    case 4:
                        book = _a.sent();
                        ctx.status = 201;
                        ctx.body = book;
                        return [2 /*return*/];
                }
            });
        });
    };
    BookController.updateBook = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var manager, user, updatedBook, errors, book;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        manager = typeorm_1.getManager();
                        return [4 /*yield*/, manager.findOne(user_1.User, ctx.request.body.user_id || 0)];
                    case 1:
                        user = _a.sent();
                        updatedBook = new book_1.Book();
                        updatedBook.id = +ctx.params.id || 0; // will always have a number, this will avoid errors
                        updatedBook.title = ctx.request.body.title;
                        updatedBook.description = ctx.request.body.description;
                        updatedBook.user = user;
                        return [4 /*yield*/, class_validator_1.validate(updatedBook)];
                    case 2:
                        errors = _a.sent();
                        if (errors.length > 0) {
                            ctx.status = 400;
                            ctx.body = errors;
                            return [2 /*return*/];
                        }
                        if (!user) {
                            ctx.status = 400;
                            ctx.body = 'The user you are trying to update doesn\'t exist in the db';
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, manager.findOne(book_1.Book, { where: { id: typeorm_1.Not(typeorm_1.Equal(updatedBook.id)), title: updatedBook.title, user: updatedBook.user } })];
                    case 3:
                        if (_a.sent()) {
                            ctx.status = 400;
                            ctx.body = 'Book with this title and author already exists';
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, manager.save(updatedBook)];
                    case 4:
                        book = _a.sent();
                        ctx.status = 201;
                        ctx.body = book;
                        return [2 /*return*/];
                }
            });
        });
    };
    BookController.deleteBook = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var manager, bookToRemove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        manager = typeorm_1.getManager();
                        return [4 /*yield*/, manager.findOne(book_1.Book, +ctx.params.id || 0)];
                    case 1:
                        bookToRemove = _a.sent();
                        if (!bookToRemove) {
                            ctx.status = 400;
                            ctx.body = 'The book you are trying to delete doesn\'t exist in the db';
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, manager.remove(bookToRemove)];
                    case 2:
                        _a.sent();
                        ctx.status = 204;
                        return [2 /*return*/];
                }
            });
        });
    };
    return BookController;
}());
exports["default"] = BookController;
