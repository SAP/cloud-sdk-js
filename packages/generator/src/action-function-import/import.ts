import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import voca from 'voca';
import {
  VdmActionFunctionImportReturnType,
  VdmActionImport,
  VdmFunctionImport,
  VdmReturnTypeCategory,
  VdmServiceMetadata
} from '../vdm-types';
import {
  odataImportDeclaration,
  propertyTypeImportNames,
  externalImportDeclarations,
  mergeImportDeclarations
} from '../imports';
import { isEntityNotDeserializable } from '../edmx-to-vdm/common';
import { responseTransformerFunctionName } from './response-transformer-function';

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

function responseTransformerImports(
  returnTypes: VdmActionFunctionImportReturnType[]
) {
  return returnTypes.map(returnType =>
    isEntityNotDeserializable(returnType)
      ? 'throwErrorWhenReturnTypeIsUnionType'
      : responseTransformerFunctionName(returnType)
  );
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
export function operationImportDeclarations(
  { oDataVersion, className }: VdmServiceMetadata,
  type: 'function' | 'action',
  operations: (VdmFunctionImport | VdmActionImport)[] = []
): ImportDeclarationStructure[] {
  if (!operations.length) {
    return [];
  }

  const parameters = operations.flatMap(({ parameters: params }) => params);
  const returnTypes = operations.map(({ returnType }) => returnType);

  return [
    ...externalImportDeclarations(parameters),
    odataImportDeclaration(
      [
        ...edmRelatedImports(returnTypes),
        ...complexTypeRelatedImports(returnTypes),
        ...responseTransformerImports(returnTypes),
        'DeSerializers',
        'DefaultDeSerializers',
        'defaultDeSerializers',
        ...propertyTypeImportNames(parameters),
        `${voca.capitalize(type)}ImportParameter`,
        `${voca.capitalize(type)}ImportRequestBuilder`
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
