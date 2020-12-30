import { filterFunctionsV4, filterFunctionV4 } from '@sap-cloud-sdk/core';
import { TestEntity } from '@sap-cloud-sdk/test-services/v4/test-service';

// $ExpectType Filter<TestEntity, string>
filterFunctionsV4
  .substring(TestEntity.STRING_PROPERTY, TestEntity.INT_16_PROPERTY)
  .equals('test');

// $ExpectType BooleanFilterFunction<TestEntity>
filterFunctionsV4.contains(TestEntity.STRING_PROPERTY, 'test');

// $ExpectType BooleanFilterFunction<TestEntity>
filterFunctionsV4.hasSubset(TestEntity.COLLECTION_PROPERTY, [1]);

// $ExpectError
filterFunctionsV4.hasSubset(['1'], [1]);

// $ExpectType BooleanFilterFunction<Entity>
filterFunctionV4('fn', 'boolean');

// $ExpectType DateFilterFunction<Entity>
filterFunctionV4('fn', 'datetimeoffset');

// $ExpectType CollectionFilterFunction<Entity, number>
filterFunctionV4('fn', 'int[]');

// $ExpectError
filterFunctionV4('fn', 'int[]').equals(['test']);
