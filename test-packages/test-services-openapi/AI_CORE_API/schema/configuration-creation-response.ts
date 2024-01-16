/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CreationResponse } from './creation-response';
import type { ConfigurationCreationResponseMessage } from './configuration-creation-response-message';
/**
 * Representation of the 'ConfigurationCreationResponse' schema.
 */
export type ConfigurationCreationResponse =
  | (CreationResponse & {
      message?: ConfigurationCreationResponseMessage;
    })
  | Record<string, any>;
