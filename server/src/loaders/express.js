"use strict";
exports.__esModule = true;
var body_parser_1 = require("body-parser");
var cors_1 = require("cors");
var cookie_parser_1 = require("cookie-parser");
var helmet_1 = require("helmet");
var routes_1 = require("../api/routes");
var logger_1 = require("../logger");
var config_1 = require("../config");
var class_validator_1 = require("class-validator");
var celebrate_1 = require("celebrate");
var ErrorHandler_1 = require("../helpers/ErrorHandler");
var express_1 = require("express");
var path_1 = require("path");
exports["default"] = (function (app) {
    var appRoot = process.cwd();
    app.use(express_1["default"].static(path_1["default"].join(appRoot, 'public')));
    app.use(express_1["default"].static(path_1["default"].join(appRoot, 'public', 'build')));
    app.use(function (req, res, next) {
        console.log('req.path: ', req.path);
        if (req.path.startsWith("/" + config_1["default"].endpointPrefix))
            return next();
        return res.sendFile(path_1["default"].join(appRoot, 'public', 'build', 'index.html'));
    });
    // Health Check endpoints
    app.get('/status', function (req, res) {
        res.status(200).end();
    });
    app.head('/status', function (req, res) {
        res.status(200).end();
    });
    app.enable('trust proxy');
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use((0, cors_1["default"])());
    app.use((0, cookie_parser_1["default"])());
    // Use Helmet to secure the app by setting various HTTP headers
    app.use((0, helmet_1["default"])());
    // Middleware that transforms the raw string of req.body into json
    app.use(body_parser_1["default"].json());
    // Load API routes
    app.use("/" + config_1["default"].endpointPrefix, routes_1["default"]);
    /// Error handlers
    app.use(function (err, req, res, next) {
        if ((0, celebrate_1.isCelebrateError)(err)) {
            logger_1["default"].error('Error: %o', err);
            res.status(400).json({ error: 'Invalid data' }).end();
        }
        else if (err instanceof Array && err[0] instanceof class_validator_1.ValidationError) {
            var messageArr_1 = [];
            var e = void 0;
            for (var _i = 0, err_1 = err; _i < err_1.length; _i++) {
                e = err_1[_i];
                Object.values(e.constraints).map(function (msg) {
                    messageArr_1.push(msg);
                });
            }
            logger_1["default"].error('Error: %o', messageArr_1);
            res.status(400).json({ errors: messageArr_1 }).end();
        }
        else if (err.name === 'UnauthorizedError') {
            /**
             * Handle 401 thrown by express-jwt library
             */
            return res.status(401).json({ error: err.message });
        }
        else {
            next(err);
        }
    });
    app.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function (err, _req, res, _next) {
        logger_1["default"].error('Error: %o', err.message);
        (0, ErrorHandler_1.handleError)(err, res);
    });
});
