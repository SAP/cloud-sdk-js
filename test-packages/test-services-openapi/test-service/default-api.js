"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'DefaultApi'.
 * This API is part of the 'test-service' service.
 */
exports.DefaultApi = {
    /**
     * Create a request builder for execution of get requests to the '/test-cases/default-tag' endpoint.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    noTag: () => new openapi_1.OpenApiRequestBuilder('get', '/test-cases/default-tag'),
    /**
     * Create a request builder for execution of post requests to the '/test-cases/default-tag' endpoint.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    defaultTag: () => new openapi_1.OpenApiRequestBuilder('post', '/test-cases/default-tag')
};
//# sourceMappingURL=default-api.js.map