/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type {
  ExecutionScheduleList,
  ExecutionScheduleCreationData,
  ExecutionScheduleCreationResponse,
  ExecutionSchedule,
  ExecutionScheduleModificationRequest,
  ExecutionScheduleModificationResponse,
  ExecutionScheduleDeletionResponse
} from './schema';
/**
 * Representation of the 'ExecutionScheduleApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
export declare const ExecutionScheduleApi: {
  /**
   * Retrieve a list of execution schedules that match the specified filter criteria.
   * Filter criteria include executionScheduleStatus or a configurationId.
   * With top/skip parameters it is possible to paginate the result list.
   *
   * @param queryParameters - Object containing the following keys: configurationId, status, $top, $skip.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  executionScheduleQuery: (queryParameters?: {
    configurationId?: string;
    status?: 'ACTIVE' | 'INACTIVE';
    $top?: number;
    $skip?: number;
  }) => OpenApiRequestBuilder<ExecutionScheduleList>;
  /**
   * Create an execution schedule using the configuration specified by configurationId, and schedule.
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  executionScheduleCreate: (
    body: ExecutionScheduleCreationData
  ) => OpenApiRequestBuilder<ExecutionScheduleCreationResponse>;
  /**
   * Retrieve details for execution schedule with executionScheduleId.
   * @param executionScheduleId - Execution Schedule identifier
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  executionScheduleGet: (
    executionScheduleId: string
  ) => OpenApiRequestBuilder<ExecutionSchedule>;
  /**
   * Update details of an execution schedule
   * @param executionScheduleId - Execution Schedule identifier
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  executionScheduleModify: (
    executionScheduleId: string,
    body: ExecutionScheduleModificationRequest
  ) => OpenApiRequestBuilder<ExecutionScheduleModificationResponse>;
  /**
   * Delete the execution schedule with executionScheduleId.
   * @param executionScheduleId - Execution Schedule identifier
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  executionScheduleDelete: (
    executionScheduleId: string
  ) => OpenApiRequestBuilder<ExecutionScheduleDeletionResponse>;
  /**
   * Retrieve the number of scheduled executions. The number can be filtered by
   * configurationId or executionScheduleStatus.
   *
   * @param queryParameters - Object containing the following keys: configurationId, status.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  executionScheduleCount: (queryParameters?: {
    configurationId?: string;
    status?: 'ACTIVE' | 'INACTIVE';
  }) => OpenApiRequestBuilder<any>;
};
