import {
  getPropertyFromEntityContainer,
  parseComplexTypesBase,
  parseEntitySetsBase,
  parseEntityTypesBase
} from '../common/edmx-parser';
import { EdmxEntitySetBase } from '../common';
import { forceArray } from '../../generator-utils';
import {
  EdmxAssociation,
  EdmxAssociationSet,
  EdmxEntityType,
  EdmxFunctionImport
} from './edm-types';

export function parseComplexTypes(root) {
  return parseComplexTypesBase(root);
}

export function parseEntitySets(root): EdmxEntitySetBase[] {
  return parseEntitySetsBase(root);
}

export function parseEntityTypes(root): EdmxEntityType[] {
  return parseEntityTypesBase(root);
}

export function parseAssociation(root): EdmxAssociation[] {
  return forceArray(root.Association);
}

export function parseAssociationSets(root): EdmxAssociationSet[] {
  return getPropertyFromEntityContainer(root, 'AssociationSet');
}

export function parseFunctionImports(root): EdmxFunctionImport[] {
  return getPropertyFromEntityContainer(root, 'FunctionImport').map(f => ({
    ...f,
    Parameter: forceArray(f.Parameter)
  }));
}
