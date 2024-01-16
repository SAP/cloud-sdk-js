"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsApi = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'MetricsApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
exports.MetricsApi = {
    /**
     * Retrieve metrics, labels, or tags according to filter conditions.
     * One query parameter is mandatory, either execution ID or filter.
     * Use up to 10 execution IDs in a query parameter.
     *
     * @param queryParameters - Object containing the following keys: $filter, executionIds, $select.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    metricsFind: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/lm/metrics', {
        queryParameters
    }),
    /**
     * Update or create metrics, tags, or labels associated with an execution.
     *
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    metricsPatch: (body) => new openapi_1.OpenApiRequestBuilder('patch', '/lm/metrics', {
        body
    }),
    /**
     * Delete metrics, tags, or labels associated with an execution.
     * @param queryParameters - Object containing the following keys: executionId.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    metricsDelete: (queryParameters) => new openapi_1.OpenApiRequestBuilder('delete', '/lm/metrics', {
        queryParameters
    })
};
//# sourceMappingURL=metrics-api.js.map