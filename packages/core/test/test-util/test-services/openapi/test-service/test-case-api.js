"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestServiceTestCaseApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("../../../../../src");
var api_1 = require("./openapi/api");
exports.TestServiceTestCaseApi = {
    testCaseGetRequiredParameters: function (args) { return new core_1.OpenApiRequestBuilder(api_1.TestCaseApi, 'testCaseGetRequiredParameters', args.requiredPathItemQueryParam, args.requiredPathItemPathParam, args.requiredQueryParam, args.optionalQueryParam, args.optionalPathItemQueryParam, args.body); },
    testCasePostRequiredParameters: function (args) { return new core_1.OpenApiRequestBuilder(api_1.TestCaseApi, 'testCasePostRequiredParameters', args.requiredPathItemQueryParam, args.requiredPathItemPathParam, args.requiredQueryParam, args.body, args.optionalPathItemQueryParam, args.optionalQueryParam); },
    testCaseGetDuplicateParameters: function (args) { return new core_1.OpenApiRequestBuilder(api_1.TestCaseApi, 'testCaseGetDuplicateParameters', args.duplicateParam, args.duplicateParam2); },
    _export: function () { return new core_1.OpenApiRequestBuilder(api_1.TestCaseApi, '_export'); },
    _class: function () { return new core_1.OpenApiRequestBuilder(api_1.TestCaseApi, '_class'); },
    getTestCasesNoOperationId: function () { return new core_1.OpenApiRequestBuilder(api_1.TestCaseApi, 'getTestCasesNoOperationId'); },
    duplicateOperationId: function () { return new core_1.OpenApiRequestBuilder(api_1.TestCaseApi, 'duplicateOperationId'); },
    duplicateOperationId2: function () { return new core_1.OpenApiRequestBuilder(api_1.TestCaseApi, 'duplicateOperationId2'); },
    duplicateOperationId3: function () { return new core_1.OpenApiRequestBuilder(api_1.TestCaseApi, 'duplicateOperationId3'); },
    duplicateOperationId1: function () { return new core_1.OpenApiRequestBuilder(api_1.TestCaseApi, 'duplicateOperationId1'); }
};
//# sourceMappingURL=test-case-api.js.map