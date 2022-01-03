"use strict";
exports.__esModule = true;
var get_changelog_1 = require("../../../scripts/get-changelog");
var core_1 = require("@actions/core");
try {
    (0, core_1.setOutput)('changelog', (0, get_changelog_1.getChangelog)());
}
catch (error) {
    (0, core_1.setFailed)(error.message);
}
