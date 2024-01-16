/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { ServiceBrokerSecret } from './service-broker-secret';
import type { ServiceCapabilities } from './service-capabilities';
import type { ServiceServiceCatalog } from './service-service-catalog';
/**
 * Representation of the 'ServiceDetails' schema.
 */
export type ServiceDetails =
  | {
      brokerSecret?: ServiceBrokerSecret;
      capabilities?: ServiceCapabilities;
      serviceCatalog?: ServiceServiceCatalog;
    }
  | Record<string, any>;
