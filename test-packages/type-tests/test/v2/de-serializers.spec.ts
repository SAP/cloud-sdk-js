import { mergeDefaultDeSerializersWith } from '@sap-cloud-sdk/odata-v2/internal';
import { temporalDeSerializersV2 } from '@sap-cloud-sdk/temporal-de-serializers';
import { customTestDeSerializers } from '@sap-cloud-sdk/private-test-utils';

// $ExpectType CustomDeSerializers<Partial<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, number, any, Moment, Moment, Time>>>
mergeDefaultDeSerializersWith(customTestDeSerializers);

// $ExpectType CustomDeSerializers<Partial<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, PlainDateTime, ZonedDateTime, PlainTime>>>
mergeDefaultDeSerializersWith(temporalDeSerializersV2);
