import { createUriConverter } from '@sap-cloud-sdk/odata-common/internal';
import { defaultDeSerializers } from '../de-serializers';

/**
 * @internal
 */
export const uriConverter = createUriConverter(defaultDeSerializers);
