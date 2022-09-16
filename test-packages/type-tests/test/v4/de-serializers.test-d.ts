import { mergeDefaultDeSerializersWith } from '@sap-cloud-sdk/odata-v4/internal';
import { temporalDeSerializersV4 } from '@sap-cloud-sdk/temporal-de-serializers';
import { expectType } from 'tsd';
import { CustomDeSerializers } from '@sap-cloud-sdk/odata-v4';
import {
  CustomDeSerializerV4,
  customTestDeSerializersV4
} from '../duplicated-types';

expectType<CustomDeSerializers<Partial<CustomDeSerializerV4>>>(
  mergeDefaultDeSerializersWith(customTestDeSerializersV4)
);

expectType<CustomDeSerializers<Partial<typeof temporalDeSerializersV4>>>(
  mergeDefaultDeSerializersWith(temporalDeSerializersV4)
);
