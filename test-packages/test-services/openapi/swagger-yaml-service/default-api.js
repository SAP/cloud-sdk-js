'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DefaultApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
exports.DefaultApi = {
  postEntity: function (pathParam, queryParameters) {
    return new core_1.OpenApiRequestBuilder('post', '/entities/{pathParam}', {
      pathParameters: { pathParam: pathParam },
      queryParameters: queryParameters
    });
  },
  patchEntity: function (pathParam, body) {
    return new core_1.OpenApiRequestBuilder('patch', '/entities/{pathParam}', {
      pathParameters: { pathParam: pathParam },
      body: body
    });
  }
};
//# sourceMappingURL=default-api.js.map
