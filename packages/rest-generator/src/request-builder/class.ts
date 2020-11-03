import {
  StructureKind,
  VariableDeclarationKind,
  VariableStatementStructure,
  Writers
} from 'ts-morph';
import { toPascalCase, toPropertyFormat } from '@sap-cloud-sdk/core';
import { OpenApiPath, OpenApiServiceMetadata } from '../open-api-types';

/**
 * Used by the generator for generating a API request builder class
 * @param serviceMetadata The service metadata model converted from the open api file.
 * @returns class declaration structure of the API request builder class
 */
export function apiRequestBuilderClass(
  serviceMetadata: OpenApiServiceMetadata
): VariableStatementStructure {
  /*
  export const PriceCalculationApiRequestBuilder: ApiRequestBuilder<PriceCalculationApi> = {
  calculateViaRestWithTenant: (tenantName: string, priceCalculate: PriceCalculate) => new RestRequestBuilder<PriceCalculationApiInterface, 'calculateViaRestWithTenant'>(
    PriceCalculationApi,
   'calculateViaRestWithTenant',
    tenantName,
    priceCalculate
  )
}
  */
  return {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    isExported: true,
    declarations: [
      {
        kind: StructureKind.VariableDeclaration,
        name: `${serviceMetadata.apiName}ApiRequestBuilder`,
        initializer: Writers.object(
          getAllOperations(
            `${serviceMetadata.apiName}Api`,
            serviceMetadata.paths
          )
        )
      }
    ]
  };
}

interface Parameter {
  name: string;
  type: string;
}

function getAllOperations(
  apiName: string,
  paths: OpenApiPath[]
): Record<string, string> {
  return paths.reduce(
    (allOperations, path) => ({
      ...allOperations,
      ...getOperations(apiName, path)
    }),
    {}
  );
}

function getOperations(
  apiName: string,
  openApiPath: OpenApiPath
): Record<string, string> {
  return openApiPath.operations.reduce((operations, operation) => {
    const parameters = [
      ...pathParamToParamStructure(openApiPath.pathParameters),
      ...refNameToParamStructure(operation.requestBodySchemaRefName)
    ];

    const apiFunctionParameters = parameters
      .map(param => `${param.name}: ${param.type}`)
      .join(', ');
    const requestBuilderParameters = [
      apiName,
      `'${operation.operationName}'`,
      ...parameters.map(param => param.name)
    ].join(',\n');

    return {
      ...operations,
      [toPropertyFormat(
        operation.operationName
      )]: `(${apiFunctionParameters}) => new RestRequestBuilder<${apiName}>(
        ${requestBuilderParameters}
      )`
    };
  }, {});
}

export function refNameToParamStructure(refName?: string): Parameter[] {
  return refName
    ? [
        {
          name: toPropertyFormat(refName),
          type: toPascalCase(refName)
        }
      ]
    : [];
}

export function pathParamToParamStructure(
  pathParameters: string[]
): Parameter[] {
  return pathParameters.map(p => ({
    name: p,
    type: 'string'
  }));
}
