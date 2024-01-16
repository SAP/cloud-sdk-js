/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { AiApiCapabilitiesLogs } from './ai-api-capabilities-logs';
import type { AiApiCapabilitiesBulkUpdates } from './ai-api-capabilities-bulk-updates';
/**
 * Representation of the 'AiApiCapabilities' schema.
 */
export type AiApiCapabilities =
  | {
      /**
       * true-> AI API implementation supports resource groups (Main Tenant scenario), false-> implementation does not support resource groups (Service Tenant scenario)
       * Default: true.
       */
      multitenant?: boolean;
      /**
       * true-> clients can use just one instance (global static models), false-> clients should avoid sharing an instance
       * Default: true.
       */
      shareable?: boolean;
      /**
       * There are static always running endpoints that can be used for inference without the need to do user deployments.
       * Default: true.
       */
      staticDeployments?: boolean;
      /**
       * Services that only support batch inference typically neither allow listing nor creation of deployments. For these, userDeployments == false
       * Default: true.
       */
      userDeployments?: boolean;
      /**
       * Default: true.
       */
      userExecutions?: boolean;
      timeToLiveDeployments?: boolean;
      executionSchedules?: boolean;
      logs?: AiApiCapabilitiesLogs;
      bulkUpdates?: AiApiCapabilitiesBulkUpdates;
    }
  | Record<string, any>;
