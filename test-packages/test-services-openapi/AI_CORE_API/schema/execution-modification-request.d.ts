/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
/**
 * Request object for changing the target status of an execution (currently only STOPPED is supported)
 */
export type ExecutionModificationRequest =
  | {
      /**
       * Desired target status of the execution (currently only STOPPED is supported)
       */
      targetStatus: 'STOPPED';
    }
  | Record<string, any>;
