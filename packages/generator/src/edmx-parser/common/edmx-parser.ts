import { flat } from '@sap-cloud-sdk/util';
import { forceArray } from '../../generator-utils';
import { EdmxMetadataSchemaMerged } from '../edmx-file-reader';
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

export function parseEntityTypesBase(
  root: EdmxMetadataSchemaMerged
): EdmxEntityTypeBase<any>[] {
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
  return extractPropertiesFromEntityContainer(root, ec => ec.EntitySet);
}

export function extractPropertiesFromEntityContainer(
  root,
  entityContainerToPropFn
): any[] {
  return flat(root.EntityContainer.map(entityContainerToPropFn));
}
