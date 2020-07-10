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

// TODO more elegant way to pass the type in?
export function parseEntityTypesBase<NavigationT>(
  root,
  navigationType: NavigationT
): EdmxEntityTypeBase<NavigationT>[] {
  return forceArray(root.EntityType).map(e => {
    if (!e.Key) {
      e.Key = {};
    }
    e.Key.PropertyRef = forceArray(e.Key.PropertyRef);
    e.NavigationProperty = forceArray(e.NavigationProperty);
    e.Property = forceArray(e.Property);
    return e;
  });
}

export function parseEntitySetsBase(root): EdmxEntitySetBase[] {
  return forceArray(root.EntityContainer.EntitySet);
}
