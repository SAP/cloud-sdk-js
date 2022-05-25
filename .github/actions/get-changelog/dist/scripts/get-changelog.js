"use strict";
exports.__esModule = true;
exports.getChangelog = void 0;
var fs_1 = require("fs");
var current_sdk_version_1 = require("./current-sdk-version");
var unixEOL = '\n';
function openFile(filePath) {
    return (0, fs_1.readFileSync)(filePath, { encoding: 'utf8' });
}
function getChangelog(v) {
    if (v === void 0) { v = current_sdk_version_1.currentSdkVersion; }
    var changelog = openFile('CHANGELOG.md');
    var _a = changelog.split("".concat(unixEOL, "# ").concat(v)), olderLogs = _a[1];
    var logs = olderLogs.split("".concat(unixEOL, "# "))[0];
    return logs.slice(logs.indexOf("".concat(unixEOL, "##")) + 1);
}
exports.getChangelog = getChangelog;
