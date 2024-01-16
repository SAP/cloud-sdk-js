/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { BackendDetails } from './backend-details';
/**
 * Scaling details of a deployment
 * @example {
 *   "backendDetails": {
 *     "predictor": {
 *       "minReplicas": 0,
 *       "maxReplicas": 2,
 *       "runningReplicas": 1
 *     }
 *   }
 * }
 */
export type ScalingDetails =
  | {
      backendDetails?: BackendDetails;
    }
  | Record<string, any>;
