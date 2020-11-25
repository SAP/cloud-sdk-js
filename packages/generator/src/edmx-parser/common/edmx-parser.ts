import { assoc, flat } from '@sap-cloud-sdk/util';
import { forceArray } from '../../generator-utils';
import {
  EdmxComplexTypeBase,
  EdmxEntitySetBase,
  EdmxEntityTypeBase
} from './edmx-types';

export function parseComplexTypesBase(root): EdmxComplexTypeBase[] {
  return getMergedPropertyWithNamespace(root, 'ComplexType').map(c => ({
    ...c,
    Property: forceArray(c.Property),
    Namespace: c.Namespace
  }));
}

export function parseEntityTypesBase(root): EdmxEntityTypeBase<any>[] {
  return getMergedPropertyWithNamespace(root, 'EntityType').map(e => ({
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
  schema,
  entityContainerProperty: string
): any[] {
  return flat(
    forceArray(schema)
      .filter(s => s.EntityContainer)
      .map(s =>
        forceArray(s['EntityContainer'][entityContainerProperty]).map(
          addNamespace(schema.Namespace)
        )
      )
  );
}

export function addNamespace(namespace) {
  return obj => assoc('Namespace', namespace, obj);
}

export function getMergedPropertyWithNamespace(root, property: string): any[] {
  return flat(
    forceArray(root).map(s =>
      forceArray(s[property]).map(addNamespace(s.Namespace))
    )
  );
}
