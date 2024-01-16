/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CreationResponse } from './creation-response';
import type { ExecutionScheduleCreationResponseMessage } from './execution-schedule-creation-response-message';
/**
 * Representation of the 'ExecutionScheduleCreationResponse' schema.
 */
export type ExecutionScheduleCreationResponse =
  | (CreationResponse & {
      message?: ExecutionScheduleCreationResponseMessage;
    })
  | Record<string, any>;
