/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CreationResponse2 } from './creation-response-2';
import type { ArgoCDApplicationModificationResponseMessage } from './argo-cd-application-modification-response-message';
/**
 * Representation of the 'ArgoCDApplicationModificationResponse' schema.
 */
export type ArgoCDApplicationModificationResponse =
  | (CreationResponse2 & {
      message?: ArgoCDApplicationModificationResponseMessage;
    })
  | Record<string, any>;
