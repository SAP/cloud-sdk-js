import { forceArray } from '../../generator-utils';
import {
  EdmxComplexTypeBase,
  EdmxEntitySetBase,
  EdmxEntityTypeBase, EdmxEntityTypeBaseNamespaced
} from './edmx-types';
import { EdmxMetadataSchemaMerged } from '../edmx-file-reader';
import { flat } from '@sap-cloud-sdk/util';

export function parseComplexTypesBase(root): EdmxComplexTypeBase[] {
  return forceArray(root.ComplexType).map(c => ({
    ...c,
    Property: forceArray(c.Property)
  }));
}

export function parseEntityTypesBase(
  root: EdmxMetadataSchemaMerged
): EdmxEntityTypeBaseNamespaced<any>[] {
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
  return flat(root.EntityContainer.map(ec => ec.EntitySet));
}
