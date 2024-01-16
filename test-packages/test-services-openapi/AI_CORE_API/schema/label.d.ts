/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { LabelKey } from './label-key';
import type { LabelValue } from './label-value';
/**
 * Representation of the 'Label' schema.
 */
export type Label =
  | {
      key: LabelKey;
      value: LabelValue;
    }
  | Record<string, any>;
