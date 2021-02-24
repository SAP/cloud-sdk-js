"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestServiceExtensionApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("../../../../../src");
var api_1 = require("./openapi/api");
exports.TestServiceExtensionApi = {
    niceGetFunction: function () { return new core_1.OpenApiRequestBuilder(api_1.ExtensionApi, 'getTestCasesExtension'); },
    nicePostFunction: function () { return new core_1.OpenApiRequestBuilder(api_1.ExtensionApi, 'testCasesExtensionPost'); }
};
//# sourceMappingURL=extension-api.js.map