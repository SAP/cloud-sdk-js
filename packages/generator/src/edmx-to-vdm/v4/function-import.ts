import { unixEOL, createLogger } from '@sap-cloud-sdk/util';
import { ServiceNameFormatter } from '../../service-name-formatter';
import {
  transformFunctionImportBase,
  parseFunctionImportReturnTypes
} from '../common';
import { swaggerDefinitionForFunctionImport } from '../../swagger-parser';
import {
  EdmxFunction,
  EdmxFunctionImportV4,
  parseFunctionImportsV4,
  parseFunctions
} from '../../edmx-parser/v4';
import { ServiceMetadata } from '../../edmx-parser';
import { VdmComplexType, VdmEntity, VdmFunctionImport } from '../../vdm-types';
import { hasUnsupportedParameterTypes } from '../edmx-to-vdm-util';
import { findActionFunctionByImportName } from './action-function-util';
const logger = createLogger({
  package: 'generator',
  messageContext: 'function-import'
});

function findFunctionForFunctionImport(
  functions: EdmxFunction[],
  functionImport: EdmxFunctionImportV4
): EdmxFunction | undefined {
  return findActionFunctionByImportName(functions, functionImport.Function);
}

const extractResponse = (response: string) => `${response}.value`;

interface JoinedFunctionImportData {
  functionImport: EdmxFunctionImportV4;
  function: EdmxFunction;
}

function joinFunctionImportData(
  functionImports: EdmxFunctionImportV4[],
  functions: EdmxFunction[]
): JoinedFunctionImportData[] {
  const functionImportsWithoutFunctions: EdmxFunctionImportV4[] = [];
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

// eslint-disable-next-line valid-jsdoc
/**
 * @internal
 */
export function generateFunctionImportsV4(
  serviceMetadata: ServiceMetadata,
  serviceName: string,
  entities: VdmEntity[],
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter
): VdmFunctionImport[] {
  const functions = parseFunctions(serviceMetadata.edmx.root);
  const functionImports = parseFunctionImportsV4(serviceMetadata.edmx.root);
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
            serviceName
          )
        };
      })
  );
}
