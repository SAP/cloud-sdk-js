/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { Labeled } from './labeled';
/**
 * Representation of the 'ExecutableBaseData' schema.
 */
export type ExecutableBaseData =
  | (Labeled & {
      /**
       * Name of the executable
       */
      name: string;
      /**
       * Description of the executable
       */
      description?: string;
    })
  | Record<string, any>;
