/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CreationResponse2 } from './creation-response-2';
import type { ArgoCDRepositoryModificationResponseMessage } from './argo-cd-repository-modification-response-message';
/**
 * Representation of the 'ArgoCDRepositoryModificationResponse' schema.
 */
export type ArgoCDRepositoryModificationResponse =
  | (CreationResponse2 & {
      message?: ArgoCDRepositoryModificationResponseMessage;
    })
  | Record<string, any>;
