import { EntityV4 } from '../entity';
import { deserializeEntityV4 } from '../entity-deserializer';
import { Constructable } from '../../odata-common';
import { getSingleResult, getCollectionResult } from './response-data-accessor';
/* eslint-disable valid-jsdoc */

/**
 * @hidden
 */
export function transformReturnValueForUndefinedV4<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
) {
  return builderFn(data);
}

/**
 * @hidden
 */
export function transformReturnValueForEntityV4<ReturnT extends EntityV4>(
  data: any,
  entityConstructor: Constructable<ReturnT>
): ReturnT {
  return deserializeEntityV4(
    getSingleResult(data),
    entityConstructor
  ).setOrInitializeRemoteState() as ReturnT;
}

/**
 * @hidden
 */
export function transformReturnValueForEntityListV4<ReturnT extends EntityV4>(
  data: any,
  entityConstructor: Constructable<ReturnT>
): ReturnT[] {
  return getCollectionResult(data).map(
    entityJson =>
      deserializeEntityV4(
        entityJson,
        entityConstructor
      ).setOrInitializeRemoteState() as ReturnT
  );
}

/**
 * @hidden
 */
export function transformReturnValueForComplexTypeV4<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(getSingleResult(data)) as ReturnT;
}

/**
 * @hidden
 */
export function transformReturnValueForComplexTypeListV4<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT[] {
  return getCollectionResult(data).map(json => builderFn(json));
}

/**
 * @hidden
 */
export function transformReturnValueForEdmTypeV4<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(getSingleResult(data));
}

/**
 * @hidden
 */
export function transformReturnValueForEdmTypeListV4<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT[] {
  return getCollectionResult(data).map(builderFn);
}
