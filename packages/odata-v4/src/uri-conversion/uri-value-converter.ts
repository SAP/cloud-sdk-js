import { createUriConverter } from '@sap-cloud-sdk/odata-common/internal';
import { defaultDeSerializers } from '../de-serializers';

export const uriConverter = createUriConverter(defaultDeSerializers);
