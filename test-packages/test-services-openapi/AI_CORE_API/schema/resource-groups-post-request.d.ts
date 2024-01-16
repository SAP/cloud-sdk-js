/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { ResourceGroupLabels } from './resource-group-labels';
/**
 * Representation of the 'ResourceGroupsPostRequest' schema.
 */
export type ResourceGroupsPostRequest =
  | {
      /**
       * resource group id
       * Max Length: 253.
       * Min Length: 3.
       * Pattern: "^[a-zA-Z0-9][a-zA-Z0-9.-]{1,251}[a-zA-Z0-9]$".
       */
      resourceGroupId?: string;
      labels?: ResourceGroupLabels;
    }
  | Record<string, any>;
