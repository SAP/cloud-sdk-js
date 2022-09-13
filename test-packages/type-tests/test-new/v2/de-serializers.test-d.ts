import { mergeDefaultDeSerializersWith } from '@sap-cloud-sdk/odata-v2/internal';
import { temporalDeSerializersV2 } from '@sap-cloud-sdk/temporal-de-serializers';
import {CustomDeSerializerV2, customTestDeSerializers} from "./batch.test-d";
import {expectType} from "tsd";
import {CustomDeSerializers} from "@sap-cloud-sdk/odata-v2";


expectType<CustomDeSerializers<Partial<CustomDeSerializerV2>>>(mergeDefaultDeSerializersWith(customTestDeSerializers));

expectType<CustomDeSerializers<Partial<typeof temporalDeSerializersV2>>>(mergeDefaultDeSerializersWith(temporalDeSerializersV2));
