"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var databaseUrl = process.env.MONGODB_URI;
if (process.env.NODE_ENV === 'test') {
    databaseUrl = process.env.MONGODB_TEST_URI;
}
exports["default"] = {
    port: process.env.PORT || 8000,
    databaseURL: databaseUrl,
    jwtSecret: process.env.JWT_SECRET,
    logs: {
        level: process.env.LOG_LEVEL
    },
    endpointPrefix: process.env.ENDPOINT_PREFIX || 'api'
};
