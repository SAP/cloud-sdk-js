/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

// import { forceArray } from '../../generator-utils';
// import {
//   parseEntityTypes,
//   parseFunctionImportsBase,
//   parseComplexTypes
// } from '../common/edmx-parser';
// import { EdmxMetadataBase } from '../common';
// import { EdmxMetadata, EdmxFunctionImport } from './parser-types';
//
// export function parseEdmxV2(root): Omit<EdmxMetadata, keyof EdmxMetadataBase> {
//   return {
//     entityTypes: parseEntityTypes(root),
//     entitySets: forceArray(root.EntityContainer.EntitySet),
//     associationSets: forceArray(root.EntityContainer.AssociationSet),
//     associations: forceArray(root.Association),
//     functionImports: parseFunctionImportsBase(root) as EdmxFunctionImport[],
//     complexTypes: parseComplexTypes(root)
//   };
// }
