/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { TestEntity } from './test-entity';
/**
 * Composition of extended properties (inheritance) and schema-specific properties together with required attribute.
 */
export type EntityXOfInheritance = TestEntity & {
  booleanProperty: boolean;
  integerProperty2?: number;
} & Record<string, any>;
