/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type {
  ArgoCDRepositoryDataResponse,
  ArgoCDRepositoryData,
  ArgoCDRepositoryCreationResponse,
  ArgoCDRepositoryDetails,
  ArgoCDRepositoryCredentials,
  ArgoCDRepositoryModificationResponse,
  ArgoCDRepositoryDeletionResponse
} from './schema';
/**
 * Representation of the 'RepositoryApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
export const RepositoryApi = {
  /**
   * Retrieve a list of all GitOps repositories for a tenant.
   * @param queryParameters - Object containing the following keys: $top, $skip, $count.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4RepositoriesGetAll: (queryParameters?: {
    $top?: number;
    $skip?: number;
    $count?: boolean;
  }) =>
    new OpenApiRequestBuilder<ArgoCDRepositoryDataResponse>(
      'get',
      '/admin/repositories',
      {
        queryParameters
      }
    ),
  /**
   * On-board a new GitOps repository as specified in the content payload
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4RepositoriesCreate: (body: ArgoCDRepositoryData) =>
    new OpenApiRequestBuilder<ArgoCDRepositoryCreationResponse>(
      'post',
      '/admin/repositories',
      {
        body
      }
    ),
  /**
   * Retrieve the access details for a repository if it exists.
   * @param repositoryName - Name of the repository
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4RepositoriesGet: (repositoryName: string) =>
    new OpenApiRequestBuilder<ArgoCDRepositoryDetails>(
      'get',
      '/admin/repositories/{repositoryName}',
      {
        pathParameters: { repositoryName }
      }
    ),
  /**
   * Update the referenced repository credentials to synchronize a repository.
   *
   * @param repositoryName - Name of the repository
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4RepositoriesUpdate: (
    repositoryName: string,
    body: ArgoCDRepositoryCredentials
  ) =>
    new OpenApiRequestBuilder<ArgoCDRepositoryModificationResponse>(
      'patch',
      '/admin/repositories/{repositoryName}',
      {
        pathParameters: { repositoryName },
        body
      }
    ),
  /**
   * Remove a repository from GitOps.
   * @param repositoryName - Name of the repository
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4RepositoriesDelete: (repositoryName: string) =>
    new OpenApiRequestBuilder<ArgoCDRepositoryDeletionResponse>(
      'delete',
      '/admin/repositories/{repositoryName}',
      {
        pathParameters: { repositoryName }
      }
    )
};
