'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ExtensionApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require('@sap-cloud-sdk/openapi');
/**
 * Representation of the 'ExtensionApi'.
 * This API is part of the 'test-service' service.
 */
exports.ExtensionApi = {
  /**
   * Create a request builder for execution of get requests to the '/test-cases/extension' endpoint.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  niceGetFunction: () =>
    new openapi_1.OpenApiRequestBuilder('get', '/test-cases/extension'),
  /**
   * Create a request builder for execution of post requests to the '/test-cases/extension' endpoint.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  nicePostFunction: () =>
    new openapi_1.OpenApiRequestBuilder('post', '/test-cases/extension')
};
//# sourceMappingURL=extension-api.js.map
