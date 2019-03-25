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
var service_1 = require("../entity/service");
var class_validator_1 = require("class-validator");
var constants_1 = require("../constants");
var ServiceContext_1 = require("../../service-with-state-strategy/ServiceContext");
var ServiceController = (function () {
    function ServiceController() {
    }
    ServiceController.create = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var manager, newService, errors, service;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        manager = typeorm_1.getManager();
                        newService = new service_1.Service();
                        newService.status = 'new';
                        return [4 /*yield*/, class_validator_1.validate(newService)];
                    case 1:
                        errors = _a.sent();
                        if (errors.length > 0) {
                            ctx.status = constants_1.constants.BAD_REQUEST;
                            ctx.body = errors;
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, manager.save(newService)];
                    case 2:
                        service = _a.sent();
                        ctx.status = constants_1.constants.CREATED;
                        ctx.body = service;
                        return [2 /*return*/];
                }
            });
        });
    };
    ServiceController.status = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var manager, service, serviceContext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        manager = typeorm_1.getManager();
                        return [4 /*yield*/, manager.findOne(service_1.Service, { where: { id: +ctx.params.id || 0 } })];
                    case 1:
                        service = _a.sent();
                        if (!service) {
                            ctx.status = constants_1.constants.BAD_REQUEST;
                            ctx.body = 'The service you are trying to find doesn\'t exist in the db';
                            return [2 /*return*/];
                        }
                        serviceContext = new ServiceContext_1.ServiceContext(service, ctx.request.body.state);
                        service.status = serviceContext.run();
                        return [4 /*yield*/, manager.save(service)];
                    case 2:
                        _a.sent();
                        ctx.status = constants_1.constants.OK;
                        ctx.body = service.status;
                        return [2 /*return*/];
                }
            });
        });
    };
    return ServiceController;
}());
exports["default"] = ServiceController;
