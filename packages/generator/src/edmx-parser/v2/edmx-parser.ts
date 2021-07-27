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

export function parseComplexTypes(root: any): EdmxComplexTypeBase[] {
  return parseComplexTypesBase(root);
}

export function parseEntitySets(root: any): EdmxEntitySetBase[] {
  return parseEntitySetsBase(root);
}

export function parseEntityTypes(root: any): EdmxEntityType[] {
  return parseEntityTypesBase(root);
}

export function parseAssociation(root: any): EdmxAssociation[] {
  return getMergedPropertyWithNamespace(root, 'Association');
}

export function parseAssociationSets(root: any): EdmxAssociationSet[] {
  return getPropertyFromEntityContainer(root, 'AssociationSet');
}

export function parseFunctionImports(root: any): EdmxFunctionImport[] {
  const functionImports: EdmxFunctionImport[] = getPropertyFromEntityContainer(
    root,
    'FunctionImport'
  ).map(f => ({
    ...f,
    Parameter: forceArray(f.Parameter)
  }));
  return functionImports.map(f => {
    f.Parameter.forEach(p => {
      p.Nullable = !p.Nullable ? 'true' : p.Nullable;
    });
    return f;
  });
}
