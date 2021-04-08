'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TagSpaceApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
/**
 * Representation of the 'TagSpaceApi'.
 * This API is part of the 'TestService' service.
 */
exports.TagSpaceApi = {
  /**
   * Create a request builder for execution of post requests to the '/test-cases/special-tag' endpoint.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  tagWithSpace: function () {
    return new core_1.OpenApiRequestBuilder('post', '/test-cases/special-tag');
  }
};
//# sourceMappingURL=tag-space-api.js.map
