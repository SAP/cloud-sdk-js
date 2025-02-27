import { mergeDefaultDeSerializersWith } from '@sap-cloud-sdk/odata-v2/internal';
import { temporalDeSerializersV2 } from '@sap-cloud-sdk/temporal-de-serializers';
import { expectType } from 'tsd';
import { customTestDeSerializers } from './batch.test-d';
import type { CustomDeSerializers } from '@sap-cloud-sdk/odata-v2';
import type { CustomDeSerializerV2 } from '../duplicated-types';

expectType<CustomDeSerializers<Partial<CustomDeSerializerV2>>>(
  mergeDefaultDeSerializersWith(customTestDeSerializers)
);

expectType<CustomDeSerializers<Partial<typeof temporalDeSerializersV2>>>(
  mergeDefaultDeSerializersWith(temporalDeSerializersV2)
);
