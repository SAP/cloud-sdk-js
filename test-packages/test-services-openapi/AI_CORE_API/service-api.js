"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceApi = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'ServiceApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
exports.ServiceApi = {
    /**
     * Retrieve a list of services for a given main tenant.
     *
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4AiservicesGetAll: () => new openapi_1.OpenApiRequestBuilder('get', '/admin/services'),
    /**
     * Get an service of a given main tenant.
     *
     * @param serviceName - Name of the Service
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4AiservicesGet: (serviceName) => new openapi_1.OpenApiRequestBuilder('get', '/admin/services/{serviceName}', {
        pathParameters: { serviceName }
    })
};
//# sourceMappingURL=service-api.js.map