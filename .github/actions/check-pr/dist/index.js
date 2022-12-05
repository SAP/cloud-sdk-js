"use strict";
exports.__esModule = true;
var core_1 = require("@actions/core");
var changedFiles = (0, core_1.getInput)('changed-files'); //.split(' ');
console.log('here', changedFiles);
// console.log(JSON.stringify(context.payload.pull_request, null, 2));
function checkChangeLogExists(title) {
    if (!title.startsWith('chore:')) {
        (0, core_1.setFailed)('No chore:');
    }
}
