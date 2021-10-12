"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
/**
 * Representation of the 'EntityApi'.
 * This API is part of the 'test-service' service.
 */
exports.EntityApi = {
    /**
     * Get all entities
     * @param queryParameters - Object containing the following keys: stringParameter, integerParameter, $dollarParameter, dot.parameter, enumStringParameter, enumInt32Parameter, enumDoubleParameter, enumBooleanParameter.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getAllEntities: function (queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/entities', {
        queryParameters: queryParameters
    }); },
    /**
     * Create a request builder for execution of put requests to the '/entities' endpoint.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    updateEntityWithPut: function (body) { return new core_1.OpenApiRequestBuilder('put', '/entities', {
        body: body
    }); },
    /**
     * Create entity
     * @param body - Entity to create
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    createEntity: function (body) { return new core_1.OpenApiRequestBuilder('post', '/entities', {
        body: body
    }); },
    /**
     * Create a request builder for execution of patch requests to the '/entities' endpoint.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    updateEntity: function (body) { return new core_1.OpenApiRequestBuilder('patch', '/entities', {
        body: body
    }); },
    /**
     * Create a request builder for execution of delete requests to the '/entities' endpoint.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deleteEntity: function (body) { return new core_1.OpenApiRequestBuilder('delete', '/entities', {
        body: body
    }); },
    /**
     * Head request of entities
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    headEntities: function () { return new core_1.OpenApiRequestBuilder('head', '/entities'); },
    /**
     * Get entity by id
     * @param entityId - Key property of the entity
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getEntityByKey: function (entityId) { return new core_1.OpenApiRequestBuilder('get', '/entities/{entityId}', {
        pathParameters: { entityId: entityId }
    }); },
    /**
     * Count entities
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    countEntities: function () { return new core_1.OpenApiRequestBuilder('get', '/entities/count'); }
};
//# sourceMappingURL=entity-api.js.map