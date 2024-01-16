/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type {
  ObjectStoreSecretStatusResponse,
  ObjectStoreSecretWithSensitiveDataRequestForPostCall,
  ObjectStoreSecretCreationResponse,
  ObjectStoreSecretStatus,
  ObjectStoreSecretWithSensitiveDataRequest,
  ObjectStoreSecretModificationResponse,
  ObjectStoreSecretDeletionResponse
} from './schema';
/**
 * Representation of the 'ObjectStoreSecretApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
export const ObjectStoreSecretApi = {
  /**
   * Retrieve a list of metadata of the stored secrets.
   *
   * @param queryParameters - Object containing the following keys: $top, $skip, $count.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ObjectStoreSecretsQuery: (queryParameters?: {
    $top?: number;
    $skip?: number;
    $count?: boolean;
  }) =>
    new OpenApiRequestBuilder<ObjectStoreSecretStatusResponse>(
      'get',
      '/admin/objectStoreSecrets',
      {
        queryParameters
      }
    ),
  /**
   * Create a secret based on the configuration in the request body
   *
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ObjectStoreSecretsCreate: (
    body: ObjectStoreSecretWithSensitiveDataRequestForPostCall
  ) =>
    new OpenApiRequestBuilder<ObjectStoreSecretCreationResponse>(
      'post',
      '/admin/objectStoreSecrets',
      {
        body
      }
    ),
  /**
   * This retrieves the metadata of the stored secret which match the parameter objectStoreName.
   * The fetched secret is constructed like objectStoreName-object-store-secret
   * The base64 encoded field for the stored secret is not returned.
   *
   * @param objectStoreName - Name of the object store for the secret.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ObjectStoreSecretsGet: (objectStoreName: string) =>
    new OpenApiRequestBuilder<ObjectStoreSecretStatus>(
      'get',
      '/admin/objectStoreSecrets/{objectStoreName}',
      {
        pathParameters: { objectStoreName }
      }
    ),
  /**
   * Update a secret with name of objectStoreName if it exists.
   *
   * @param objectStoreName - Name of the object store for the secret.
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ObjectStoreSecretsPatch: (
    objectStoreName: string,
    body: ObjectStoreSecretWithSensitiveDataRequest
  ) =>
    new OpenApiRequestBuilder<ObjectStoreSecretModificationResponse>(
      'patch',
      '/admin/objectStoreSecrets/{objectStoreName}',
      {
        pathParameters: { objectStoreName },
        body
      }
    ),
  /**
   * Delete a secret with the name of objectStoreName if it exists.
   * @param objectStoreName - Name of the object store for the secret.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ObjectStoreSecretsDelete: (objectStoreName: string) =>
    new OpenApiRequestBuilder<ObjectStoreSecretDeletionResponse>(
      'delete',
      '/admin/objectStoreSecrets/{objectStoreName}',
      {
        pathParameters: { objectStoreName }
      }
    )
};
