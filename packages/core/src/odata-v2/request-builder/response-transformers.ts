import { Entity } from '../entity';
import { deserializeEntity } from '../entity-deserializer';
import { Constructable } from '../../odata-common';
import { getSingleResult, getCollectionResult } from './response-data-accessor';

/* eslint-disable valid-jsdoc */

/**
 * @hidden
 */
export function transformReturnValueForUndefined<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(data);
}
export { transformReturnValueForUndefined as transformReturnValueForUndefinedV2 };

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
export { transformReturnValueForEntity as transformReturnValueForEntityV2 };

/**
 * @hidden
 */
export function transformReturnValueForEntityList<ReturnT extends Entity>(
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
export { transformReturnValueForEntityList as transformReturnValueForEntityListV2 };

/**
 * @hidden
 */
export function transformReturnValueForComplexType<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(getSingleResult(data)) as ReturnT;
}
export { transformReturnValueForComplexType as transformReturnValueForComplexTypeV2 };

/**
 * @hidden
 */
export function transformReturnValueForComplexTypeList<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT[] {
  return getCollectionResult(data).map(json => builderFn(json));
}
export { transformReturnValueForComplexTypeList as transformReturnValueForComplexTypeListV2 };

/**
 * @hidden
 */
export function transformReturnValueForEdmType<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(getSingleResult(data));
}
export { transformReturnValueForEdmType as transformReturnValueForEdmTypeV2 };

/**
 * @hidden
 */
export function transformReturnValueForEdmTypeList<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT[] {
  return getCollectionResult(data).map(builderFn);
}
export { transformReturnValueForEdmTypeList as transformReturnValueForEdmTypeListV2 };
