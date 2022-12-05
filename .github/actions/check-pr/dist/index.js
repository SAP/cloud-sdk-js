"use strict";
exports.__esModule = true;
var core_1 = require("@actions/core");
var github_1 = require("@actions/github");
console.log(github_1.context.payload.pull_request.title);
if (!github_1.context.payload.pull_request.title.startsWith('chore:')) {
    (0, core_1.setFailed)('No chore:');
}
