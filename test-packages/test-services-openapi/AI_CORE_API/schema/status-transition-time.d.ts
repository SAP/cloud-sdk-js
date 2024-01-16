/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
/**
 * Representation of the 'StatusTransitionTime' schema.
 */
export type StatusTransitionTime =
  | {
      /**
       * Timestamp of job submitted
       * Format: "date-time".
       */
      submissionTime?: string;
      /**
       * Timestamp of job status changed to RUNNING
       * Format: "date-time".
       */
      startTime?: string;
      /**
       * Timestamp of job status changed to COMPLETED/DEAD/STOPPED
       * Format: "date-time".
       */
      completionTime?: string;
    }
  | Record<string, any>;
