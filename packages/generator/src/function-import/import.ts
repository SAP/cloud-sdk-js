/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { flat } from '@sap-cloud-sdk/util';
import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import {
  coreImportDeclaration,
  corePropertyTypeImportNames,
  externalImportDeclarations,
  mergeImportDeclarations
} from '../imports';
import {
  VdmFunctionImportReturnType,
  VdmFunctionImportReturnTypeCategory,
  VdmServiceMetadata
} from '../vdm-types';
import { responseTransformerFunctionName } from './response-transformer-function';

export function importDeclarations(
  service: VdmServiceMetadata
): ImportDeclarationStructure[] {
  const functionImportParameters = flat(
    service.functionImports.map(functionImport => functionImport.parameters)
  );
  const returnTypes = service.functionImports.map(
    functionImport => functionImport.returnType
  );
  return [
    ...externalImportDeclarations(functionImportParameters),
    coreImportDeclaration(
      [
        ...corePropertyTypeImportNames(functionImportParameters),
        ...returnTypes.map(returnType =>
          responseTransformerFunctionName(returnType)
        ),
        ...edmRelatedImports(returnTypes),
        ...complexTypeRelatedImports(returnTypes),
        'FunctionImportRequestBuilder',
        'FunctionImportParameter'
      ],
      service.oDataVersion
    ),
    ...returnTypeImports(returnTypes)
  ];
}

function edmRelatedImports(returnTypes: VdmFunctionImportReturnType[]) {
  return returnTypes.some(
    returnType =>
      returnType.returnTypeCategory ===
      VdmFunctionImportReturnTypeCategory.EDM_TYPE
  )
    ? ['edmToTs']
    : [];
}

function complexTypeRelatedImports(returnTypes: VdmFunctionImportReturnType[]) {
  return returnTypes.some(
    returnType =>
      returnType.returnTypeCategory ===
      VdmFunctionImportReturnTypeCategory.COMPLEX_TYPE
  )
    ? ['deserializeComplexType']
    : [];
}

function returnTypeImports(
  returnTypes: VdmFunctionImportReturnType[]
): ImportDeclarationStructure[] {
  return mergeImportDeclarations(
    returnTypes
      .filter(
        returnType =>
          returnType.returnTypeCategory !==
            VdmFunctionImportReturnTypeCategory.EDM_TYPE &&
          returnType.returnTypeCategory !==
            VdmFunctionImportReturnTypeCategory.VOID
      )
      .map(returnType => returnTypeImport(returnType))
  );
}

function returnTypeImport(
  returnType: VdmFunctionImportReturnType
): ImportDeclarationStructure {
  return {
    kind: StructureKind.ImportDeclaration,
    namedImports: [returnType.returnType],
    moduleSpecifier: `./${returnType.returnType}`
  };
}
