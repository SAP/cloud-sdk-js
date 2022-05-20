"use strict";
exports.__esModule = true;
exports.currentSdkVersion = void 0;
var fs_1 = require("fs");
exports.currentSdkVersion = JSON.parse((0, fs_1.readFileSync)('package.json', 'utf8')).version;
