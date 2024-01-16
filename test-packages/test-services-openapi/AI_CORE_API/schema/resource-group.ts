/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { ResourceGroupBase } from './resource-group-base';
import type { ResourceGroupLabels } from './resource-group-labels';
/**
 * Representation of the 'ResourceGroup' schema.
 */
export type ResourceGroup =
  | (ResourceGroupBase & {
      /**
       * Timestamp of resource group creation
       * Format: "date-time".
       */
      createdAt?: string;
      labels?: ResourceGroupLabels;
      /**
       * aggregated status of the onboarding process
       */
      status?: 'PROVISIONED' | 'ERROR' | 'PROVISIONING';
      /**
       * status message
       */
      statusMessage?: string;
    })
  | Record<string, any>;
