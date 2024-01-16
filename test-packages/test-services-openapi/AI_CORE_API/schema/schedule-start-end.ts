/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * Start and end an execution schedule.
 */
export type ScheduleStartEnd =
  | {
      /**
       * Timestamp, defining when the executions should start running periodically, defaults to now
       * Format: "date-time".
       */
      start?: string;
      /**
       * Timestamp, defining when the executions should stop running
       * Format: "date-time".
       */
      end?: string;
    }
  | Record<string, any>;
