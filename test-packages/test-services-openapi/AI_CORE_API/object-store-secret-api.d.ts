/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type {
  ObjectStoreSecretStatusResponse,
  ObjectStoreSecretWithSensitiveDataRequestForPostCall,
  ObjectStoreSecretStatus,
  ObjectStoreSecretWithSensitiveDataRequest,
  ObjectStoreSecretModificationResponse,
  ObjectStoreSecretDeletionResponse
} from './schema';
/**
 * Representation of the 'ObjectStoreSecretApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
export declare const ObjectStoreSecretApi: {
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
  }) => OpenApiRequestBuilder<ObjectStoreSecretStatusResponse>;
  /**
   * Create a secret based on the configuration in the request body
   *
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ObjectStoreSecretsCreate: (
    body: ObjectStoreSecretWithSensitiveDataRequestForPostCall
  ) => OpenApiRequestBuilder<any>;
  /**
   * This retrieves the metadata of the stored secret which match the parameter objectStoreName.
   * The fetched secret is constructed like objectStoreName-object-store-secret
   * The base64 encoded field for the stored secret is not returned.
   *
   * @param objectStoreName - Name of the object store for the secret.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ObjectStoreSecretsGet: (
    objectStoreName: string
  ) => OpenApiRequestBuilder<ObjectStoreSecretStatus>;
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
  ) => OpenApiRequestBuilder<ObjectStoreSecretModificationResponse>;
  /**
   * Delete a secret with the name of objectStoreName if it exists.
   * @param objectStoreName - Name of the object store for the secret.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ObjectStoreSecretsDelete: (
    objectStoreName: string
  ) => OpenApiRequestBuilder<ObjectStoreSecretDeletionResponse>;
};
