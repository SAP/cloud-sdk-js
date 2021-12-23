import { testService } from '@sap-cloud-sdk/test-services/v4/test-service';
import { filterFunction, filterFunctions } from '@sap-cloud-sdk/odata-v4';

const testEntitySchema = testService().testEntityApi.schema;

// $ExpectType Filter<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, any, string>
filterFunctions()
  .substring(testEntitySchema.STRING_PROPERTY, testEntitySchema.INT_16_PROPERTY)
  .equals('test');

// $ExpectType BooleanFilterFunction<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>
filterFunctions().contains(testEntitySchema.STRING_PROPERTY, 'test');

// $ExpectType BooleanFilterFunction<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>
filterFunctions().hasSubset(testEntitySchema.COLLECTION_PROPERTY, [1]);

// $ExpectError
filterFunctions().hasSubset(['1'], [1]);

// $ExpectType BooleanFilterFunction<Entity>
filterFunction('fn', 'boolean');

// $ExpectType DateFilterFunction<Entity>
filterFunction('fn', 'datetimeoffset');

// $ExpectType CollectionFilterFunction<Entity, number>
filterFunction('fn', 'int[]');

// $ExpectError
filterFunction('fn', 'int[]').equals(['test']);
