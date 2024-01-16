/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { AiApiLimitsExecutions } from './ai-api-limits-executions';
import type { AiApiLimitsDeployments } from './ai-api-limits-deployments';
import type { AiApiLimitsTimeToLiveDeployments } from './ai-api-limits-time-to-live-deployments';
/**
 * Representation of the 'AiApiLimits' schema.
 */
export type AiApiLimits =
  | {
      executions?: AiApiLimitsExecutions;
      deployments?: AiApiLimitsDeployments;
      timeToLiveDeployments?: AiApiLimitsTimeToLiveDeployments;
    }
  | Record<string, any>;
