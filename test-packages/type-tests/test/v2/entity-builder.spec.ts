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

// $ExpectType TestEntity
builder.fromJson({ stringProperty: null });

// $ExpectError
builder.fromJson({ stringProperty: 1 });

// $ExpectType TestEntity
builder.fromJson({ collectionProperty: ['1'] });

// $ExpectType TestEntity
builder.fromJson({ collectionProperty: null });

// $ExpectError
builder.fromJson({ collectionProperty: [1] });

// $ExpectError
builder.fromJson({ collectionProperty: 1 });

// // $ExpectType TestEntity
// builder.fromJson({
//   toSingleLink: null
// });
//
// // $ExpectType TestEntity
// builder.fromJson({
//   toSingleLink: {
//     stringProperty: ''
//   }
// });
//
// // $ExpectType TestEntity
// builder.fromJson({
//   toSingleLink: {
//     unknownProperty: ''
//   }
// });
//
// // $ExpectError
// builder.fromJson({
//   toSingleLink: {
//     stringProperty: 1
//   }
// });
//
// // $ExpectType TestEntity
// builder.fromJson({
//   toMultiLink: []
// });
//
// // $ExpectType TestEntity
// builder.fromJson({
//   toMultiLink: [{
//     stringProperty: ''
//   }]
// });
//
// // $ExpectType TestEntity
// builder.fromJson({
//   toMultiLink: [{
//     unknownProperty: ''
//   }]
// });
//
// // $ExpectError
// builder.fromJson({
//   toMultiLink: [{
//     stringProperty: 1
//   }]
// });
//
// // $ExpectError
// builder.fromJson({
//   toMultiLink: [1]
// });
