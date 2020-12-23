import { Entity } from '../entity';
import { deserializeEntity } from '../entity-deserializer';
import { Constructable } from '../../odata-common';
import { getSingleResult, getCollectionResult } from './response-data-accessor';

/* eslint-disable valid-jsdoc */

/**
 * @hidden
 */
export function transformReturnValueForUndefinedV2<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
) {
  return builderFn(data);
}
export { transformReturnValueForUndefinedV2 as transformReturnValueForUndefined };

/**
 * @hidden
 */
export function transformReturnValueForEntity<ReturnT extends Entity>(
  data: any,
  entityConstructor: Constructable<ReturnT>
): ReturnT {
  return deserializeEntity(
    getSingleResult(data),
    entityConstructor
  ).setOrInitializeRemoteState() as ReturnT;
}
export { transformReturnValueForEntity as transformReturnValueForEntity };

/**
 * @hidden
 */
export function transformReturnValueForEntityListV2<ReturnT extends Entity>(
  data: any,
  entityConstructor: Constructable<ReturnT>
): ReturnT[] {
  return getCollectionResult(data).map(
    entityJson =>
      deserializeEntity(
        entityJson,
        entityConstructor
      ).setOrInitializeRemoteState() as ReturnT
  );
}
export { transformReturnValueForEntityListV2 as transformReturnValueForEntityList };

/**
 * @hidden
 */
export function transformReturnValueForComplexTypeV2<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(getSingleResult(data)) as ReturnT;
}
export { transformReturnValueForComplexTypeV2 as transformReturnValueForComplexType };

/**
 * @hidden
 */
export function transformReturnValueForComplexTypeListV2<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT[] {
  return getCollectionResult(data).map(json => builderFn(json));
}
export { transformReturnValueForComplexTypeListV2 as transformReturnValueForComplexTypeList };

/**
 * @hidden
 */
export function transformReturnValueForEdmType<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(getSingleResult(data));
}
export { transformReturnValueForEdmType as transformReturnValueForEdmType };

/**
 * @hidden
 */
export function transformReturnValueForEdmTypeListV2<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT[] {
  return getCollectionResult(data).map(builderFn);
}
export { transformReturnValueForEdmTypeListV2 as transformReturnValueForEdmTypeList };
