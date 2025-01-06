/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { TestEntity } from './test-entity';
/**
 * Entity with xOf and schema properties at same level. This is normalized to only xOf with schema properties inside xOf. Also works if only additionalProperties true is used.
 */
export type EntityXOfNormalizedWithObject =
  | TestEntity
  | ({
      booleanProperty: boolean;
    } & Record<string, any>);
