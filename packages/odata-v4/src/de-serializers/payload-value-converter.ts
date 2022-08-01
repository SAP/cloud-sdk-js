import { EdmTypeShared } from '@sap-cloud-sdk/odata-common';
import { DeSerializers } from './de-serializers';

/**
 * Convert a value with edm format to one with typescript format. This function is typically used when deserializing an OData response.
 * @param value - The original value with edm format.
 * @param edmType - The edm type of that value.
 * @param deSerializers - (De-)serializers used for transformation.
 * @returns Deserialized value.
 */
export function edmToTs(
  value: any,
  edmType: EdmTypeShared<'v4'>,
  deSerializers: DeSerializers
): any {
  return deSerializers[edmType].deserialize(value);
}

/**
 * @internal
 */
export function tsToEdm(
  value: any,
  edmType: EdmTypeShared<'v4'>,
  deSerializers: DeSerializers
): any {
  return deSerializers[edmType].serialize(value);
}
