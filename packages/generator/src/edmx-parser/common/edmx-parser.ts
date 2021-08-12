import { flat } from '@sap-cloud-sdk/util';
import { forceArray } from '../../generator-utils';
import {
  EdmxComplexTypeBase,
  EdmxEntitySetBase,
  EdmxEntityTypeBase
} from './edmx-types';

export function parseComplexTypesBase(root: any): EdmxComplexTypeBase[] {
  return getMergedPropertyWithNamespace(root, 'ComplexType').map(c => ({
    ...c,
    Property: forceArray(c.Property),
    Namespace: c.Namespace
  }));
}

export function parseEntityTypesBase(root: any): EdmxEntityTypeBase<any>[] {
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

export function parseEntitySetsBase(root: any): EdmxEntitySetBase[] {
  return getPropertyFromEntityContainer(root, 'EntitySet');
}

export function getPropertyFromEntityContainer(
  schema: any,
  entityContainerProperty: string
): any[] {
  return flat(
    forceArray(schema)
      .filter(s => s.EntityContainer)
      .map(s =>
        forceArray(s['EntityContainer'][entityContainerProperty]).map(p =>
          addNamespace(p, schema.Namespace)
        )
      )
  );
}

function addNamespace<T>(obj: T, namespace: string): T & { Namespace: string } {
  return { ...obj, Namespace: namespace };
}

/**
 * Merge a property defined in one or more schemas and add the namespace information
 * @param root - One or more schemas
 * @param property - The property that will be merged
 * @returns A collection containing the merged property
 */
export function getMergedPropertyWithNamespace(
  root: any,
  property: string
): any[] {
  return flat(
    forceArray(root).map(s =>
      forceArray(s[property]).map(p => addNamespace(p, s.Namespace))
    )
  );
}
