'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DefaultApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
/**
 * Representation of the 'DefaultApi'.
 * This API is part of the 'swagger-yaml-service' service.
 */
exports.DefaultApi = {
  /**
   * Test POST
   * @param pathParam Path parameter.
   * @param queryParameters -  Object containing the following keys: queryParam.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  postEntity: function (pathParam, queryParameters) {
    return new core_1.OpenApiRequestBuilder('post', '/entities/{pathParam}', {
      pathParameters: { pathParam: pathParam },
      queryParameters: queryParameters
    });
  },
  /**
   * Create a request builder for execution of patch requests to the '/entities/{pathParam}' endpoint.
   * @param pathParam Path parameter.
   * @param body -  Request body.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  patchEntity: function (pathParam, body) {
    return new core_1.OpenApiRequestBuilder('patch', '/entities/{pathParam}', {
      pathParameters: { pathParam: pathParam },
      body: body
    });
  }
};
//# sourceMappingURL=default-api.js.map
