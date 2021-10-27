import { TestEntity } from '@sap-cloud-sdk/test-services/v4/test-service';
import {filterFunction, filterFunctions} from "@sap-cloud-sdk/odata-v4";

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
