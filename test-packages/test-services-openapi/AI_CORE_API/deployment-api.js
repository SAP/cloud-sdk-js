"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeploymentApi = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'DeploymentApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
exports.DeploymentApi = {
    /**
     * Create deployment. Deprecated, use POST /deployments instead
     * @param configurationId - Configuration identifier
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deploymentCreateDeprecated: (configurationId) => new openapi_1.OpenApiRequestBuilder('post', '/lm/configurations/{configurationId}/deployments', {
        pathParameters: { configurationId }
    }),
    /**
     * Retrieve a list of deployments that match the specified filter criteria.
     * Filter criteria include a list of executableIds, a scenarioId, a configurationId, or a deployment status.
     * With top/skip parameters it is possible to paginate the result list.
     * With select parameter it is possible to select only status.
     *
     * @param queryParameters - Object containing the following keys: executableIds, configurationId, scenarioId, status, $top, $skip, $select.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deploymentQuery: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/lm/deployments', {
        queryParameters
    }),
    /**
     * Create a deployment using the configuration specified by configurationId.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deploymentCreate: (body) => new openapi_1.OpenApiRequestBuilder('post', '/lm/deployments', {
        body
    }),
    /**
     * Update status of multiple deployments. stop or delete multiple deployments.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deploymentBatchModify: (body) => new openapi_1.OpenApiRequestBuilder('patch', '/lm/deployments', {
        body
    }),
    /**
     * Retrieve details for execution with deploymentId.
     * @param deploymentId - Deployment identifier
     * @param queryParameters - Object containing the following keys: $select.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deploymentGet: (deploymentId, queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/lm/deployments/{deploymentId}', {
        pathParameters: { deploymentId },
        queryParameters
    }),
    /**
     * Update target status of a deployment to stop a deployment or change the configuration to be used by the deployment. A change of configuration is only allowed for RUNNING and PENDING deployments.
     * @param deploymentId - Deployment identifier
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deploymentModify: (deploymentId, body) => new openapi_1.OpenApiRequestBuilder('patch', '/lm/deployments/{deploymentId}', {
        pathParameters: { deploymentId },
        body
    }),
    /**
     * Mark deployment with deploymentId as deleted.
     * @param deploymentId - Deployment identifier
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deploymentDelete: (deploymentId) => new openapi_1.OpenApiRequestBuilder('delete', '/lm/deployments/{deploymentId}', {
        pathParameters: { deploymentId }
    }),
    /**
     * Retrieve the number of available deployments. The number can be filtered by
     * scenarioId, configurationId, executableIdsList or by deployment status.
     *
     * @param queryParameters - Object containing the following keys: executableIds, configurationId, scenarioId, status.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deploymentCount: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/lm/deployments/$count', {
        queryParameters
    }),
    /**
     * Retrieve logs of a deployment for getting insight into the deployment results or failures.
     * @param deploymentId - Deployment identifier
     * @param queryParameters - Object containing the following keys: $top, start, end, $order.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4DeploymentsGetLogs: (deploymentId, queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/lm/deployments/{deploymentId}/logs', {
        pathParameters: { deploymentId },
        queryParameters
    })
};
//# sourceMappingURL=deployment-api.js.map