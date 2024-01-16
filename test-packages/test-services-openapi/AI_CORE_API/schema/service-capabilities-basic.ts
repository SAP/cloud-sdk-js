/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * Basic capabilities like creating deployments and executions.
 */
export type ServiceCapabilitiesBasic =
  | {
      /**
       * There are static always running endpoints that can be used for inference without the need to do user deployments.
       */
      staticDeployments?: boolean;
      /**
       * Services that only support batch inference typically neither allow listing nor creation of deployments. For these, userDeployments == false
       */
      userDeployments?: boolean;
      /**
       * Services that only support deployment typically neither allow create executions. For these, createExecutions == false
       */
      createExecutions?: boolean;
      /**
       * true-> AI API implementation supports resource groups (Main Tenant scenario), false-> implementation does not support resource groups (Service Tenant scenario)
       */
      multitenant?: boolean;
    }
  | Record<string, any>;
