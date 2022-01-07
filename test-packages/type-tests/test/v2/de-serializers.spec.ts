import { mergeDefaultDeSerializersWith } from '@sap-cloud-sdk/odata-v2/internal';
import { temporalDeSerializersV2 } from '@sap-cloud-sdk/temporal-de-serializers';

const customDeSerializers = {
  'Edm.String': {
    serialize: () => '3',
    deserialize: () => 3
  }
};

// $ExpectType CustomDeSerializers<Partial<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, number, any, Moment, Moment, Time>>>
mergeDefaultDeSerializersWith(customDeSerializers);

// $ExpectType CustomDeSerializers<Partial<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, PlainDateTime, ZonedDateTime, PlainTime>>>
mergeDefaultDeSerializersWith(temporalDeSerializersV2);
