import { forceArray } from '../../../generator-utils';
import {
  parseEntityTypes,
  parseFunctionImportsBase,
  parseComplexTypes
} from '../common/edmx-parser';
import { EdmxMetadataBase } from '../common';
import { EdmxMetadata, EdmxFunctionImport } from './parser-types';
/* eslint-disable valid-jsdoc */

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export function parseEdmxV2(
  root: any
): Omit<EdmxMetadata, keyof EdmxMetadataBase> {
  return {
    entityTypes: parseEntityTypes(root),
    entitySets: forceArray(root.EntityContainer.EntitySet),
    associationSets: forceArray(root.EntityContainer.AssociationSet),
    associations: forceArray(root.Association),
    functionImports: parseFunctionImportsBase(root) as EdmxFunctionImport[],
    complexTypes: parseComplexTypes(root)
  };
}
