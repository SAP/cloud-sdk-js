"use strict";
exports.__esModule = true;
var core_1 = require("@actions/core");
var github_1 = require("@actions/github");
console.log(JSON.stringify(github_1.context.payload.pull_request, null, 2));
function checkChangeLogExists(title) {
    if (!title.startsWith('chore:')) {
        (0, core_1.setFailed)('No chore:');
    }
}
