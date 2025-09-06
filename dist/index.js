"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsSDKError = exports.ReviewsSDK = void 0;
// Main SDK class
var client_1 = require("./client");
Object.defineProperty(exports, "ReviewsSDK", { enumerable: true, get: function () { return client_1.ReviewsSDK; } });
// Error handling
var errors_1 = require("./errors");
Object.defineProperty(exports, "ReviewsSDKError", { enumerable: true, get: function () { return errors_1.ReviewsSDKError; } });
