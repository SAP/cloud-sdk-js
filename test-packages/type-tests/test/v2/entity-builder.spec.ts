import { TestEntity } from '@sap-cloud-sdk/test-services/v2/test-service';

const builder = TestEntity.builder();

// $ExpectError
builder.keyPropertyString(undefined);

// $ExpectError
builder.keyPropertyGuid(null);

// $ExpectType EntityBuilderType<TestEntity, TestEntityType>
builder.stringProperty(null);

// $ExpectType EntityBuilderType<TestEntity, TestEntityType>
builder.int64Property(undefined);

// $ExpectType TestEntity
builder.fromJson({ stringProperty: '1' });

// $ExpectType TestEntity
builder.fromJson({ unknownProperty: '1' });
