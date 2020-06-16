/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { forceArray } from '../generator-utils';
import { EdmxMetadata, EdmxFunctionImport } from './parser-types-v2';
import {
  parseEntityTypes,
  parseFunctionImports,
  parseComplexTypes
} from './edmx-parser-common';
import { EdmxMetadataBase } from './parser-types-common';

export function parseEdmxV2(root): Omit<EdmxMetadata, keyof EdmxMetadataBase> {
  return {
    entityTypes: parseEntityTypes(root),
    entitySets: forceArray(root.EntityContainer.EntitySet),
    associationSets: forceArray(root.EntityContainer.AssociationSet),
    associations: forceArray(root.Association),
    functionImports: parseFunctionImports(root) as EdmxFunctionImport[],
    complexTypes: parseComplexTypes(root)
  };
}
