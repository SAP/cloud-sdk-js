"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceApi = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'ResourceApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
exports.ResourceApi = {
    /**
     * Lists all hot spare nodes, used nodes and total nodes corresponding to tenant.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4ResourcesGet: () => new openapi_1.OpenApiRequestBuilder('get', '/admin/resources/nodes'),
    /**
     * Set hot spare nodes corresponding to tenant at main tenant level.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4ResourcesPatch: (body) => new openapi_1.OpenApiRequestBuilder('patch', '/admin/resources/nodes', {
        body
    })
};
//# sourceMappingURL=resource-api.js.map