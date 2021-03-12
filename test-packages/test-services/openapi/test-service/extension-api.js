"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestServiceExtensionApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
exports.TestServiceExtensionApi = {
    niceGetFunction: function (queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/test-cases/extension'); },
    nicePostFunction: function (queryParameters) { return new core_1.OpenApiRequestBuilder('post', '/test-cases/extension'); }
};
//# sourceMappingURL=extension-api.js.map