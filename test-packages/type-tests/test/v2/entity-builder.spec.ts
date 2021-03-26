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

// <!--------- single link starts --------->
// $ExpectType TestEntity
builder.fromJson({
  toSingleLink: null
});

// $ExpectType TestEntity
builder.fromJson({
  toSingleLink: {
    stringProperty: ''
  }
});

// $ExpectType TestEntity
builder.fromJson({
  toSingleLink: {
    unknownProperty: ''
  }
});

builder.fromJson({
  toSingleLink: {
    stringProperty: 1 // $ExpectError
  }
});

// <!--------- nested single link starts --------->
// $ExpectType TestEntity
builder.fromJson({
  toSingleLink: {
    toSingleLink: null
  }
});
// $ExpectType TestEntity
builder.fromJson({
  toSingleLink: {
    toSingleLink: {
      stringProperty: ''
    }
  }
});
// $ExpectType TestEntity
builder.fromJson({
  toSingleLink: {
    toSingleLink: {
      unknownProperty: ''
    }
  }
});

builder.fromJson({
  toSingleLink: {
    stringProperty: 1 // $ExpectError
  }
});

// <!--------- multi link starts --------->
// $ExpectType TestEntity
builder.fromJson({
  toMultiLink: []
});

// $ExpectType TestEntity
builder.fromJson({
  toMultiLink: [{
    stringProperty: ''
  }]
});

// $ExpectType TestEntity
builder.fromJson({
  toMultiLink: [{
    unknownProperty: ''
  }]
});

builder.fromJson({
  toMultiLink: [{
    stringProperty: 1 // $ExpectError
  }]
});

builder.fromJson({
  toMultiLink: [1] // $ExpectError
});

// <!--------- nested multi link starts --------->
// $ExpectType TestEntity
builder.fromJson({
  toMultiLink: [{
    toMultiLink: []
  }]
});
// $ExpectType TestEntity
builder.fromJson({
  toMultiLink: [{
    toMultiLink: [{
      stringProperty: ''
    }]
  }]
});
// $ExpectType TestEntity
builder.fromJson({
  toMultiLink: [{
    toMultiLink: [{
      unknownProperty: ''
    }]
  }]
});

builder.fromJson({
  toMultiLink: [{
    toMultiLink: [{
      stringProperty: 1 // $ExpectError
    }]
  }]
});

builder.fromJson({
  toMultiLink: [{
    toMultiLink: [1] // $ExpectError
  }]
});
