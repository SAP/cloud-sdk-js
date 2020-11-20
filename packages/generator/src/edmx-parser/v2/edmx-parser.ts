import {
  extractPropertiesFromEntityContainer,
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
  return extractPropertiesFromEntityContainer(root, ec => ec.AssociationSet);
}

export function parseFunctionImports(root): EdmxFunctionImport[] {
  return extractPropertiesFromEntityContainer(
    root,
    ec => ec.FunctionImport
  ).map(f => ({
    ...f,
    Parameter: forceArray(f.Parameter)
  }));
}
