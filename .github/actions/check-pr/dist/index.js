"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var core_1 = require("@actions/core");
var github_1 = require("@actions/github");
var promises_1 = require("node:fs/promises");
var node_path_1 = require("node:path");
var validCommitTypes = ['feat', 'fix', 'chore'];
// Expected format: preamble(topic)!: Title text
function validateTitle() {
    return __awaiter(this, void 0, void 0, function () {
        var title, _a, preamble, postamble;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    title = github_1.context.payload.pull_request.title;
                    if (!title.includes(':')) {
                        return [2 /*return*/, (0, core_1.setFailed)("PR title does not adhere to conventional commit guidelines. No preamble found.")];
                    }
                    _a = title.split(':'), preamble = _a[0], postamble = _a[1];
                    return [4 /*yield*/, validatePreamble(preamble)];
                case 1:
                    _b.sent();
                    validatePostamble(postamble);
                    return [2 /*return*/];
            }
        });
    });
}
function validatePreamble(preamble) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var groups, commitType, isBreaking;
        return __generator(this, function (_b) {
            groups = (_a = preamble.match(/(?<commitType>\w+)?(\((?<topic>\w+)\))?(?<isBreaking>!)?/)) === null || _a === void 0 ? void 0 : _a.groups;
            if (!groups) {
                return [2 /*return*/, (0, core_1.setFailed)('Could not parse preamble. Ensure it follows the conventional commit guidelines.')];
            }
            commitType = groups.commitType, isBreaking = groups.isBreaking;
            validateCommitType(commitType);
            validateChangesets(preamble, commitType, !!isBreaking);
            return [2 /*return*/];
        });
    });
}
function validateCommitType(commitType) {
    if (!commitType || !validCommitTypes.includes(commitType)) {
        return (0, core_1.setFailed)("PR title does not adhere to conventional commit guidelines. Commit type found: ".concat(commitType, ". Must be one of ").concat(validCommitTypes.join(', ')));
    }
    (0, core_1.info)('✓ Commit type: OK');
}
function validatePostamble(title) {
    if (!title || !title.trim().length) {
        return (0, core_1.setFailed)("PR title does not have a title after conventional commit preamble.");
    }
    if (title[0] !== ' ') {
        return (0, core_1.setFailed)("Space missing after conventional commit preamble.");
    }
    if (title[1] === title[1].toLowerCase()) {
        return (0, core_1.setFailed)("PR title title must be capitalized (after conventional commit preamble).");
    }
    (0, core_1.info)('✓ Title: OK');
}
function getAllowedBumps(preamble, isBreaking) {
    if (isBreaking) {
        return ['major'];
    }
    if (preamble === 'feat') {
        return ['minor'];
    }
    if (preamble === 'fix') {
        return ['minor', 'patch'];
    }
    return [];
}
function hasMatchingChangeset(allowedBumps) {
    return __awaiter(this, void 0, void 0, function () {
        var changedFiles, fileContents, b;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!allowedBumps.length) return [3 /*break*/, 2];
                    changedFiles = (0, core_1.getInput)('changed-files').split(' ');
                    return [4 /*yield*/, Promise.all(changedFiles.map(function (file) { return (0, promises_1.readFile)(file, 'utf-8'); }))];
                case 1:
                    fileContents = _a.sent();
                    (0, core_1.info)('fileContents');
                    b = new RegExp("'@sap-cloud-sdk/.*': major/").test(fileContents[0]);
                    (0, core_1.info)(b ? 'true' : 'false');
                    (0, core_1.info)(fileContents[0]);
                    return [2 /*return*/, fileContents.some(function (fileContent) {
                            return allowedBumps.some(function (bump) {
                                return new RegExp("'@sap-cloud-sdk/.*': ".concat(bump, "/")).test(fileContent);
                            });
                        })];
                case 2: return [2 /*return*/, true];
            }
        });
    });
}
function validateChangesets(preamble, commitType, isBreaking) {
    return __awaiter(this, void 0, void 0, function () {
        var allowedBumps;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    allowedBumps = getAllowedBumps(commitType, isBreaking);
                    return [4 /*yield*/, hasMatchingChangeset(allowedBumps)];
                case 1:
                    if (!(_a.sent())) {
                        return [2 /*return*/, (0, core_1.setFailed)("Preamble '".concat(preamble, "' requires a changeset file with bump ").concat(allowedBumps.map(function (bump) { return "'".concat(bump, "'"); }).join(' or '), "."))];
                    }
                    (0, core_1.info)('✓ Changesets: OK');
                    return [2 /*return*/];
            }
        });
    });
}
function validateBody() {
    return __awaiter(this, void 0, void 0, function () {
        var body, template;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = github_1.context.payload.pull_request.body.replace(/\r\n/g, '\n');
                    return [4 /*yield*/, (0, promises_1.readFile)((0, node_path_1.resolve)('.github', 'PULL_REQUEST_TEMPLATE.md'), 'utf-8')];
                case 1:
                    template = _a.sent();
                    if (!body || body === template) {
                        return [2 /*return*/, (0, core_1.setFailed)('PR must have a description.')];
                    }
                    if (body.includes(template)) {
                        return [2 /*return*/, (0, core_1.setFailed)('PR template must not be ignored.')];
                    }
                    (0, core_1.info)('✓ Body: OK');
                    return [2 /*return*/];
            }
        });
    });
}
try {
    validateTitle();
    validateBody();
}
catch (err) {
    (0, core_1.setFailed)(err);
}
