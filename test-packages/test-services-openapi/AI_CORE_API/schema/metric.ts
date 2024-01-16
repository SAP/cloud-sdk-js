/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { MetricName } from './metric-name';
import type { MetricValue } from './metric-value';
import type { Timestamp } from './timestamp';
import type { LabelList2 } from './label-list-2';
/**
 * Key-value metrics, where the value is numeric. Metric can also have optional step and label fields.
 */
export type Metric =
  | {
      name: MetricName;
      value: MetricValue;
      timestamp?: Timestamp;
      /**
       * step is an optional integer that represents any measurement of training progress (number of training iterations, number of epochs, and so on) for the metric
       * @example 2
       */
      step?: number;
      labels?: LabelList2;
    }
  | Record<string, any>;
