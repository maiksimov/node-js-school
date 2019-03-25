"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var controller = require("./controller");
var router = new Router();
exports.router = router;
// GENERAL ROUTES
router.get('/', controller.general.helloWorld);
router.get('/jwt', controller.general.getJwtPayload);
router.post('/service', controller.service.create);
router.put('/service/:id', controller.service.status);
