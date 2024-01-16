/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type {
  DeploymentCreationResponse,
  DeploymentList,
  DeploymentCreationRequest,
  DeploymentBulkModificationResponse,
  DeploymentResponseWithDetails,
  DeploymentModificationRequest,
  DeploymentModificationResponse,
  DeploymentDeletionResponse,
  LogCommonResponse
} from './schema';
/**
 * Representation of the 'DeploymentApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
export declare const DeploymentApi: {
  /**
   * Create deployment. Deprecated, use POST /deployments instead
   * @param configurationId - Configuration identifier
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deploymentCreateDeprecated: (
    configurationId: string
  ) => OpenApiRequestBuilder<DeploymentCreationResponse>;
  /**
   * Retrieve a list of deployments that match the specified filter criteria.
   * Filter criteria include a list of executableIds, a scenarioId, a configurationId, or a deployment status.
   * With top/skip parameters it is possible to paginate the result list.
   * With select parameter it is possible to select only status.
   *
   * @param queryParameters - Object containing the following keys: executableIds, configurationId, scenarioId, status, $top, $skip, $select.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deploymentQuery: (queryParameters?: {
    executableIds?: string[];
    configurationId?: string;
    scenarioId?: string;
    status?:
      | 'PENDING'
      | 'RUNNING'
      | 'COMPLETED'
      | 'DEAD'
      | 'STOPPING'
      | 'STOPPED'
      | 'UNKNOWN';
    $top?: number;
    $skip?: number;
    $select?: 'status';
  }) => OpenApiRequestBuilder<DeploymentList>;
  /**
   * Create a deployment using the configuration specified by configurationId.
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deploymentCreate: (
    body: DeploymentCreationRequest
  ) => OpenApiRequestBuilder<DeploymentCreationResponse>;
  /**
   * Update status of multiple deployments. stop or delete multiple deployments.
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deploymentBatchModify: (
    body: any
  ) => OpenApiRequestBuilder<DeploymentBulkModificationResponse>;
  /**
   * Retrieve details for execution with deploymentId.
   * @param deploymentId - Deployment identifier
   * @param queryParameters - Object containing the following keys: $select.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deploymentGet: (
    deploymentId: string,
    queryParameters?: {
      $select?: 'status';
    }
  ) => OpenApiRequestBuilder<DeploymentResponseWithDetails>;
  /**
   * Update target status of a deployment to stop a deployment or change the configuration to be used by the deployment. A change of configuration is only allowed for RUNNING and PENDING deployments.
   * @param deploymentId - Deployment identifier
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deploymentModify: (
    deploymentId: string,
    body: DeploymentModificationRequest
  ) => OpenApiRequestBuilder<DeploymentModificationResponse>;
  /**
   * Mark deployment with deploymentId as deleted.
   * @param deploymentId - Deployment identifier
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deploymentDelete: (
    deploymentId: string
  ) => OpenApiRequestBuilder<DeploymentDeletionResponse>;
  /**
   * Retrieve the number of available deployments. The number can be filtered by
   * scenarioId, configurationId, executableIdsList or by deployment status.
   *
   * @param queryParameters - Object containing the following keys: executableIds, configurationId, scenarioId, status.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deploymentCount: (queryParameters?: {
    executableIds?: string[];
    configurationId?: string;
    scenarioId?: string;
    status?:
      | 'PENDING'
      | 'RUNNING'
      | 'COMPLETED'
      | 'DEAD'
      | 'STOPPING'
      | 'STOPPED'
      | 'UNKNOWN';
  }) => OpenApiRequestBuilder<any>;
  /**
   * Retrieve logs of a deployment for getting insight into the deployment results or failures.
   * @param deploymentId - Deployment identifier
   * @param queryParameters - Object containing the following keys: $top, start, end, $order.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4DeploymentsGetLogs: (
    deploymentId: string,
    queryParameters?: {
      $top?: number;
      start?: string;
      end?: string;
      $order?: 'asc' | 'desc';
    }
  ) => OpenApiRequestBuilder<LogCommonResponse>;
};
