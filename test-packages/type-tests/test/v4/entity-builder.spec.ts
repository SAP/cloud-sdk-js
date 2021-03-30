import { TestEntity } from '@sap-cloud-sdk/test-services/v4/test-service';

const builder = TestEntity.builder();

// $ExpectType TestEntity
builder.fromJson({ collectionProperty: ['1'] });

// $ExpectType TestEntity
builder.fromJson({ collectionProperty: null });

// $ExpectError
builder.fromJson({ collectionProperty: [1] });

// $ExpectError
builder.fromJson({ collectionProperty: 1 });
