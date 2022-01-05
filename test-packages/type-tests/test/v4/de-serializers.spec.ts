import { mergeDefaultDeSerializersWith } from '@sap-cloud-sdk/odata-v4/internal';
import { temporalDeSerializers_v4 } from '@sap-cloud-sdk/temporal-middleware';

const customDeSerializers = {
  'Edm.String': {
    serialize: () => '3',
    deserialize: () => 3
  }
};

// $ExpectType CustomDeSerializers<Partial<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, number, any, Moment, Moment, Duration, Time, any>>>
mergeDefaultDeSerializersWith(customDeSerializers);

// $ExpectType CustomDeSerializers<Partial<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, PlainDate, ZonedDateTime, Duration, PlainTime, any>>>
mergeDefaultDeSerializersWith(temporalDeSerializers_v4);
