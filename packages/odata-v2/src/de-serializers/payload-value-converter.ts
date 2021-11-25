/* eslint-disable valid-jsdoc */

import {
  EdmTypeShared,
  DeserializedType,
  DefaultDeSerializers
} from '@sap-cloud-sdk/odata-common/internal';
import { EdmType } from '../edm-types';
import { defaultDeSerializers } from './default-de-serializers';
import { DeSerializers } from './de-serializers';

/**
 * @deprecated - Remove this function before 2.0 beta.
 */
export function edmToTs<T extends EdmType>(
  value: any,
  edmType: EdmTypeShared<'v2'>,
  deSerializers: DeSerializers = defaultDeSerializers
): DeserializedType<DefaultDeSerializers, T> {
  return deSerializers[edmType].deserialize(value);
}

/**
 * @deprecated - Remove this function before 2.0 beta.
 */
export function tsToEdm(
  value: any,
  edmType: EdmTypeShared<'v2'>,
  deSerializers: DeSerializers = defaultDeSerializers
): any {
  return deSerializers[edmType].serialize(value);
}
