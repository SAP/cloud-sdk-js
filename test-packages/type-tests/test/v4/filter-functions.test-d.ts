import { testService } from '@sap-cloud-sdk/test-services-odata-v4/test-service';
import type { DateFilterFunction, Entity } from '@sap-cloud-sdk/odata-v4';
import { filterFunction, filterFunctions } from '@sap-cloud-sdk/odata-v4';
import { expectError, expectType } from 'tsd';
import type {
  BooleanFilterFunction,
  CollectionFilterFunction,
  Filter
} from '@sap-cloud-sdk/odata-common';
import type { TestEntity } from '@sap-cloud-sdk/test-services-odata-v4/test-service/TestEntity';
import type { AnyDeSerializerV4 } from '../duplicated-types';

const testEntitySchema = testService().testEntityApi.schema;

expectType<Filter<TestEntity<AnyDeSerializerV4>, any, string>>(
  filterFunctions()
    .substring(
      testEntitySchema.STRING_PROPERTY,
      testEntitySchema.INT_16_PROPERTY
    )
    .equals('test')
);

expectType<BooleanFilterFunction<TestEntity<AnyDeSerializerV4>>>(
  filterFunctions().contains(testEntitySchema.STRING_PROPERTY, 'test')
);

expectType<BooleanFilterFunction<TestEntity<AnyDeSerializerV4>>>(
  filterFunctions().hasSubset(testEntitySchema.COLLECTION_PROPERTY, [1])
);

expectError<any>(filterFunctions().hasSubset(['1'], [1]));

expectType<BooleanFilterFunction<Entity>>(filterFunction('fn', 'boolean'));

expectType<DateFilterFunction<Entity>>(filterFunction('fn', 'datetimeoffset'));

expectType<CollectionFilterFunction<Entity, number>>(
  filterFunction('fn', 'int[]')
);

expectError<any>(filterFunction('fn', 'int[]').equals(['test']));
