/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CreationResponse } from './creation-response';
import type { ExecutionScheduleModificationResponseMessage } from './execution-schedule-modification-response-message';
/**
 * Representation of the 'ExecutionScheduleModificationResponse' schema.
 */
export type ExecutionScheduleModificationResponse =
  | (CreationResponse & {
      message?: ExecutionScheduleModificationResponseMessage;
    })
  | Record<string, any>;
