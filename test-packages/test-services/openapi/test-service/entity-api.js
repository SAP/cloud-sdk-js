"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
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
    getAllEntities: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/entities', {
        queryParameters
    }),
    /**
     * Create a request builder for execution of put requests to the '/entities' endpoint.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    updateEntityWithPut: (body) => new openapi_1.OpenApiRequestBuilder('put', '/entities', {
        body
    }),
    /**
     * Create entity
     * @param body - Entity to create
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    createEntity: (body) => new openapi_1.OpenApiRequestBuilder('post', '/entities', {
        body
    }),
    /**
     * Create a request builder for execution of patch requests to the '/entities' endpoint.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    updateEntity: (body) => new openapi_1.OpenApiRequestBuilder('patch', '/entities', {
        body
    }),
    /**
     * Create a request builder for execution of delete requests to the '/entities' endpoint.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deleteEntity: (body) => new openapi_1.OpenApiRequestBuilder('delete', '/entities', {
        body
    }),
    /**
     * Head request of entities
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    headEntities: () => new openapi_1.OpenApiRequestBuilder('head', '/entities'),
    /**
     * Get entity by id
     * @param entityId - Key property of the entity
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getEntityByKey: (entityId) => new openapi_1.OpenApiRequestBuilder('get', '/entities/{entityId}', {
        pathParameters: { entityId }
    }),
    /**
     * Count entities
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    countEntities: () => new openapi_1.OpenApiRequestBuilder('get', '/entities/count')
};
//# sourceMappingURL=entity-api.js.map