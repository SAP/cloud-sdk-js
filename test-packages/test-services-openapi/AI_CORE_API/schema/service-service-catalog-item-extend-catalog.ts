/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { ServiceServicePlanItem } from './service-service-plan-item';
/**
 * Representation of the 'ServiceServiceCatalogItemExtendCatalog' schema.
 */
export type ServiceServiceCatalogItemExtendCatalog =
  | {
      /**
       * if the service is bindable
       */
      bindable?: boolean;
      /**
       * description of the service
       */
      description?: string;
      /**
       * id of the service
       */
      id?: string;
      /**
       * name of the service
       */
      name?: string;
      plans?: ServiceServicePlanItem[];
    }
  | Record<string, any>;
