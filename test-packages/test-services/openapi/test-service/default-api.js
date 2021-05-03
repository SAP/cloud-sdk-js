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
 * This API is part of the 'test-service' service.
 */
exports.DefaultApi = {
  /**
   * Create a request builder for execution of get requests to the '/test-cases/default-tag' endpoint.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  noTag: function () {
    return new core_1.OpenApiRequestBuilder('get', '/test-cases/default-tag');
  },
  /**
   * Create a request builder for execution of post requests to the '/test-cases/default-tag' endpoint.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  defaultTag: function () {
    return new core_1.OpenApiRequestBuilder('post', '/test-cases/default-tag');
  }
};
//# sourceMappingURL=default-api.js.map
