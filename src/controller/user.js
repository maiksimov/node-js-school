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
var user_1 = require("../entity/user");
var UserController = (function () {
    function UserController() {
    }
    UserController.getUsers = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = typeorm_1.getManager().getRepository(user_1.User);
                        return [4 /*yield*/, userRepository.find()];
                    case 1:
                        users = _a.sent();
                        // return OK status code and loaded users array
                        ctx.status = 200;
                        ctx.body = users;
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.getUser = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = typeorm_1.getManager().getRepository(user_1.User);
                        return [4 /*yield*/, userRepository.findOne(+ctx.params.id || 0)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            ctx.status = 400;
                            ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
                            return [2 /*return*/];
                        }
                        // return OK status code and loaded user object
                        ctx.status = 200;
                        ctx.body = user;
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.createUser = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, userToBeSaved, errors, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = typeorm_1.getManager().getRepository(user_1.User);
                        userToBeSaved = new user_1.User();
                        userToBeSaved.name = ctx.request.body.name;
                        userToBeSaved.email = ctx.request.body.email;
                        return [4 /*yield*/, class_validator_1.validate(userToBeSaved)];
                    case 1:
                        errors = _a.sent();
                        if (!(errors.length > 0)) return [3 /*break*/, 2];
                        // return BAD REQUEST status code and errors array
                        ctx.status = 400;
                        ctx.body = errors;
                        return [3 /*break*/, 6];
                    case 2: return [4 /*yield*/, userRepository.findOne({ email: userToBeSaved.email })];
                    case 3:
                        if (!_a.sent()) return [3 /*break*/, 4];
                        // return BAD REQUEST status code and email already exists error
                        ctx.status = 400;
                        ctx.body = 'The specified e-mail address already exists';
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, userRepository.save(userToBeSaved)];
                    case 5:
                        user = _a.sent();
                        // return CREATED status code and updated user
                        ctx.status = 201;
                        ctx.body = user;
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.updateUser = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, userToBeUpdated, errors, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = typeorm_1.getManager().getRepository(user_1.User);
                        userToBeUpdated = new user_1.User();
                        userToBeUpdated.id = +ctx.params.id || 0; // will always have a number, this will avoid errors
                        userToBeUpdated.name = ctx.request.body.name;
                        userToBeUpdated.email = ctx.request.body.email;
                        return [4 /*yield*/, class_validator_1.validate(userToBeUpdated)];
                    case 1:
                        errors = _a.sent();
                        if (!(errors.length > 0)) return [3 /*break*/, 2];
                        // return BAD REQUEST status code and errors array
                        ctx.status = 400;
                        ctx.body = errors;
                        return [3 /*break*/, 8];
                    case 2: return [4 /*yield*/, userRepository.findOne(userToBeUpdated.id)];
                    case 3:
                        if (!!(_a.sent())) return [3 /*break*/, 4];
                        // check if a user with the specified id exists
                        // return a BAD REQUEST status code and error message
                        ctx.status = 400;
                        ctx.body = 'The user you are trying to update doesn\'t exist in the db';
                        return [3 /*break*/, 8];
                    case 4: return [4 /*yield*/, userRepository.findOne({ id: typeorm_1.Not(typeorm_1.Equal(userToBeUpdated.id)), email: userToBeUpdated.email })];
                    case 5:
                        if (!_a.sent()) return [3 /*break*/, 6];
                        // return BAD REQUEST status code and email already exists error
                        ctx.status = 400;
                        ctx.body = 'The specified e-mail address already exists';
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, userRepository.save(userToBeUpdated)];
                    case 7:
                        user = _a.sent();
                        // return CREATED status code and updated user
                        ctx.status = 201;
                        ctx.body = user;
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    UserController.deleteUser = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, userToRemove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = typeorm_1.getManager().getRepository(user_1.User);
                        return [4 /*yield*/, userRepository.findOne(+ctx.params.id || 0)];
                    case 1:
                        userToRemove = _a.sent();
                        if (!!userToRemove) return [3 /*break*/, 2];
                        // return a BAD REQUEST status code and error message
                        ctx.status = 400;
                        ctx.body = 'The user you are trying to delete doesn\'t exist in the db';
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(+ctx.state.user.id !== userToRemove.id)) return [3 /*break*/, 3];
                        // check user's token id and user id are the same
                        // if not, return a FORBIDDEN status code and error message
                        ctx.status = 403;
                        ctx.body = 'A user can only be deleted by himself';
                        return [3 /*break*/, 5];
                    case 3: 
                    // the user is there so can be removed
                    return [4 /*yield*/, userRepository.remove(userToRemove)];
                    case 4:
                        // the user is there so can be removed
                        _a.sent();
                        // return a NO CONTENT status code
                        ctx.status = 204;
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports["default"] = UserController;
