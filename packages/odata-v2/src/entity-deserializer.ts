import { EdmTypeShared } from '@sap-cloud-sdk/odata-common/internal';
import { EdmToPrimitive } from './de-serializers/payload-value-converter';
import { EdmType } from './edm-types';

/**
 * Entity deserializer instance for v2 entities.
 * See [[EntityDeserializer]] for the provided methods.
 * @internal
 */
// export const entityDeserializer: EntityDeserializer = entityDeserializerBase(
//   {},
//   edmToTs,
//   extractODataEtag,
//   getLinkedCollectionResult,
//   defaultDeSerializers
// );

// /**
//  * @internal
//  */
// export const deserializeEntity = entityDeserializer.deserializeEntity;
// export const deserializeComplexType = entityDeserializer.deserializeComplexType;

/**
 * @internal
 */
/**
 * @internal
 */
export type EdmToTsType<EdmT extends EdmType = any> = (
  value: any,
  edmType: EdmTypeShared<'v2'>
) => EdmToPrimitive<EdmT>;
