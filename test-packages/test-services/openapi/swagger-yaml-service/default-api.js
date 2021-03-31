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
 * This API is part of the 'SwaggerYamlService' service.
 */
exports.DefaultApi = {
  /**
   * Test POST
   *
   * @param pathParam Path parameter with the original name pathParam
   * @param queryParameters Object containing the query parameters.
   * @returns TestEntity[]
   */
  postEntity: function (pathParam, queryParameters) {
    return new core_1.OpenApiRequestBuilder('post', '/entities/{pathParam}', {
      pathParameters: { pathParam: pathParam },
      queryParameters: queryParameters
    });
  },
  /**
   * Makes a patch request to the '/entities/{pathParam}' endpoint and returns a 'string'
   *
   * @param pathParam Path parameter with the original name pathParam
   * @param body Request body
   * @returns string
   */
  patchEntity: function (pathParam, body) {
    return new core_1.OpenApiRequestBuilder('patch', '/entities/{pathParam}', {
      pathParameters: { pathParam: pathParam },
      body: body
    });
  }
};
//# sourceMappingURL=default-api.js.map
