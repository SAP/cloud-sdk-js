/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { SimpleTestEntity } from './simple-test-entity';
import type { OtherSimpleTestEntity } from './other-simple-test-entity';
/**
 * Representation of the 'DiscriminatorEntityWithMapping' schema.
 */
export type DiscriminatorEntityWithMapping =
  | ({
      stringProperty: 'simple';
    } & SimpleTestEntity)
  | ({
      stringProperty: 'other-simple';
    } & OtherSimpleTestEntity);
