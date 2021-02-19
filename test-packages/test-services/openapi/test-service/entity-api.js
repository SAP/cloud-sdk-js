"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestServiceEntityApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var api_1 = require("./openapi/api");
exports.TestServiceEntityApi = {
    getAllEntities: function (args) { return new core_1.OpenApiRequestBuilder(api_1.EntityApi, 'getAllEntities', args === null || args === void 0 ? void 0 : args.stringParameter, args === null || args === void 0 ? void 0 : args.integerParameter, args === null || args === void 0 ? void 0 : args.dollarParameter, args === null || args === void 0 ? void 0 : args.dotParameter, args === null || args === void 0 ? void 0 : args.enumStringParameter, args === null || args === void 0 ? void 0 : args.enumInt32Parameter, args === null || args === void 0 ? void 0 : args.enumDoubleParameter, args === null || args === void 0 ? void 0 : args.enumBooleanParameter); },
    updateEntityWithPut: function (args) { return new core_1.OpenApiRequestBuilder(api_1.EntityApi, 'updateEntityWithPut', args === null || args === void 0 ? void 0 : args.body); },
    createEntity: function (args) { return new core_1.OpenApiRequestBuilder(api_1.EntityApi, 'createEntity', args === null || args === void 0 ? void 0 : args.body); },
    updateEntity: function (args) { return new core_1.OpenApiRequestBuilder(api_1.EntityApi, 'updateEntity', args === null || args === void 0 ? void 0 : args.body); },
    deleteEntity: function (args) { return new core_1.OpenApiRequestBuilder(api_1.EntityApi, 'deleteEntity', args === null || args === void 0 ? void 0 : args.body); },
    getEntityByKey: function (args) { return new core_1.OpenApiRequestBuilder(api_1.EntityApi, 'getEntityByKey', args.entityId); },
    countEntities: function () { return new core_1.OpenApiRequestBuilder(api_1.EntityApi, 'countEntities'); }
};
//# sourceMappingURL=entity-api.js.map