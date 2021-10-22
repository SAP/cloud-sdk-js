import { caps, flat, ODataVersion } from '@sap-cloud-sdk/util';
import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import {
  VdmActionFunctionImportReturnType,
  VdmParameter,
  VdmReturnTypeCategory,
  VdmServiceMetadata
} from '../vdm-types';
import {
  odataImportDeclaration,
  corePropertyTypeImportNames,
  externalImportDeclarations,
  mergeImportDeclarations, odataCommonImportDeclaration
} from '../imports';
import { isEntityNotDeserializable } from '../edmx-to-vdm/common';
import { responseTransformerFunctionName } from './response-transformer-function';

function actionFunctionImportDeclarations(
  returnTypes: VdmActionFunctionImportReturnType[],
  parameters: VdmParameter[],
  additionalImports: {name: string;version: ODataVersion|'common'}[],
  oDataVersion: ODataVersion
): ImportDeclarationStructure[] {
  const responseTransformerFunctionCommon = returnTypes.find(returnType=>isEntityNotDeserializable(returnType)) ? ['throwErrorWhenReturnTypeIsUnionType']: [];
  const resp0nseTransformerFunctionVersionDependent= returnTypes.filter(returnType=>!isEntityNotDeserializable(returnType)).map(returnType=>responseTransformerFunctionName(returnType));
  const [version,common] = additionalImports.reduce(([version,common],current)=>{
    if(current.version==='common'){
      return [version,[...common,current.name]];
    }
    return [[...version,current.name],common];
  },[[],[]]);
  return [
    ...externalImportDeclarations(parameters),
      odataCommonImportDeclaration([...corePropertyTypeImportNames(parameters),...common, ...responseTransformerFunctionCommon]),
    odataImportDeclaration([
      ...edmRelatedImports(returnTypes, oDataVersion),
      ...complexTypeRelatedImports(returnTypes,),
        ...version,
        ...resp0nseTransformerFunctionVersionDependent
    ],oDataVersion),
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
    [{ name:'ActionImportRequestBuilder',version:service.oDataVersion }, { name:'ActionImportParameter',version:service.oDataVersion }],
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
      [{ name:'FunctionImportRequestBuilder',version:service.oDataVersion }, { name:'FunctionImportParameter',version:'common' }],
    service.oDataVersion
  );
}
