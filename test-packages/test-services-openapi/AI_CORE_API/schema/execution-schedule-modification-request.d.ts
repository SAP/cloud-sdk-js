/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { Schedule } from './schedule';
import type { ConfigurationId } from './configuration-id';
import type { ExecutionScheduleStatus } from './execution-schedule-status';
/**
 * Representation of the 'ExecutionScheduleModificationRequest' schema.
 */
export type ExecutionScheduleModificationRequest =
  | (Schedule & {
      configurationId?: ConfigurationId;
      status?: ExecutionScheduleStatus;
    })
  | Record<string, any>;
