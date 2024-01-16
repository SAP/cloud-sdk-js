/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CreationResponse } from './creation-response';
import type { ExecutionModificationResponseMessage } from './execution-modification-response-message';
/**
 * Representation of the 'ExecutionModificationResponse' schema.
 */
export type ExecutionModificationResponse =
  | (CreationResponse & {
      message?: ExecutionModificationResponseMessage;
    })
  | Record<string, any>;
