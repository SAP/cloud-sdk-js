import { TestEntity } from '@sap-cloud-sdk/test-services/v2/test-service';

const builder = TestEntity.builder();

// $ExpectType TestEntity
builder.fromJson({ stringProperty: '1' });

// $ExpectError
builder.fromJson({ unknownProperty: '1' });
