import {
  parseComplexTypesBase,
  parseEntitySetsBase,
  parseEntityTypesBase
} from '../common/edmx-parser';
import { EdmxEntitySetBase } from '../common';
import { forceArray } from '../../generator-utils';
import {
  EdmxAssociation,
  EdmxAssociationSet,
  EdmxEntityType, EdmxEntityTypeNamespaced,
  EdmxFunctionImport
} from './edm-types';
import { flat } from '@sap-cloud-sdk/util';
import { EdmxMetadataSchemaV2Merged, EdmxMetadataSchemaV4Merged } from '../edmx-file-reader';

export function parseComplexTypes(root) {
  return parseComplexTypesBase(root);
}

export function parseEntitySets(root): EdmxEntitySetBase[] {
  return parseEntitySetsBase(root);
}

export function parseEntityTypes(root): EdmxEntityTypeNamespaced[] {
  return parseEntityTypesBase(root);
}

export function parseAssociation(root): EdmxAssociation[] {
  return forceArray(root.Association);
}

export function parseAssociationSets(root): EdmxAssociationSet[] {
  return flat(root.EntityContainer.map(ec => ec.AssociationSet));
}

export function parseFunctionImports(
  root: EdmxMetadataSchemaV2Merged
): EdmxFunctionImport[] {
  return flat(root.EntityContainer.map(ec => ec.FunctionImport)).map(f => ({
    ...f,
    Parameter: forceArray(f.Parameter)
  }));
}
