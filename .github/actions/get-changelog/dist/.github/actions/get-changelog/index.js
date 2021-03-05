"use strict";
exports.__esModule = true;
var get_changelog_1 = require("../../../scripts/get-changelog");
var core_1 = require("@actions/core");
try {
    core_1.setOutput("changelog", get_changelog_1.getChangelog());
}
catch (error) {
    core_1.setFailed(error.message);
}
