/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity } from '../entity';
import { deserializeEntity } from '../entity-deserializer';
import { Constructable } from '../../common';

export function transformReturnValueForUndefined<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
) {
  return builderFn(data);
}

export function transformReturnValueForEntity<ReturnT extends Entity>(
  data: any,
  entityConstructor: Constructable<ReturnT>
): ReturnT {
  return deserializeEntity(
    data.d,
    entityConstructor
  ).setOrInitializeRemoteState() as ReturnT;
}

export function transformReturnValueForEntityList<ReturnT extends Entity>(
  data: any,
  entityConstructor: Constructable<ReturnT>
): ReturnT[] {
  return data.d.results.map(
    entityJson =>
      deserializeEntity(
        entityJson,
        entityConstructor
      ).setOrInitializeRemoteState() as ReturnT
  );
}

export function transformReturnValueForComplexType<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(data.d) as ReturnT;
}

export function transformReturnValueForComplexTypeList<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT[] {
  return data.d.results.map(json => builderFn(json));
}

export function transformReturnValueForEdmType<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(data.d);
}

export function transformReturnValueForEdmTypeList<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT[] {
  return data.d.results.map(builderFn);
}
