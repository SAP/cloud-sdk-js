import { StructureKind } from 'ts-morph';
import voca from 'voca';
import {
  odataImportDeclarationTsMorph,
  propertyTypeImportNames,
  externalImportDeclarationsTsMorph,
  mergeImportDeclarations
} from '../imports';
import { cannotDeserialize } from '../edmx-to-vdm';
import { responseTransformerFunctionName } from './response-transformer-function';
import type {
  VdmOperationReturnType,
  VdmOperation,
  VdmServiceMetadata
} from '../vdm-types';
import type { ImportDeclarationStructure } from 'ts-morph';
import type { CreateFileOptions } from '@sap-cloud-sdk/generator-common/internal';

function complexTypeRelatedImports(returnTypes: VdmOperationReturnType[]) {
  return returnTypes.some(
    returnType => returnType.returnTypeCategory === 'complex-type'
  )
    ? ['entityDeserializer']
    : [];
}

function edmRelatedImports(returnTypes: VdmOperationReturnType[]) {
  return returnTypes.some(
    returnType => returnType.returnTypeCategory === 'edm-type'
  )
    ? ['edmToTs']
    : [];
}

function responseTransformerImports(returnTypes: VdmOperationReturnType[]) {
  return returnTypes.map(returnType =>
    cannotDeserialize(returnType)
      ? 'throwErrorWhenReturnTypeIsUnionType'
      : responseTransformerFunctionName(returnType)
  );
}

function returnTypeImports(
  returnTypes: VdmOperationReturnType[],
  options?: CreateFileOptions
): ImportDeclarationStructure[] {
  return mergeImportDeclarations(
    returnTypes
      .filter(
        returnType =>
          returnType.returnTypeCategory !== 'edm-type' &&
          returnType.returnTypeCategory !== 'void' &&
          returnType.returnTypeCategory !== 'never'
      )
      .reduce(
        (imports, returnType) => [...imports, ...returnTypeImport(returnType, options)],
        []
      )
  );
}

function returnTypeImport(
  returnType: VdmOperationReturnType,
  options?: CreateFileOptions
): ImportDeclarationStructure[] {
  const extension = options?.generateESM ? '.js' : '';
  const typeImports: ImportDeclarationStructure[] = [
    {
      kind: StructureKind.ImportDeclaration,
      namedImports: [returnType.returnType],
      moduleSpecifier: `./${returnType.returnType}${extension}`
    }
  ];
  if (returnType.returnTypeCategory === 'entity') {
    return [
      ...typeImports,
      {
        kind: StructureKind.ImportDeclaration,
        namedImports: [`${returnType.returnType}Api`],
        moduleSpecifier: `./${returnType.returnType}Api${extension}`
      }
    ];
  }
  return typeImports;
}

/**
 * @internal
 */
export function operationDeclarations(
  { oDataVersion, className }: VdmServiceMetadata,
  operations: VdmOperation[] = [],
  options?: CreateFileOptions
): ImportDeclarationStructure[] {
  if (!operations.length) {
    return [];
  }

  const parameters = operations.flatMap(({ parameters: params }) => params);
  const returnTypes = operations.map(({ returnType }) => returnType);

  const includesBound = !!operations.filter(operation => operation.isBound)
    .length;
  const includesUnbound = !!operations.filter(operation => !operation.isBound)
    .length;
  const hasOperationWithParameters = operations.some(
    operation => operation.parameters.length
  );

  if (includesUnbound && includesBound) {
    throw new Error(
      'Bound and unbound operations found in generation - this should not happen.'
    );
  }
  const extension = options?.generateESM ? '.js' : '';
  const serviceImport: ImportDeclarationStructure[] = includesBound
    ? []
    : [
        {
          kind: StructureKind.ImportDeclaration,
          namedImports: [voca.decapitalize(className)],
          moduleSpecifier: `./service${extension}`
        }
      ];

  return [
    ...externalImportDeclarationsTsMorph(parameters),
    odataImportDeclarationTsMorph(
      [
        ...edmRelatedImports(returnTypes),
        ...complexTypeRelatedImports(returnTypes),
        ...responseTransformerImports(returnTypes),
        'DeSerializers',
        'DefaultDeSerializers',
        'defaultDeSerializers',
        ...propertyTypeImportNames(parameters),
        ...(hasOperationWithParameters ? ['OperationParameter'] : []),
        ...(includesUnbound ? ['OperationRequestBuilder'] : []),
        ...(includesBound ? ['BoundOperationRequestBuilder'] : [])
      ],
      oDataVersion
    ),
    ...serviceImport,
    ...returnTypeImports(returnTypes, options)
  ];
}
