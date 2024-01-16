/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CreationResponse2 } from './creation-response-2';
import type { ArgoCDApplicationCreationResponseMessage } from './argo-cd-application-creation-response-message';
/**
 * Representation of the 'ArgoCDApplicationCreationResponse' schema.
 */
export type ArgoCDApplicationCreationResponse =
  | (CreationResponse2 & {
      message?: ArgoCDApplicationCreationResponseMessage;
    })
  | Record<string, any>;
