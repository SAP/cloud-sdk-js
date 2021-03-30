/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { SimpleTestEntity } from './simple-test-entity';
export type TestEntity =
  | {
      keyProperty: string;
      stringProperty?: string;
      dateProperty?: string;
      dateTimeProperty?: string;
      int32Property?: number;
      int64Property?: number;
      floatProperty?: number;
      doubleProperty?: number;
      linkedSimpleTestEntity?: SimpleTestEntity;
      linkedSimpleTestEntityCollection?: SimpleTestEntity[];
    }
  | Record<string, any>;
