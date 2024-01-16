/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CreationResponse2 } from './creation-response-2';
import type { ObjectStoreSecretDeletionResponseMessage } from './object-store-secret-deletion-response-message';
/**
 * Representation of the 'ObjectStoreSecretDeletionResponse' schema.
 */
export type ObjectStoreSecretDeletionResponse =
  | (CreationResponse2 & {
      message?: ObjectStoreSecretDeletionResponseMessage;
    })
  | Record<string, any>;
