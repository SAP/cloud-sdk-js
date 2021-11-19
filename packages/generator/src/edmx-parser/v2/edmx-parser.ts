import {
  getMergedPropertyWithNamespace,
  getPropertyFromEntityContainer,
  parseComplexTypesBase,
  parseEntitySetsBase,
  parseEntityTypesBase
} from '../common/edmx-parser';
import { EdmxComplexTypeBase, EdmxEntitySetBase } from '../common';
import { forceArray } from '../../generator-utils';
import {
  EdmxAssociation,
  EdmxAssociationSet,
  EdmxEntityTypeV2,
  EdmxFunctionImportV2
} from './edm-types';
/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export function parseComplexTypesV2(root: any): EdmxComplexTypeBase[] {
  return parseComplexTypesBase(root);
}
/**
 * @internal
 */
export function parseEntitySetsV2(root: any): EdmxEntitySetBase[] {
  return parseEntitySetsBase(root);
}
/**
 * @internal
 */
export function parseEntityTypes(root: any): EdmxEntityTypeV2[] {
  return parseEntityTypesBase(root);
}
/**
 * @internal
 */
export function parseAssociation(root: any): EdmxAssociation[] {
  return getMergedPropertyWithNamespace(root, 'Association');
}
/**
 * @internal
 */
export function parseAssociationSets(root: any): EdmxAssociationSet[] {
  return getPropertyFromEntityContainer(root, 'AssociationSet');
}
/**
 * @internal
 */
export function parseFunctionImportsV2(root: any): EdmxFunctionImportV2[] {
  return getPropertyFromEntityContainer(root, 'FunctionImport').map(f => ({
    ...f,
    Parameter: forceArray(f.Parameter)
  }));
}
