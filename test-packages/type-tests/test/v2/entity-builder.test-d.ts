import {
  TestEntity,
  testService
} from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import { expectError, expectType } from 'tsd';
import { EntityBuilderType } from '@sap-cloud-sdk/odata-common';
import { DefaultDeSerializerV2 } from '../duplicated-types';

const builder = testService().testEntityApi.entityBuilder();

expectError<any>(builder.keyPropertyString(undefined));

expectError<any>(builder.keyPropertyGuid(null));

expectType<EntityBuilderType<TestEntity, DefaultDeSerializerV2>>(
  builder.stringProperty(null)
);

expectType<EntityBuilderType<TestEntity, DefaultDeSerializerV2>>(
  builder.int64Property(undefined)
);

expectType<TestEntity<DefaultDeSerializerV2>>(
  builder.fromJson({ stringProperty: '1' })
);

expectType<TestEntity<DefaultDeSerializerV2>>(
  builder.fromJson({ unknownProperty: '1' })
);

expectType<TestEntity<DefaultDeSerializerV2>>(
  builder.fromJson({ stringProperty: null })
);

expectType<TestEntity<DefaultDeSerializerV2>>(
  builder.fromJson({ stringProperty: undefined })
);

expectError<any>(builder.fromJson({ stringProperty: 1 }));

// <!--------- single link starts --------->
expectType<TestEntity<DefaultDeSerializerV2>>(
  builder.fromJson({
    toSingleLink: null
  })
);

expectType<TestEntity<DefaultDeSerializerV2>>(
  builder.fromJson({
    toSingleLink: undefined
  })
);

expectType<TestEntity<DefaultDeSerializerV2>>(
  builder.fromJson({
    toSingleLink: {
      stringProperty: ''
    }
  })
);

expectType<TestEntity<DefaultDeSerializerV2>>(
  builder.fromJson({
    toSingleLink: {
      unknownProperty: ''
    }
  })
);

expectError<any>(
  builder.fromJson({
    toSingleLink: {
      stringProperty: 1
    }
  })
);

// <!--------- nested single link starts --------->
expectType<TestEntity<DefaultDeSerializerV2>>(
  builder.fromJson({
    toSingleLink: {
      toSingleLink: null
    }
  })
);

expectType<TestEntity<DefaultDeSerializerV2>>(
  builder.fromJson({
    toSingleLink: {
      toSingleLink: undefined
    }
  })
);

expectType<TestEntity<DefaultDeSerializerV2>>(
  builder.fromJson({
    toSingleLink: {
      toSingleLink: {
        stringProperty: ''
      }
    }
  })
);

expectType<TestEntity<DefaultDeSerializerV2>>(
  builder.fromJson({
    toSingleLink: {
      toSingleLink: {
        unknownProperty: ''
      }
    }
  })
);

expectError<any>(
  builder.fromJson({
    toSingleLink: {
      stringProperty: 1
    }
  })
);

// <!--------- multi link starts --------->
expectType<TestEntity<DefaultDeSerializerV2>>(
  builder.fromJson({
    toMultiLink: []
  })
);

expectType<TestEntity<DefaultDeSerializerV2>>(
  builder.fromJson({
    toMultiLink: [
      {
        stringProperty: ''
      }
    ]
  })
);

expectType<TestEntity<DefaultDeSerializerV2>>(
  builder.fromJson({
    toMultiLink: [
      {
        unknownProperty: ''
      }
    ]
  })
);

expectError<any>(
  builder.fromJson({
    toMultiLink: [
      {
        stringProperty: 1
      }
    ]
  })
);

expectError<any>(
  builder.fromJson({
    toMultiLink: [1]
  })
);

// <!--------- nested multi link starts --------->
expectType<TestEntity<DefaultDeSerializerV2>>(
  builder.fromJson({
    toMultiLink: [
      {
        toMultiLink: []
      }
    ]
  })
);

expectType<TestEntity<DefaultDeSerializerV2>>(
  builder.fromJson({
    toMultiLink: [
      {
        toMultiLink: [
          {
            stringProperty: ''
          }
        ]
      }
    ]
  })
);

expectType<TestEntity<DefaultDeSerializerV2>>(
  builder.fromJson({
    toMultiLink: [
      {
        toMultiLink: [
          {
            unknownProperty: ''
          }
        ]
      }
    ]
  })
);

expectError<any>(
  builder.fromJson({
    toMultiLink: [
      {
        toMultiLink: [
          {
            stringProperty: 1
          }
        ]
      }
    ]
  })
);

expectError<any>(
  builder.fromJson({
    toMultiLink: [
      {
        toMultiLink: [1]
      }
    ]
  })
);
