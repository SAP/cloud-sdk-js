"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var validPreambles = ['feat', 'fix', 'chore'];
function parseTitle(title) {
    var groups = title.match(/(?<preamble>\w+)(\((?<topic>\w+)\))?(?<isBreaking>!)?: (?<description>.*)/).groups;
    if (groups) {
        return __assign(__assign({}, groups), { isBreaking: !!groups.isBreaking });
    }
    else {
        throw new Error('Could not parse PR title');
    }
}
function validatePreamble(preamble) {
    if (!preamble || !validPreambles.includes(preamble)) {
        (0, core_1.setFailed)("PR title does not adhere to conventional commit guidelines. Commit type found: ".concat(preamble, ". Should be one of ").concat(validPreambles.join(', ')));
    }
    else {
        (0, core_1.info)('✓ Preamble: OK');
    }
}
function validateTitle(title) {
    if (!title) {
        (0, core_1.setFailed)("PR title does not have a title (after conventional commit preamble).");
    }
    if (title[0] === title[0].toLowerCase()) {
        (0, core_1.setFailed)("PR title title should be capitalized (after conventional commit preamble).");
    }
    else {
        (0, core_1.info)('✓ Title: OK');
    }
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
function validateChangelog(preamble, isBreaking) {
    return __awaiter(this, void 0, void 0, function () {
        var ok, allowedBumps, changedFiles, fileContents;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ok = true;
                    allowedBumps = getAllowedBumps(preamble, isBreaking);
                    if (!allowedBumps.length) return [3 /*break*/, 2];
                    changedFiles = (0, core_1.getInput)('changed-files').split(' ');
                    return [4 /*yield*/, Promise.all(changedFiles.map(function (file) { return (0, promises_1.readFile)(file, 'utf-8'); }))];
                case 1:
                    fileContents = _a.sent();
                    ok = fileContents.some(function (fileContent) {
                        return allowedBumps.some(function (bump) {
                            return new RegExp("'@sap-cloud-sdk/w+': ".concat(bump, "/")).test(fileContent);
                        });
                    });
                    _a.label = 2;
                case 2:
                    if (!ok) {
                        (0, core_1.setFailed)("Preamble '".concat(preamble, "' requires a changelog file with bump ").concat(allowedBumps.join(' or '), "."));
                    }
                    else {
                        (0, core_1.info)('✓ Changelog: OK');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function validateBody() {
    return __awaiter(this, void 0, void 0, function () {
        var body, prTemplate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = github_1.context.payload.pull_request.body.replace(/\r\n/g, '\n');
                    return [4 /*yield*/, (0, promises_1.readFile)((0, node_path_1.resolve)('.github', 'PULL_REQUEST_TEMPLATE.md'), 'utf-8')];
                case 1:
                    prTemplate = _a.sent();
                    if (!body || body === prTemplate) {
                        (0, core_1.setFailed)('PR should have a description');
                    }
                    else {
                        (0, core_1.info)('✓ Body: OK');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
try {
    var _a = parseTitle(github_1.context.payload.pull_request.title), preamble = _a.preamble, isBreaking = _a.isBreaking, description = _a.description;
    validatePreamble(preamble);
    validateTitle(description);
    validateChangelog(preamble, isBreaking);
    validateBody();
}
catch (err) {
    (0, core_1.setFailed)(err);
}
