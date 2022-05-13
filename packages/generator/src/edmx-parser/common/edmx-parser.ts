import { flat } from '@sap-cloud-sdk/util';
import { forceArray } from '../../generator-utils';
import {
  EdmxComplexTypeBase,
  EdmxEntitySetBase,
  EdmxEntityTypeBase
} from './edmx-types';

/**
 * @internal
 */
export function parseComplexTypesBase(root: any): EdmxComplexTypeBase[] {
  return getMergedPropertyWithNamespace(root, 'ComplexType').map(c => ({
    ...c,
    Property: forceArray(c.Property),
    Namespace: c.Namespace
  }));
}
/**
 * @internal
 */
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
/**
 * @internal
 */
export function parseEntitySetsBase(root: any): EdmxEntitySetBase[] {
  return getPropertyFromEntityContainer(root, 'EntitySet');
}
/**
 * @internal
 */
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

function addNamespace<T>(
  obj: T,
  namespace: string | string[]
): T & { Namespace: string } {
  const Namespace = Array.isArray(namespace) ? namespace[0] : namespace;
  return { ...obj, Namespace };
}

/**
 * Merge a property defined in one or more schemas and add the namespace information
 * @param root - One or more schemas
 * @param property - The property that will be merged
 * @returns A collection containing the merged property
 * @internal
 */
export function getMergedPropertyWithNamespace(
  root: any,
  property: string
): any[] {
  return flat(
    forceArray(root).map(s =>
      // If the property has a namespace take it over the higher level schema namespace
      forceArray(s[property]).map(p =>
        addNamespace(p, p.Namespace || s.Namespace)
      )
    )
  );
}
