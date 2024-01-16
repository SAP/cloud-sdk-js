"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationApi = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'ConfigurationApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
exports.ConfigurationApi = {
    /**
     * Retrieve a list of configurations. Filter results by scenario ID or a list of executable IDs.
     * Search for configurations containing the search string as substring in the configuration name.
     *
     * @param queryParameters - Object containing the following keys: scenarioId, $top, $skip, executableIds, $search, searchCaseInsensitive, $expand.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    configurationQuery: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/lm/configurations', {
        queryParameters
    }),
    /**
     * Create a new configuration linked to a specific scenario and executable for use in an execution
     * or deployment.
     *
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    configurationCreate: (body) => new openapi_1.OpenApiRequestBuilder('post', '/lm/configurations', {
        body
    }),
    /**
     * Retrieve details for configuration with configurationId.
     * @param configurationId - Configuration identifier
     * @param queryParameters - Object containing the following keys: $expand.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    configurationGet: (configurationId, queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/lm/configurations/{configurationId}', {
        pathParameters: { configurationId },
        queryParameters
    }),
    /**
     * Retrieve the number of available configurations that match the specified filter criteria.
     * Filter criteria include a scenarioId or executableIdsList. Search by substring of configuration name is also possible.
     *
     * @param queryParameters - Object containing the following keys: scenarioId, $search, searchCaseInsensitive, executableIds.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    configurationCount: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/lm/configurations/$count', {
        queryParameters
    })
};
//# sourceMappingURL=configuration-api.js.map