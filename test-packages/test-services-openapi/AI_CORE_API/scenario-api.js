"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenarioApi = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'ScenarioApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
exports.ScenarioApi = {
    /**
     * Retrieve a list of all available scenarios.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    scenarioQuery: () => new openapi_1.OpenApiRequestBuilder('get', '/lm/scenarios'),
    /**
     * Retrieve details for a scenario specified by scenarioId.
     * @param scenarioId - Scenario identifier
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    scenarioGet: (scenarioId) => new openapi_1.OpenApiRequestBuilder('get', '/lm/scenarios/{scenarioId}', {
        pathParameters: { scenarioId }
    }),
    /**
     * Retrieve a list of scenario versions based on the versions of executables
     * available within that scenario.
     *
     * @param scenarioId - Scenario identifier
     * @param queryParameters - Object containing the following keys: labelSelector.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    scenarioQueryVersions: (scenarioId, queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/lm/scenarios/{scenarioId}/versions', {
        pathParameters: { scenarioId },
        queryParameters
    })
};
//# sourceMappingURL=scenario-api.js.map