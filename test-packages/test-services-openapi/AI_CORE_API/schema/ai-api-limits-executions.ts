/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * Representation of the 'AiApiLimitsExecutions' schema.
 */
export type AiApiLimitsExecutions =
  | {
      /**
       * Max nr of executions allowed by this runtime per resource group. <0 means unlimited.
       * Default: -1.
       */
      maxRunningCount?: number;
    }
  | Record<string, any>;
