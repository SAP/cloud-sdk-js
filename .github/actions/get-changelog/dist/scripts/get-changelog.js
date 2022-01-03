"use strict";
exports.__esModule = true;
exports.getChangelog = void 0;
var util_1 = require("./util");
function getChangelog(v) {
    if (v === void 0) { v = util_1.version; }
    var changelog = util_1.openFile('CHANGELOG.md');
    var _a = changelog.split("\n# " + v), _ = _a[0], olderLogs = _a[1];
    var logs = olderLogs.split('\n# ')[0];
    return logs.slice(logs.indexOf('\n##') + 1);
}
exports.getChangelog = getChangelog;
