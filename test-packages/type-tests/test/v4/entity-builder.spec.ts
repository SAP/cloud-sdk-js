import { testService } from '@sap-cloud-sdk/test-services/v4/test-service';

const builder = testService().testEntityApi.entityBuilder();

// $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>
builder.fromJson({ collectionProperty: ['1'] });

// $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>
builder.fromJson({ collectionProperty: null });

// $ExpectError
builder.fromJson({ collectionProperty: [1] });

// $ExpectError
builder.fromJson({ collectionProperty: 1 });
