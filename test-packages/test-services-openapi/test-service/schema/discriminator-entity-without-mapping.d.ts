/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { SimpleTestEntity } from './simple-test-entity';
import type { TestEntity } from './test-entity';
/**
 * Representation of the 'DiscriminatorEntityWithoutMapping' schema.
 */
export type DiscriminatorEntityWithoutMapping =
  | ({
      stringProperty: 'SimpleTestEntity';
    } & SimpleTestEntity)
  | ({
      stringProperty: 'TestEntity';
    } & TestEntity);
