/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { Cron } from './cron';
import type { ConfigurationId } from './configuration-id';
import type { ScheduleStartEnd } from './schedule-start-end';
/**
 * Representation of the 'ExecutionScheduleCreationData' schema.
 */
export type ExecutionScheduleCreationData =
  | {
      cron: Cron;
      /**
       * Name of the execution schedule
       * Max Length: 256.
       */
      name: string;
      configurationId: ConfigurationId;
    }
  | (Record<string, any> & ScheduleStartEnd);
