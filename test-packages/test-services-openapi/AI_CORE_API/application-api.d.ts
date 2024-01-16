/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type {
  AllArgoCDApplicationData,
  Body,
  ArgoCDApplicationCreationResponse,
  ArgoCDApplicationStatus,
  ArgoCDApplicationData,
  ArgoCDApplicationBaseData,
  ArgoCDApplicationModificationResponse,
  ArgoCDApplicationDeletionResponse,
  ArgoCDApplicationRefreshResponse
} from './schema';
/**
 * Representation of the 'ApplicationApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
export declare const ApplicationApi: {
  /**
   * Return all Argo CD application data objects.
   *
   * @param queryParameters - Object containing the following keys: $top, $skip, $count.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ApplicationsGetAll: (queryParameters?: {
    $top?: number;
    $skip?: number;
    $count?: boolean;
  }) => OpenApiRequestBuilder<AllArgoCDApplicationData>;
  /**
   * Create an ArgoCD application to synchronise a repository.
   *
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ApplicationsCreate: (
    body: Body
  ) => OpenApiRequestBuilder<ArgoCDApplicationCreationResponse>;
  /**
   * Returns the ArgoCD application health and sync status.
   *
   * @param applicationName - Name of the ArgoCD application
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ApplicationsGetStatus: (
    applicationName: string
  ) => OpenApiRequestBuilder<ArgoCDApplicationStatus>;
  /**
   * Retrieve the ArgoCD application details.
   *
   * @param applicationName - Name of the ArgoCD application
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ApplicationsGet: (
    applicationName: string
  ) => OpenApiRequestBuilder<ArgoCDApplicationData>;
  /**
   * Update the referenced ArgoCD application to synchronize the repository.
   *
   * @param applicationName - Name of the ArgoCD application
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ApplicationsUpdate: (
    applicationName: string,
    body: ArgoCDApplicationBaseData
  ) => OpenApiRequestBuilder<ArgoCDApplicationModificationResponse>;
  /**
   * Delete an ArgoCD application
   * @param applicationName - Name of the ArgoCD application
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ApplicationsDelete: (
    applicationName: string
  ) => OpenApiRequestBuilder<ArgoCDApplicationDeletionResponse>;
  /**
   * Schedules a refresh of the specified application that will be picked up by ArgoCD asynchronously
   *
   * @param applicationName - Name of the ArgoCD application
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ApplicationsRefresh: (
    applicationName: string
  ) => OpenApiRequestBuilder<ArgoCDApplicationRefreshResponse>;
};
