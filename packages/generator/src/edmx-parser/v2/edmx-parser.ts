/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
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
  return forceArray(root.EntityContainer.AssociationSet);
}

export function parseFunctionImports(root): EdmxFunctionImport[] {
  return forceArray(root.EntityContainer.FunctionImport).map(f => ({
    ...f,
    Parameter: forceArray(f.Parameter)
  }));
}
