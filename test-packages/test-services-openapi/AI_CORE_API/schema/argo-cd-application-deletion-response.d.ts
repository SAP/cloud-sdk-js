/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CreationResponse2 } from './creation-response-2';
import type { ArgoCDApplicationDeletionResponseMessage } from './argo-cd-application-deletion-response-message';
/**
 * Representation of the 'ArgoCDApplicationDeletionResponse' schema.
 */
export type ArgoCDApplicationDeletionResponse =
  | (CreationResponse2 & {
      message?: ArgoCDApplicationDeletionResponseMessage;
    })
  | Record<string, any>;
