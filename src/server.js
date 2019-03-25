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
var _this = this;
exports.__esModule = true;
var Koa = require("koa");
var bodyParser = require("koa-bodyparser");
var helmet = require("koa-helmet");
var cors = require("@koa/cors");
var winston = require("winston");
var dotenv = require("dotenv");
var typeorm_1 = require("typeorm");
require("reflect-metadata");
var PostgressConnectionStringParser = require("pg-connection-string");
var serve = require("koa-static");
var swagger = require('koa2-swagger-ui');
var logging_1 = require("./logging");
var config_1 = require("./config");
var routes_1 = require("./routes");
// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' });
// Get DB connection options from env variable
var connectionOptions = PostgressConnectionStringParser.parse(config_1.config.databaseUrl);
// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
typeorm_1.createConnection({
    type: 'postgres',
    host: connectionOptions.host,
    port: connectionOptions.port,
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database,
    synchronize: true,
    logging: false,
    entities: [
        'dist/entity/**/*.js',
        'src/entity/**/*.ts'
    ],
    extra: {
        ssl: config_1.config.dbsslconn
    }
}).then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
    var app;
    return __generator(this, function (_a) {
        app = new Koa();
        // Provides important security headers to make your app more secure
        app.use(helmet());
        // Enable cors with default options
        app.use(cors());
        // Logger middleware -> use winston as logger (logging.ts with config)
        app.use(logging_1.logger(winston));
        // Enable bodyParser with default options
        app.use(bodyParser());
        // JWT middleware -> below this line routes are only reached if JWT token is valid, secret as env variable
        // app.use(jwt({ secret: config.jwtSecret }));
        // this routes are protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
        app.use(routes_1.router.routes()).use(routes_1.router.allowedMethods());
        app.use(serve('public'));
        app.use(swagger({
            routePrefix: '/swagger',
            swaggerOptions: {
                url: '/swagger/swagger.yml'
            }
        }));
        app.listen(config_1.config.port);
        console.log("Server running on port " + config_1.config.port);
        return [2 /*return*/];
    });
}); })["catch"](function (error) { return console.log('TypeORM connection error: ', error); });
