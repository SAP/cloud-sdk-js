/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { LabelName } from './label-name';
/**
 * a classifying phrase/name applied to a metric
 * @example {
 *   "name": "group",
 *   "value": "tree-82"
 * }
 */
export type Label2 =
  | {
      name: LabelName;
      /**
       * Metric Label Value
       * @example "sk_learn_random_forest_model"
       * Max Length: 256.
       * Min Length: 1.
       */
      value: string;
    }
  | Record<string, any>;
