import { EdmTypeShared } from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from './de-serializers';

/**
 * @internal
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
