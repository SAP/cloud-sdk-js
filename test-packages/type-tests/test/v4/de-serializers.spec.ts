import { mergeDefaultDeSerializersWith } from '@sap-cloud-sdk/odata-v4/internal';
import { temporalDeSerializersV4 } from '@sap-cloud-sdk/temporal-de-serializers';
import { customTestDeSerializers } from '../../../../test-resources/test/test-util';

// $ExpectType CustomDeSerializers<Partial<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, number, any, Moment, Moment, Duration, Time, any>>>
mergeDefaultDeSerializersWith(customTestDeSerializers);

// $ExpectType CustomDeSerializers<Partial<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, PlainDate, ZonedDateTime, Duration, PlainTime, any>>>
mergeDefaultDeSerializersWith(temporalDeSerializersV4);
