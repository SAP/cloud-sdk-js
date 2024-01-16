/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { Timestamp_1 } from './timestamp-1';
import type { Message_1 } from './message-1';
/**
 * Common log record.
 */
export type LogCommonResultItem =
  | {
      timestamp?: Timestamp_1;
      msg?: Message_1;
    }
  | Record<string, any>;
