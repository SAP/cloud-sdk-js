/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CreationResponse2 } from './creation-response-2';
import type { ArgoCDApplicationRefreshResponseMessage } from './argo-cd-application-refresh-response-message';
/**
 * Representation of the 'ArgoCDApplicationRefreshResponse' schema.
 */
export type ArgoCDApplicationRefreshResponse =
  | (CreationResponse2 & {
      message?: ArgoCDApplicationRefreshResponseMessage;
    })
  | Record<string, any>;
