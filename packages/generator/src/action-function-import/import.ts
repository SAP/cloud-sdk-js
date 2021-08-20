import { caps, flat, ODataVersion } from '@sap-cloud-sdk/util';
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
import { isEntityNotDeserializable } from '../edmx-to-vdm/common';
import { responseTransformerFunctionName } from './response-transformer-function';

function actionFunctionImportDeclarations(
  returnTypes: VdmActionFunctionImportReturnType[],
  parameters: VdmParameter[],
  additionalImports: string[],
  oDataVersion: ODataVersion
): ImportDeclarationStructure[] {
  return [
    ...externalImportDeclarations(parameters),
    coreImportDeclaration([
      ...corePropertyTypeImportNames(parameters),
      ...returnTypes.map(returnType =>
        isEntityNotDeserializable(returnType)
          ? 'throwErrorWhenReturnTypeIsUnionType'
          : responseTransformerFunctionName(returnType, oDataVersion)
      ),
      ...edmRelatedImports(returnTypes, oDataVersion),
      ...complexTypeRelatedImports(returnTypes, oDataVersion),
      ...additionalImports
    ]),
    ...returnTypeImports(returnTypes)
  ];
}

function complexTypeRelatedImports(
  returnTypes: VdmActionFunctionImportReturnType[],
  oDataVersion: ODataVersion
) {
  return returnTypes.some(
    returnType =>
      returnType.returnTypeCategory === VdmReturnTypeCategory.COMPLEX_TYPE
  )
    ? [`deserializeComplexType${caps(oDataVersion)}`]
    : [];
}

function edmRelatedImports(
  returnTypes: VdmActionFunctionImportReturnType[],
  oDataVersion: ODataVersion
) {
  return returnTypes.some(
    returnType =>
      returnType.returnTypeCategory === VdmReturnTypeCategory.EDM_TYPE
  )
    ? [`edmToTs${caps(oDataVersion)}`]
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
          returnType.returnTypeCategory !== VdmReturnTypeCategory.VOID &&
          returnType.returnTypeCategory !== VdmReturnTypeCategory.NEVER
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

  const actionImportPayloadElements = flat(
    service.actionsImports.map(actionImport => actionImport.parameters)
  );
  const returnTypes = service.actionsImports.map(
    actionImport => actionImport.returnType
  );
  return actionFunctionImportDeclarations(
    returnTypes,
    actionImportPayloadElements,
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
    [
      `FunctionImportRequestBuilder${caps(service.oDataVersion)}`,
      'FunctionImportParameter'
    ],
    service.oDataVersion
  );
}
