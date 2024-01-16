/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type {
  ArtifactList,
  Name_1,
  ArtifactPostData,
  ArtifactCreationResponse,
  Artifact
} from './schema';
/**
 * Representation of the 'ArtifactApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
export const ArtifactApi = {
  /**
   * Retrieve a list of artifacts that matches the specified filter criteria.
   * Filter criteria include scenario ID, execution ID, an artifact name, artifact kind, or artifact labels.
   * Use top/skip parameters to paginate the result list.
   * Search by substring of artifact name or description, if required.
   *
   * @param queryParameters - Object containing the following keys: scenarioId, executionId, name, kind, artifactLabelSelector, $top, $skip, $search, searchCaseInsensitive, $expand.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  artifactQuery: (queryParameters?: {
    scenarioId?: string;
    executionId?: string;
    name?: Name_1;
    kind?: 'model' | 'dataset' | 'resultset' | 'other';
    artifactLabelSelector?: string[];
    $top?: number;
    $skip?: number;
    $search?: string;
    searchCaseInsensitive?: boolean;
    $expand?: 'scenario';
  }) =>
    new OpenApiRequestBuilder<ArtifactList>('get', '/lm/artifacts', {
      queryParameters
    }),
  /**
   * Register an artifact for use in a configuration, for example a model or a dataset.
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  artifactCreate: (body: ArtifactPostData) =>
    new OpenApiRequestBuilder<ArtifactCreationResponse>(
      'post',
      '/lm/artifacts',
      {
        body
      }
    ),
  /**
   * Retrieve details for artifact with artifactId.
   * @param artifactId - Artifact identifier
   * @param queryParameters - Object containing the following keys: $expand.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  artifactGet: (
    artifactId: string,
    queryParameters?: { $expand?: 'scenario' }
  ) =>
    new OpenApiRequestBuilder<Artifact>('get', '/lm/artifacts/{artifactId}', {
      pathParameters: { artifactId },
      queryParameters
    }),
  /**
   * Retrieve  the number of available artifacts that match the specified filter criteria.
   * Filter criteria include a scenarioId, executionId, an artifact name, artifact kind, or artifact labels.
   * Search by substring of artifact name or description is also possible.
   *
   * @param queryParameters - Object containing the following keys: scenarioId, executionId, name, kind, $search, searchCaseInsensitive, artifactLabelSelector.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  artifactCount: (queryParameters?: {
    scenarioId?: string;
    executionId?: string;
    name?: Name_1;
    kind?: 'model' | 'dataset' | 'resultset' | 'other';
    $search?: string;
    searchCaseInsensitive?: boolean;
    artifactLabelSelector?: string[];
  }) =>
    new OpenApiRequestBuilder<any>('get', '/lm/artifacts/$count', {
      queryParameters
    })
};
