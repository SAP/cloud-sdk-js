import { flat } from '@sap-cloud-sdk/util';
import { forceArray } from '../../generator-utils';
import {
  EdmxComplexTypeBase,
  EdmxEntitySetBase,
  EdmxEntityTypeBase
} from './edmx-types';

export function parseComplexTypesBase(root): EdmxComplexTypeBase[] {
  return forceArray(root.ComplexType).map(c => ({
    ...c,
    Property: forceArray(c.Property),
    Namespace: c.Namespace
  }));
}

export function parseEntityTypesBase(root): EdmxEntityTypeBase<any>[] {
  return forceArray(root.EntityType).map(e => ({
    ...e,
    Key: {
      PropertyRef: forceArray(e.Key?.PropertyRef)
    },
    NavigationProperty: forceArray(e.NavigationProperty),
    Property: forceArray(e.Property),
    Namespace: e.Namespace
  }));
}

export function parseEntitySetsBase(root): EdmxEntitySetBase[] {
  return getPropertyFromEntityContainer(root, 'EntitySet');
}

export function getPropertyFromEntityContainer(
  root,
  entityContainerProperty: string
): any[] {
  return flat(
    root.EntityContainer.map(ec => forceArray(ec[entityContainerProperty]))
  );
}
