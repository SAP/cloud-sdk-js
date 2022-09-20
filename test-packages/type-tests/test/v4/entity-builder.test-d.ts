import {
  testService,
  TestEntity
} from '@sap-cloud-sdk/test-services-odata-v4/test-service';
import { expectError, expectType } from 'tsd';
import { DefaultDeSerializersV4 } from '../duplicated-types';

const builder = testService().testEntityApi.entityBuilder();

expectType<TestEntity<DefaultDeSerializersV4>>(
  builder.fromJson({ collectionProperty: ['1'] })
);

expectType<TestEntity<DefaultDeSerializersV4>>(
  builder.fromJson({ collectionProperty: null })
);

expectError<any>(builder.fromJson({ collectionProperty: [1] }));

expectError<any>(builder.fromJson({ collectionProperty: 1 }));
