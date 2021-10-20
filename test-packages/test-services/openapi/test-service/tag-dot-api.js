'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TagDotApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var openapi_1 = require('@sap-cloud-sdk/openapi');
/**
 * Representation of the 'TagDotApi'.
 * This API is part of the 'test-service' service.
 */
exports.TagDotApi = {
  /**
   * Create a request builder for execution of get requests to the '/test-cases/special-tag' endpoint.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  tagWithDot: function () {
    return new openapi_1.OpenApiRequestBuilder(
      'get',
      '/test-cases/special-tag'
    );
  }
};
//# sourceMappingURL=tag-dot-api.js.map
