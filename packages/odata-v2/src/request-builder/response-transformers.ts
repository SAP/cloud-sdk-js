import { Constructable } from '@sap-cloud-sdk/odata-common';
import { Entity } from '../entity';
import { deserializeEntity } from '../entity-deserializer';
import { getSingleResult, getCollectionResult } from './response-data-accessor';

/* eslint-disable valid-jsdoc */
/**
 * @internal
 */
export function transformReturnValueForUndefined<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(data);
}

/* eslint-disable valid-jsdoc */
/**
 * @internal
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

/* eslint-disable valid-jsdoc */
/**
 * @internal
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

/* eslint-disable valid-jsdoc */
/**
 * @internal
 */
export function transformReturnValueForComplexType<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(getSingleResult(data)) as ReturnT;
}

/* eslint-disable valid-jsdoc */
/**
 * @internal
 */
export function transformReturnValueForComplexTypeList<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT[] {
  return getCollectionResult(data).map(json => builderFn(json));
}

/* eslint-disable valid-jsdoc */
/**
 * @internal
 */
export function transformReturnValueForEdmType<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(getSingleResult(data));
}

/* eslint-disable valid-jsdoc */
/**
 * @internal
 */
export function transformReturnValueForEdmTypeList<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT[] {
  return getCollectionResult(data).map(builderFn);
}
