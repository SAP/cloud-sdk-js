/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { ResultSet, ArrayOfColumnNames } from './schema';
/**
 * Representation of the 'KPIApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
export const KPIApi = {
  /**
   * Retrieve the number of executions, artifacts, and deployments
   * for each resource group, scenario, and executable. The columns to be returned can be specified in a query parameter.
   *
   * @param queryParameters - Object containing the following keys: $select.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kpiGet: (queryParameters?: { $select?: ArrayOfColumnNames }) =>
    new OpenApiRequestBuilder<ResultSet>('get', '/analytics/kpis', {
      queryParameters
    })
};
