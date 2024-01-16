/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type {
  GetMetricResourceList,
  StringArray,
  MetricSelectorPermissibleValues,
  DeleteMetricsResponse,
  ExecutionId2
} from './schema';
/**
 * Representation of the 'MetricsApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
export declare const MetricsApi: {
  /**
   * Retrieve metrics, labels, or tags according to filter conditions.
   * One query parameter is mandatory, either execution ID or filter.
   * Use up to 10 execution IDs in a query parameter.
   *
   * @param queryParameters - Object containing the following keys: $filter, executionIds, $select.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  metricsFind: (queryParameters?: {
    $filter?: string;
    executionIds?: StringArray;
    $select?: MetricSelectorPermissibleValues;
  }) => OpenApiRequestBuilder<GetMetricResourceList>;
  /**
   * Update or create metrics, tags, or labels associated with an execution.
   *
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  metricsPatch: (body: any) => OpenApiRequestBuilder<any>;
  /**
   * Delete metrics, tags, or labels associated with an execution.
   * @param queryParameters - Object containing the following keys: executionId.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  metricsDelete: (queryParameters: {
    executionId: ExecutionId2;
  }) => OpenApiRequestBuilder<DeleteMetricsResponse>;
};
