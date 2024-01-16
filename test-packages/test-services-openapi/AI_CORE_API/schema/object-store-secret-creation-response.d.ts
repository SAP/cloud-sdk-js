/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CreationResponseMessage } from './creation-response-message';
import type { ObjectStoreSecretCreationResponseMessage } from './object-store-secret-creation-response-message';
/**
 * Representation of the 'ObjectStoreSecretCreationResponse' schema.
 */
export type ObjectStoreSecretCreationResponse =
  | (CreationResponseMessage & {
      message?: ObjectStoreSecretCreationResponseMessage;
    })
  | Record<string, any>;
