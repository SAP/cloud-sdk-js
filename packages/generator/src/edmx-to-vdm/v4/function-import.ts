import { unixEOL, createLogger } from '@sap-cloud-sdk/util';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { transformFunctionImportBase } from '../common';
import { swaggerDefinitionForFunctionImport } from '../../swagger-parser/swagger-parser';
import {
  EdmxFunction,
  EdmxFunctionImport,
  parseFunctionImports,
  parseFunctions
} from '../../edmx-parser/v4';
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
import { VdmComplexType, VdmEntity, VdmFunctionImport } from '../../vdm-types';
import { parseFunctionImportReturnTypes } from '../common/action-function-return-types';
import { hasUnsupportedParameterTypes } from '../edmx-to-vdm-util';
import { findActionFunctionByImportName } from './action-function-util';
const logger = createLogger({
  package: 'generator',
  messageContext: 'function-import'
});

function findFunctionForFunctionImport(
  functions: EdmxFunction[],
  functionImport: EdmxFunctionImport
): EdmxFunction | undefined {
  return findActionFunctionByImportName(functions, functionImport.Function);
}

const extractResponse = (response: string) => `${response}.value`;

interface JoinedFunctionImportData {
  functionImport: EdmxFunctionImport;
  function: EdmxFunction;
}

function joinFunctionImportData(
  functionImports: EdmxFunctionImport[],
  functions: EdmxFunction[]
): JoinedFunctionImportData[] {
  const functionImportsWithoutFunctions: EdmxFunctionImport[] = [];
  const joinedFunctionImportData = functionImports.reduce(
    (joined, functionImport) => {
      const edmxFunction = findFunctionForFunctionImport(
        functions,
        functionImport
      );

      if (edmxFunction) {
        return [
          ...joined,
          {
            functionImport,
            function: edmxFunction
          }
        ];
      }
      functionImportsWithoutFunctions.push(functionImport);
      return joined;
    },
    []
  );

  if (functionImportsWithoutFunctions.length) {
    logger.warn(
      `Could not find functions referenced by the following function imports. Skipping code generation: ${functionImportsWithoutFunctions
        .map(f => `${f.Name} => ${f.Function}`)
        .join(`, ${unixEOL}`)}`
    );
  }
  return joinedFunctionImportData;
}

export function generateFunctionImportsV4(
  serviceMetadata: ServiceMetadata,
  entities: VdmEntity[],
  complexTypes: Omit<VdmComplexType, 'factoryName'>[],
  formatter: ServiceNameFormatter
): VdmFunctionImport[] {
  const functions = parseFunctions(serviceMetadata.edmx.root);
  const functionImports = parseFunctionImports(serviceMetadata.edmx.root);
  const joinedFunctionData = joinFunctionImportData(functionImports, functions);

  return (
    joinedFunctionData
      // TODO 1571 remove when supporting entity type as parameter
      .filter(
        ({ function: edmxFunction }) =>
          !hasUnsupportedParameterTypes(edmxFunction)
      )
      .map(({ functionImport, function: edmxFunction }) => {
        const httpMethod = 'get';
        const swaggerDefinition = swaggerDefinitionForFunctionImport(
          functionImport.Name,
          httpMethod,
          serviceMetadata.swagger
        );

        return {
          ...transformFunctionImportBase(
            functionImport,
            edmxFunction.Parameter,
            swaggerDefinition,
            formatter
          ),
          httpMethod,
          returnType: parseFunctionImportReturnTypes(
            edmxFunction.ReturnType,
            entities,
            complexTypes,
            extractResponse,
            serviceMetadata.edmx.oDataVersion
          )
        };
      })
  );
}
