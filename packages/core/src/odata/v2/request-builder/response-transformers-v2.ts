/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityV2 } from '../entity-v2';
import { deserializeEntityV2 } from '../entity-deserializer';
import { Constructable } from '../../common';
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

/**
 * @hidden
 */
export function transformReturnValueForEntityV2<ReturnT extends EntityV2>(
  data: any,
  entityConstructor: Constructable<ReturnT>
): ReturnT {
  return deserializeEntityV2(
    getSingleResult(data),
    entityConstructor
  ).setOrInitializeRemoteState() as ReturnT;
}

/**
 * @hidden
 */
export function transformReturnValueForEntityListV2<ReturnT extends EntityV2>(
  data: any,
  entityConstructor: Constructable<ReturnT>
): ReturnT[] {
  return getCollectionResult(data).map(
    entityJson =>
      deserializeEntityV2(
        entityJson,
        entityConstructor
      ).setOrInitializeRemoteState() as ReturnT
  );
}

/**
 * @hidden
 */
export function transformReturnValueForComplexTypeV2<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(getSingleResult(data)) as ReturnT;
}

/**
 * @hidden
 */
export function transformReturnValueForComplexTypeListV2<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT[] {
  return getCollectionResult(data).map(json => builderFn(json));
}

/**
 * @hidden
 */
export function transformReturnValueForEdmTypeV2<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(getSingleResult(data));
}

/**
 * @hidden
 */
export function transformReturnValueForEdmTypeListV2<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT[] {
  return getCollectionResult(data).map(builderFn);
}
