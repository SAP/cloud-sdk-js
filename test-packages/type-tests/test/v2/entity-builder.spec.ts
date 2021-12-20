import { testService } from '@sap-cloud-sdk/test-services/v2/test-service';

const builder = testService().testEntityApi.entityBuilder();

// $ExpectError
builder.keyPropertyString(undefined);

// $ExpectError
builder.keyPropertyGuid(null);

// $ExpectType EntityBuilderType<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
builder.stringProperty(null);

// $ExpectType EntityBuilderType<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
builder.int64Property(undefined);

// $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
builder.fromJson({ stringProperty: '1' });

// $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
builder.fromJson({ unknownProperty: '1' });

// $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
builder.fromJson({ stringProperty: null });

// $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
builder.fromJson({ stringProperty: undefined });

// $ExpectError
builder.fromJson({ stringProperty: 1 });

// <!--------- single link starts --------->
// $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
builder.fromJson({
  toSingleLink: null
});

// $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
builder.fromJson({
  toSingleLink: undefined
});

// $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
builder.fromJson({
  toSingleLink: {
    stringProperty: ''
  }
});

// $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
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
// $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
builder.fromJson({
  toSingleLink: {
    toSingleLink: null
  }
});

// $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
builder.fromJson({
  toSingleLink: {
    toSingleLink: undefined
  }
});

// $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
builder.fromJson({
  toSingleLink: {
    toSingleLink: {
      stringProperty: ''
    }
  }
});

// $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
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
// $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
builder.fromJson({
  toMultiLink: []
});

// $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
builder.fromJson({
  toMultiLink: [
    {
      stringProperty: ''
    }
  ]
});

// $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
builder.fromJson({
  toMultiLink: [
    {
      unknownProperty: ''
    }
  ]
});

builder.fromJson({
  toMultiLink: [
    {
      stringProperty: 1 // $ExpectError
    }
  ]
});

builder.fromJson({
  toMultiLink: [1] // $ExpectError
});

// <!--------- nested multi link starts --------->
// $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
builder.fromJson({
  toMultiLink: [
    {
      toMultiLink: []
    }
  ]
});
// $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
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
});
// $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
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
});

builder.fromJson({
  toMultiLink: [
    {
      toMultiLink: [
        {
          stringProperty: 1 // $ExpectError
        }
      ]
    }
  ]
});

builder.fromJson({
  toMultiLink: [
    {
      toMultiLink: [1] // $ExpectError
    }
  ]
});
