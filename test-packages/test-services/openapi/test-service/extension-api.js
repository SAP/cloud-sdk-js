"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestServiceExtensionApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var api_1 = require("./openapi/api");
exports.TestServiceExtensionApi = {
    niceGetFunction: function () { return new core_1.OpenApiRequestBuilder(api_1.ExtensionApi, 'niceGetFunction'); },
    nicePostFunction: function () { return new core_1.OpenApiRequestBuilder(api_1.ExtensionApi, 'nicePostFunction'); },
    getTestCasesExtensionWithApiSuffix: function () { return new core_1.OpenApiRequestBuilder(api_1.ExtensionApi, 'getTestCasesExtensionWithApiSuffix'); },
    getTestCasesExtensionWithSpaceApiSuffix: function () { return new core_1.OpenApiRequestBuilder(api_1.ExtensionApi, 'getTestCasesExtensionWithSpaceApiSuffix'); },
    getTestCasesExtensionWithHyphenApiSuffix: function () { return new core_1.OpenApiRequestBuilder(api_1.ExtensionApi, 'getTestCasesExtensionWithHyphenApiSuffix'); }
};
//# sourceMappingURL=extension-api.js.map