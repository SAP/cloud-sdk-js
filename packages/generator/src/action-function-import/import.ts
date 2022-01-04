import { flat, ODataVersion } from '@sap-cloud-sdk/util';
import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import voca from 'voca';
import {
  VdmActionFunctionImportReturnType,
  VdmParameter,
  VdmReturnTypeCategory,
  VdmServiceMetadata
} from '../vdm-types';
import {
  odataImportDeclaration,
  propertyTypeImportNames,
  externalImportDeclarations,
  mergeImportDeclarations,
  odataCommonImportDeclaration
} from '../imports';
import { isEntityNotDeserializable } from '../edmx-to-vdm/common';
import { responseTransformerFunctionName } from './response-transformer-function';

/* eslint-disable valid-jsdoc */
function actionFunctionImportDeclarations(
  returnTypes: VdmActionFunctionImportReturnType[],
  parameters: VdmParameter[],
  additionalImports: { name: string; version: ODataVersion | 'common' }[],
  { oDataVersion, className }: VdmServiceMetadata
): ImportDeclarationStructure[] {
  const responseTransformerFunctionCommon = returnTypes.find(returnType =>
    isEntityNotDeserializable(returnType)
  )
    ? ['throwErrorWhenReturnTypeIsUnionType']
    : [];
  const responseTransformerFunctionVersionDependent = returnTypes
    .filter(returnType => !isEntityNotDeserializable(returnType))
    .map(returnType => responseTransformerFunctionName(returnType));
  const [version, common] = additionalImports.reduce(
    ([v, c], current) => {
      if (current.version === 'common') {
        return [v, [...c, current.name]];
      }
      return [[...v, current.name], c];
    },
    [[], []]
  );
  return [
    ...externalImportDeclarations(parameters),
    odataCommonImportDeclaration([
      ...propertyTypeImportNames(parameters),
      ...common,
      ...responseTransformerFunctionCommon
    ]),
    odataImportDeclaration(
      [
        ...edmRelatedImports(returnTypes),
        ...complexTypeRelatedImports(returnTypes),
        ...version,
        ...responseTransformerFunctionVersionDependent,
        'DeSerializers',
        'DefaultDeSerializers',
        'defaultDeSerializers'
      ],
      oDataVersion
    ),
    {
      kind: StructureKind.ImportDeclaration,
      namedImports: [voca.decapitalize(className)],
      moduleSpecifier: './service'
    },
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
    ? ['entityDeserializer']
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
          returnType.returnTypeCategory !== VdmReturnTypeCategory.VOID &&
          returnType.returnTypeCategory !== VdmReturnTypeCategory.NEVER
      )
      .reduce(
        (imports, returnType) => [...imports, ...returnTypeImport(returnType)],
        []
      )
  );
}

function returnTypeImport(
  returnType: VdmActionFunctionImportReturnType
): ImportDeclarationStructure[] {
  const typeImports: ImportDeclarationStructure[] = [
    {
      kind: StructureKind.ImportDeclaration,
      namedImports: [returnType.returnType],
      moduleSpecifier: `./${returnType.returnType}`
    }
  ];
  if (returnType.returnTypeCategory === VdmReturnTypeCategory.ENTITY) {
    return [
      ...typeImports,
      {
        kind: StructureKind.ImportDeclaration,
        namedImports: [`${returnType.returnType}Api`],
        moduleSpecifier: `./${returnType.returnType}Api`
      }
    ];
  }
  return typeImports;
}

/**
 * @internal
 */
export function importDeclarationsFunction(
  service: VdmServiceMetadata
): ImportDeclarationStructure[] {
  if (!service.actionImports) {
    return [];
  }

  const actionImportPayloadElements = flat(
    service.actionImports.map(actionImport => actionImport.parameters)
  );
  const returnTypes = service.actionImports.map(
    actionImport => actionImport.returnType
  );
  return actionFunctionImportDeclarations(
    returnTypes,
    actionImportPayloadElements,
    [
      { name: 'ActionImportRequestBuilder', version: service.oDataVersion },
      { name: 'ActionImportParameter', version: service.oDataVersion }
    ],
    service
  );
}

/**
 * @internal
 */
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
      { name: 'FunctionImportRequestBuilder', version: service.oDataVersion },
      { name: 'DeSerializers', version: service.oDataVersion },
      { name: 'FunctionImportParameter', version: 'common' }
    ],
    service
  );
}
