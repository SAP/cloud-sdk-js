/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { ExecutionModificationRequestList } from './execution-modification-request-list';
/**
 * Request object to change status of multiple executions
 */
export type ExecutionBulkModificationRequest =
  | {
      executions?: ExecutionModificationRequestList;
    }
  | Record<string, any>;
