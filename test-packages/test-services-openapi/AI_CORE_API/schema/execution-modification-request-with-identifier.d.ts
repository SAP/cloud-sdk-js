/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { ExecutionId } from './execution-id';
/**
 * Request object for changing the target status of an execution (currently STOPPED and DELETED are supported)
 */
export type ExecutionModificationRequestWithIdentifier =
  | {
      id: ExecutionId;
      /**
       * Desired target status of the execution (currently STOPPED and DELETED are supported)
       */
      targetStatus: 'STOPPED' | 'DELETED';
    }
  | Record<string, any>;
