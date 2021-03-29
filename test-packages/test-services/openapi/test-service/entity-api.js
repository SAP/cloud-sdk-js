'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.EntityApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
/**
 * Representation of the EntityApi API.
 * This API is part of the TestService service.
 *
 * This API client has been created automatically using the SAP Cloud SDK - do not edit manually.
 */
exports.EntityApi = {
  /**
   * Get all entities
   *
   * @param queryParameters Optional object containing the query parameters.
   * @returns TestEntity[]
   */
  getAllEntities: function (queryParameters) {
    return new core_1.OpenApiRequestBuilder('get', '/entities', {
      queryParameters: queryParameters
    });
  },
  /**
   * Makes a put request to the '/entities' endpoint and returns a 'any'
   *
   * @param body Optional object containing the request body of type 'TestEntity[]'
   * @returns any
   */
  updateEntityWithPut: function (body) {
    return new core_1.OpenApiRequestBuilder('put', '/entities', {
      body: body
    });
  },
  /**
   * Create entity
   *
   * @param body Optional object containing the request body of type 'TestEntity'
   * @returns any
   */
  createEntity: function (body) {
    return new core_1.OpenApiRequestBuilder('post', '/entities', {
      body: body
    });
  },
  /**
   * Makes a patch request to the '/entities' endpoint and returns a 'any'
   *
   * @param body Optional object containing the request body of type 'Record<string, any>'
   * @returns any
   */
  updateEntity: function (body) {
    return new core_1.OpenApiRequestBuilder('patch', '/entities', {
      body: body
    });
  },
  /**
   * Makes a delete request to the '/entities' endpoint and returns a 'any'
   *
   * @param body Optional object containing the request body of type 'string[]'
   * @returns any
   */
  deleteEntity: function (body) {
    return new core_1.OpenApiRequestBuilder('delete', '/entities', {
      body: body
    });
  },
  /**
   * Get entity by id
   *
   * @param entityId Key property of the entity
   * @returns any
   */
  getEntityByKey: function (entityId) {
    return new core_1.OpenApiRequestBuilder('get', '/entities/{entityId}', {
      pathParameters: { entityId: entityId }
    });
  },
  /**
   * Count entities
   *
   * @returns number
   */
  countEntities: function () {
    return new core_1.OpenApiRequestBuilder('get', '/entities/count');
  }
};
//# sourceMappingURL=entity-api.js.map
