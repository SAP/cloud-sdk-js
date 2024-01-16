/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CreationResponse2 } from './creation-response-2';
import type { ObjectStoreSecretModificationResponseMessage } from './object-store-secret-modification-response-message';
/**
 * Representation of the 'ObjectStoreSecretModificationResponse' schema.
 */
export type ObjectStoreSecretModificationResponse =
  | (CreationResponse2 & {
      message?: ObjectStoreSecretModificationResponseMessage;
    })
  | Record<string, any>;
