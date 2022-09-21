import { mergeDefaultDeSerializersWith } from '@sap-cloud-sdk/odata-v2/internal';
import { temporalDeSerializersV2 } from '@sap-cloud-sdk/temporal-de-serializers';
import { expectType } from 'tsd';
import { CustomDeSerializers } from '@sap-cloud-sdk/odata-v2';
import { CustomDeSerializerV2 } from '../duplicated-types';
import { customTestDeSerializers } from './batch.test-d';

expectType<CustomDeSerializers<Partial<CustomDeSerializerV2>>>(
  mergeDefaultDeSerializersWith(customTestDeSerializers)
);

expectType<CustomDeSerializers<Partial<typeof temporalDeSerializersV2>>>(
  mergeDefaultDeSerializersWith(temporalDeSerializersV2)
);
