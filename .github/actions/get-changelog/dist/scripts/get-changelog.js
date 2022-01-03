"use strict";
exports.__esModule = true;
exports.getChangelog = void 0;
var util_1 = require("@sap-cloud-sdk/util");
var util_2 = require("./util");
function getChangelog(v) {
    if (v === void 0) { v = util_2.version; }
    var changelog = (0, util_2.openFile)('CHANGELOG.md');
    var _a = changelog.split(util_1.unixEOL + "# " + v), olderLogs = _a[1];
    var logs = olderLogs.split(util_1.unixEOL + "# ")[0];
    return logs.slice(logs.indexOf(util_1.unixEOL + "##") + 1);
}
exports.getChangelog = getChangelog;
