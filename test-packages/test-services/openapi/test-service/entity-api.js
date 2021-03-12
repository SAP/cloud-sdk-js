"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestServiceEntityApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
exports.TestServiceEntityApi = {
    getAllEntities: function (queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/entities', {
        queryParameters: queryParameters
    }); },
    updateEntityWithPut: function (body, queryParameters) { return new core_1.OpenApiRequestBuilder('put', '/entities', {
        body: body
    }); },
    createEntity: function (body, queryParameters) { return new core_1.OpenApiRequestBuilder('post', '/entities', {
        body: body
    }); },
    updateEntity: function (body, queryParameters) { return new core_1.OpenApiRequestBuilder('patch', '/entities', {
        body: body
    }); },
    deleteEntity: function (body, queryParameters) { return new core_1.OpenApiRequestBuilder('delete', '/entities', {
        body: body
    }); },
    getEntityByKey: function (entityId, queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/entities/{entityId}', {
        pathParameters: [entityId]
    }); },
    countEntities: function (queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/entities/count'); }
};
//# sourceMappingURL=entity-api.js.map