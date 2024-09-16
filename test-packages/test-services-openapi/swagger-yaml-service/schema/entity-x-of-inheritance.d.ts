/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { TestEntity } from './test-entity';
/**
 * Representation of the 'EntityXOfInheritance' schema.
 */
export type EntityXOfInheritance = TestEntity & {
  booleanProperty: boolean;
  integerProperty2?: number;
} & Record<string, any>;
