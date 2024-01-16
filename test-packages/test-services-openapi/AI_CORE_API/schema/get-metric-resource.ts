/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { MetricResource } from './metric-resource';
import type { GetMetricList } from './get-metric-list';
/**
 * Representation of the 'GetMetricResource' schema.
 */
export type GetMetricResource =
  | (MetricResource & {
      metrics?: GetMetricList;
    })
  | Record<string, any>;
