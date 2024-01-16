/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { GenericName2 } from './generic-name-2';
/**
 * A dictionary of name-value pairs to support segregation at execution level.
 * @example {
 *   "name": "Artifact Group",
 *   "value": "RFC-1"
 * }
 */
export type Tag =
  | {
      name: GenericName2;
      /**
       * tag value
       * @example "RFC-1"
       * Max Length: 256.
       * Min Length: 1.
       */
      value: string;
    }
  | Record<string, any>;
