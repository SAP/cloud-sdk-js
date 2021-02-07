"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestServiceApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var api_1 = require("./openapi/api");
exports.TestServiceApi = {
    getAllEntities: function (args) { return new core_1.OpenApiRequestBuilder(api_1.DefaultApi, 'getAllEntities', args === null || args === void 0 ? void 0 : args.stringParameter, args === null || args === void 0 ? void 0 : args.integerParameter, args === null || args === void 0 ? void 0 : args.dollarParameter, args === null || args === void 0 ? void 0 : args.dotParameter, args === null || args === void 0 ? void 0 : args.enumStringParameter, args === null || args === void 0 ? void 0 : args.enumInt32Parameter, args === null || args === void 0 ? void 0 : args.enumDoubleParameter, args === null || args === void 0 ? void 0 : args.enumBooleanParameter); },
    updateEntityWithPut: function (args) { return new core_1.OpenApiRequestBuilder(api_1.DefaultApi, 'updateEntityWithPut', args === null || args === void 0 ? void 0 : args.body); },
    createEntity: function (args) { return new core_1.OpenApiRequestBuilder(api_1.DefaultApi, 'createEntity', args === null || args === void 0 ? void 0 : args.body); },
    updateEntity: function (args) { return new core_1.OpenApiRequestBuilder(api_1.DefaultApi, 'updateEntity', args === null || args === void 0 ? void 0 : args.body); },
    deleteEntity: function (args) { return new core_1.OpenApiRequestBuilder(api_1.DefaultApi, 'deleteEntity', args === null || args === void 0 ? void 0 : args.body); },
    getEntityByKey: function (args) { return new core_1.OpenApiRequestBuilder(api_1.DefaultApi, 'getEntityByKey', args.entityId); },
    countEntities: function () { return new core_1.OpenApiRequestBuilder(api_1.DefaultApi, 'countEntities'); },
    testCaseGetRequiredParameters: function (args) { return new core_1.OpenApiRequestBuilder(api_1.DefaultApi, 'testCaseGetRequiredParameters', args.requiredPathItemQueryParam, args.requiredPathItemPathParam, args.requiredQueryParam, args.optionalQueryParam, args.optionalPathItemQueryParam, args.body); },
    testCasePostRequiredParameters: function (args) { return new core_1.OpenApiRequestBuilder(api_1.DefaultApi, 'testCasePostRequiredParameters', args.requiredPathItemQueryParam, args.requiredPathItemPathParam, args.requiredQueryParam, args.body, args.optionalPathItemQueryParam, args.optionalQueryParam); },
    testCaseGetDuplicateParameters: function (args) { return new core_1.OpenApiRequestBuilder(api_1.DefaultApi, 'testCaseGetDuplicateParameters', args.duplicateParam, args.duplicateParam2); },
    getTestCasesNoOperationId: function () { return new core_1.OpenApiRequestBuilder(api_1.DefaultApi, 'getTestCasesNoOperationId'); },
    duplicateOperationId: function () { return new core_1.OpenApiRequestBuilder(api_1.DefaultApi, 'duplicateOperationId'); },
    duplicateOperationId2: function () { return new core_1.OpenApiRequestBuilder(api_1.DefaultApi, 'duplicateOperationId2'); },
    duplicateOperationId3: function () { return new core_1.OpenApiRequestBuilder(api_1.DefaultApi, 'duplicateOperationId3'); },
    duplicateOperationId1: function () { return new core_1.OpenApiRequestBuilder(api_1.DefaultApi, 'duplicateOperationId1'); },
    noTag: function () { return new core_1.OpenApiRequestBuilder(api_1.DefaultApi, 'noTag'); },
    defaultTag: function () { return new core_1.OpenApiRequestBuilder(api_1.DefaultApi, 'defaultTag'); }
};
//# sourceMappingURL=api.js.map