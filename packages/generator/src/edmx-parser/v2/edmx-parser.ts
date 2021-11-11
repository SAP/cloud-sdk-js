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
  EdmxEntityType,
  EdmxFunctionImport
} from './edm-types';
/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export function parseComplexTypes(root: any): EdmxComplexTypeBase[] {
  return parseComplexTypesBase(root);
}
/**
 * @internal
 */
export function parseEntitySets(root: any): EdmxEntitySetBase[] {
  return parseEntitySetsBase(root);
}
/**
 * @internal
 */
export function parseEntityTypes(root: any): EdmxEntityType[] {
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
export function parseFunctionImports(root: any): EdmxFunctionImport[] {
  return getPropertyFromEntityContainer(root, 'FunctionImport').map(f => ({
    ...f,
    Parameter: forceArray(f.Parameter)
  }));
}
