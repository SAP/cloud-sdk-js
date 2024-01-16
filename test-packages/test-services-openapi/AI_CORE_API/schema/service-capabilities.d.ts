/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { ServiceCapabilitiesLogs } from './service-capabilities-logs';
import type { ServiceCapabilitiesBasic } from './service-capabilities-basic';
/**
 * Representation of the 'ServiceCapabilities' schema.
 */
export type ServiceCapabilities =
  | {
      logs?: ServiceCapabilitiesLogs;
      basic?: ServiceCapabilitiesBasic;
    }
  | Record<string, any>;
