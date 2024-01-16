/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { ExecutableList, Executable } from './schema';
/**
 * Representation of the 'ExecutableApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
export const ExecutableApi = {
  /**
   * Retrieve a list of executables for a scenario. Filter by version ID, if required.
   *
   * @param scenarioId - Scenario identifier
   * @param queryParameters - Object containing the following keys: versionId.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  executableQuery: (
    scenarioId: string,
    queryParameters?: { versionId?: string }
  ) =>
    new OpenApiRequestBuilder<ExecutableList>(
      'get',
      '/lm/scenarios/{scenarioId}/executables',
      {
        pathParameters: { scenarioId },
        queryParameters
      }
    ),
  /**
   * Retrieve details about an executable identified by executableId belonging
   * to a scenario identified by scenarioId.
   *
   * @param scenarioId - Scenario identifier
   * @param executableId - Executable identifier
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  executableGet: (scenarioId: string, executableId: string) =>
    new OpenApiRequestBuilder<Executable>(
      'get',
      '/lm/scenarios/{scenarioId}/executables/{executableId}',
      {
        pathParameters: { scenarioId, executableId }
      }
    )
};
