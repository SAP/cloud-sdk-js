"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutableApi = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'ExecutableApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
exports.ExecutableApi = {
    /**
     * Retrieve a list of executables for a scenario. Filter by version ID, if required.
     *
     * @param scenarioId - Scenario identifier
     * @param queryParameters - Object containing the following keys: versionId.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    executableQuery: (scenarioId, queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/lm/scenarios/{scenarioId}/executables', {
        pathParameters: { scenarioId },
        queryParameters
    }),
    /**
     * Retrieve details about an executable identified by executableId belonging
     * to a scenario identified by scenarioId.
     *
     * @param scenarioId - Scenario identifier
     * @param executableId - Executable identifier
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    executableGet: (scenarioId, executableId) => new openapi_1.OpenApiRequestBuilder('get', '/lm/scenarios/{scenarioId}/executables/{executableId}', {
        pathParameters: { scenarioId, executableId }
    })
};
//# sourceMappingURL=executable-api.js.map