/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { flat, ODataVersion } from '@sap-cloud-sdk/util';
import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import {
  VdmActionFunctionImportReturnType,
  VdmParameter,
  VdmReturnTypeCategory,
  VdmServiceMetadata
} from '../vdm-types';
import {
  coreImportDeclaration,
  corePropertyTypeImportNames,
  externalImportDeclarations,
  mergeImportDeclarations
} from '../imports';
import { responseTransformer } from './response-transformer-function';

function actionFunctionImportDeclarations(
  returnTypes: VdmActionFunctionImportReturnType[],
  parameters: VdmParameter[],
  additionalImports: string[],
  oDataVersion: ODataVersion
): ImportDeclarationStructure[] {
  return [
    ...externalImportDeclarations(parameters),
    coreImportDeclaration(
      [
        ...corePropertyTypeImportNames(parameters),
        ...returnTypes.map(returnType => responseTransformer(returnType)),
        ...edmRelatedImports(returnTypes),
        ...complexTypeRelatedImports(returnTypes),
        ...additionalImports
      ],
      oDataVersion
    ),
    ...returnTypeImports(returnTypes)
  ];
}

function complexTypeRelatedImports(
  returnTypes: VdmActionFunctionImportReturnType[]
) {
  return returnTypes.some(
    returnType =>
      returnType.returnTypeCategory === VdmReturnTypeCategory.COMPLEX_TYPE
  )
    ? ['deserializeComplexType']
    : [];
}

function edmRelatedImports(returnTypes: VdmActionFunctionImportReturnType[]) {
  return returnTypes.some(
    returnType =>
      returnType.returnTypeCategory === VdmReturnTypeCategory.EDM_TYPE
  )
    ? ['edmToTs']
    : [];
}

function returnTypeImports(
  returnTypes: VdmActionFunctionImportReturnType[]
): ImportDeclarationStructure[] {
  return mergeImportDeclarations(
    returnTypes
      .filter(
        returnType =>
          returnType.returnTypeCategory !== VdmReturnTypeCategory.EDM_TYPE &&
          returnType.returnTypeCategory !== VdmReturnTypeCategory.VOID
      )
      .map(returnType => returnTypeImport(returnType))
  );
}

function returnTypeImport(
  returnType: VdmActionFunctionImportReturnType
): ImportDeclarationStructure {
  return {
    kind: StructureKind.ImportDeclaration,
    namedImports: [returnType.returnType],
    moduleSpecifier: `./${returnType.returnType}`
  };
}

export function importDeclarationsFunction(
  service: VdmServiceMetadata
): ImportDeclarationStructure[] {
  if (!service.actionsImports) {
    return [];
  }

  const actionImportParameters = flat(
    service.actionsImports.map(actionImport => actionImport.parameters)
  );
  const returnTypes = service.actionsImports.map(
    actionImpot => actionImpot.returnType
  );
  return actionFunctionImportDeclarations(
    returnTypes,
    actionImportParameters,
    ['ActionImportRequestBuilder', 'ActionImportParameter'],
    service.oDataVersion
  );
}

export function importDeclarationsAction(
  service: VdmServiceMetadata
): ImportDeclarationStructure[] {
  const functionImportParameters = flat(
    service.functionImports.map(functionImport => functionImport.parameters)
  );
  const returnTypes = service.functionImports.map(
    functionImport => functionImport.returnType
  );
  return actionFunctionImportDeclarations(
    returnTypes,
    functionImportParameters,
    ['FunctionImportRequestBuilder', 'FunctionImportParameter'],
    service.oDataVersion
  );
}
