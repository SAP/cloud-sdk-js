/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { filterFunctions, filterFunction } from '@sap-cloud-sdk/core/v4';
import { TestEntity } from '@sap-cloud-sdk/test-services/v4/test-service';

// $ExpectType Filter<TestEntity, string>
filterFunctions
  .substring(TestEntity.STRING_PROPERTY, TestEntity.INT_16_PROPERTY)
  .equals('test');

// $ExpectType BooleanFilterFunction<TestEntity>
filterFunctions.contains(TestEntity.STRING_PROPERTY, 'test');

// $ExpectType BooleanFilterFunction<TestEntity>
filterFunctions.hasSubset(TestEntity.COLLECTION_PROPERTY, [1]);

// $ExpectError
filterFunctions.hasSubset(['1'], [1]);

// $ExpectType BooleanFilterFunction<Entity>
filterFunction('fn', 'boolean');

// $ExpectType DateFilterFunction<Entity>
filterFunction('fn', 'datetimeoffset');

// $ExpectType CollectionFilterFunction<Entity, number>
filterFunction('fn', 'int[]');

// $ExpectError
filterFunction('fn', 'int[]').equals(['test']);
