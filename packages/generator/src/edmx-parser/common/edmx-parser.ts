/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { forceArray } from '../../generator-utils';
import {
  EdmxComplexTypeBase,
  EdmxEntitySetBase,
  EdmxEntityTypeBase
} from './edmx-types';

export function parseComplexTypesBase(root): EdmxComplexTypeBase[] {
  return forceArray(root.ComplexType).map(c => ({
    ...c,
    Property: forceArray(c.Property)
  }));
}

export function parseEntityTypesBase(
  root
): EdmxEntityTypeBase<any>[] {
  return forceArray(root.EntityType).map(e => ({
  ...e,
  Key: {
    PropertyRef: forceArray(e.Key?.PropertyRef)
  },
  NavigationProperty: forceArray(e.NavigationProperty),
  Property: forceArray(e.Property)
}));

export function parseEntitySetsBase(root): EdmxEntitySetBase[] {
  return forceArray(root.EntityContainer.EntitySet);
}
