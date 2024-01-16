/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type {
  ExecutionCreationResponse,
  ExecutionList,
  EnactmentCreationRequest,
  ExecutionBulkModificationResponse,
  ExecutionResponseWithDetails,
  ExecutionModificationRequest,
  ExecutionModificationResponse,
  ExecutionDeletionResponse,
  LogCommonResponse
} from './schema';
/**
 * Representation of the 'ExecutionApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
export const ExecutionApi = {
  /**
   * Trigger execution. Deprecated. Use POST /executions instead
   * @param configurationId - Configuration identifier
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  executionCreateDeprecated: (configurationId: string) =>
    new OpenApiRequestBuilder<ExecutionCreationResponse>(
      'post',
      '/lm/configurations/{configurationId}/executions',
      {
        pathParameters: { configurationId }
      }
    ),
  /**
   * Retrieve a list of executions that match the specified filter criteria.
   * Filter criteria include a list of executableIds, a scenarioId, a configurationId, or a execution status.
   * With top/skip parameters it is possible to paginate the result list.
   * With select parameter it is possible to select only status.
   *
   * @param queryParameters - Object containing the following keys: executableIds, configurationId, scenarioId, executionScheduleId, status, $top, $skip, $select.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  executionQuery: (queryParameters?: {
    executableIds?: string[];
    configurationId?: string;
    scenarioId?: string;
    executionScheduleId?: string;
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
  }) =>
    new OpenApiRequestBuilder<ExecutionList>('get', '/lm/executions', {
      queryParameters
    }),
  /**
   * Create an execution using the configuration specified by configurationId.
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  executionCreate: (body: EnactmentCreationRequest) =>
    new OpenApiRequestBuilder<ExecutionCreationResponse>(
      'post',
      '/lm/executions',
      {
        body
      }
    ),
  /**
   * Patch multiple executions' status to stopped or deleted.
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  executionBatchModify: (body: any) =>
    new OpenApiRequestBuilder<ExecutionBulkModificationResponse>(
      'patch',
      '/lm/executions',
      {
        body
      }
    ),
  /**
   * Retrieve details for execution with executionId.
   * @param executionId - Execution identifier
   * @param queryParameters - Object containing the following keys: $select.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  executionGet: (
    executionId: string,
    queryParameters?: { $select?: 'status' }
  ) =>
    new OpenApiRequestBuilder<ExecutionResponseWithDetails>(
      'get',
      '/lm/executions/{executionId}',
      {
        pathParameters: { executionId },
        queryParameters
      }
    ),
  /**
   * Update target status of the execution to stop an execution.
   * @param executionId - Execution identifier
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  executionModify: (executionId: string, body: ExecutionModificationRequest) =>
    new OpenApiRequestBuilder<ExecutionModificationResponse>(
      'patch',
      '/lm/executions/{executionId}',
      {
        pathParameters: { executionId },
        body
      }
    ),
  /**
   * Mark the execution with executionId as deleted.
   * @param executionId - Execution identifier
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  executionDelete: (executionId: string) =>
    new OpenApiRequestBuilder<ExecutionDeletionResponse>(
      'delete',
      '/lm/executions/{executionId}',
      {
        pathParameters: { executionId }
      }
    ),
  /**
   * Retrieve the number of available executions. The number can be filtered by
   * scenarioId, configurationId, executableIdsList or by execution status.
   *
   * @param queryParameters - Object containing the following keys: executableIds, configurationId, scenarioId, executionScheduleId, status.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  executionCount: (queryParameters?: {
    executableIds?: string[];
    configurationId?: string;
    scenarioId?: string;
    executionScheduleId?: string;
    status?:
      | 'PENDING'
      | 'RUNNING'
      | 'COMPLETED'
      | 'DEAD'
      | 'STOPPING'
      | 'STOPPED'
      | 'UNKNOWN';
  }) =>
    new OpenApiRequestBuilder<any>('get', '/lm/executions/$count', {
      queryParameters
    }),
  /**
   * Retrieve logs of an execution for getting insight into the execution results or failures.
   * @param executionId - Execution identifier
   * @param queryParameters - Object containing the following keys: $top, start, end, $order.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ExecutionsGetLogs: (
    executionId: string,
    queryParameters?: {
      $top?: number;
      start?: string;
      end?: string;
      $order?: 'asc' | 'desc';
    }
  ) =>
    new OpenApiRequestBuilder<LogCommonResponse>(
      'get',
      '/lm/executions/{executionId}/logs',
      {
        pathParameters: { executionId },
        queryParameters
      }
    )
};
