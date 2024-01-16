/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { ServiceServicePlanItemMetadata } from './service-service-plan-item-metadata';
/**
 * Representation of the 'ServiceServicePlanItem' schema.
 */
export type ServiceServicePlanItem =
  | {
      /**
       * description of the service plan
       */
      description?: string;
      /**
       * if the service plan free
       */
      free?: boolean;
      /**
       * id of the service plan
       */
      id?: string;
      /**
       * name of the service plan
       */
      name?: string;
      metadata?: ServiceServicePlanItemMetadata;
    }
  | Record<string, any>;
