/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CreationResponse2 } from './creation-response-2';
import type { ArgoCDRepositoryCreationResponseMessage } from './argo-cd-repository-creation-response-message';
/**
 * Representation of the 'ArgoCDRepositoryCreationResponse' schema.
 */
export type ArgoCDRepositoryCreationResponse =
  | (CreationResponse2 & {
      message?: ArgoCDRepositoryCreationResponseMessage;
    })
  | Record<string, any>;
