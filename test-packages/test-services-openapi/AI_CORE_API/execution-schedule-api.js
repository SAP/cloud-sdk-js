"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionScheduleApi = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'ExecutionScheduleApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
exports.ExecutionScheduleApi = {
    /**
     * Retrieve a list of execution schedules that match the specified filter criteria.
     * Filter criteria include executionScheduleStatus or a configurationId.
     * With top/skip parameters it is possible to paginate the result list.
     *
     * @param queryParameters - Object containing the following keys: configurationId, status, $top, $skip.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    executionScheduleQuery: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/lm/executionSchedules', {
        queryParameters
    }),
    /**
     * Create an execution schedule using the configuration specified by configurationId, and schedule.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    executionScheduleCreate: (body) => new openapi_1.OpenApiRequestBuilder('post', '/lm/executionSchedules', {
        body
    }),
    /**
     * Retrieve details for execution schedule with executionScheduleId.
     * @param executionScheduleId - Execution Schedule identifier
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    executionScheduleGet: (executionScheduleId) => new openapi_1.OpenApiRequestBuilder('get', '/lm/executionSchedules/{executionScheduleId}', {
        pathParameters: { executionScheduleId }
    }),
    /**
     * Update details of an execution schedule
     * @param executionScheduleId - Execution Schedule identifier
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    executionScheduleModify: (executionScheduleId, body) => new openapi_1.OpenApiRequestBuilder('patch', '/lm/executionSchedules/{executionScheduleId}', {
        pathParameters: { executionScheduleId },
        body
    }),
    /**
     * Delete the execution schedule with executionScheduleId.
     * @param executionScheduleId - Execution Schedule identifier
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    executionScheduleDelete: (executionScheduleId) => new openapi_1.OpenApiRequestBuilder('delete', '/lm/executionSchedules/{executionScheduleId}', {
        pathParameters: { executionScheduleId }
    }),
    /**
     * Retrieve the number of scheduled executions. The number can be filtered by
     * configurationId or executionScheduleStatus.
     *
     * @param queryParameters - Object containing the following keys: configurationId, status.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    executionScheduleCount: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/lm/executionSchedules/$count', {
        queryParameters
    })
};
//# sourceMappingURL=execution-schedule-api.js.map