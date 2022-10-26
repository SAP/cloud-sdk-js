import { createLogger, unixEOL } from '@sap-cloud-sdk/util';
import { parseFunctionImportsV4, parseFunctions } from '../../edmx-parser';
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
import {
  EdmxFunction,
  EdmxFunctionImportV4
} from '../../edmx-parser/v4/edm-types';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { swaggerDefinitionForFunctionImport } from '../../swagger-parser/swagger-parser';
import { VdmComplexType, VdmEntityInConstruction, VdmFunctionImport } from '../../vdm-types';
import { parseFunctionImportReturnTypes } from '../common/action-function-return-types';
import { transformFunctionImportBase } from '../common/function-import';
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

/**
 * @internal
 */
export function filterFunctions(joinedFunctionData: JoinedFunctionImportData[], bindingEntitySetName?: string): JoinedFunctionImportData[] {
  if (bindingEntitySetName) {
    // filter 3 aspects: is bound?, is right bounding entity, has unsupported parameters
    return joinedFunctionData
      .filter(({ function: edmxFunction }) => edmxFunction.IsBound)
      .filter(({ function: edmxFunction }) => edmxFunction.Parameter.length > 0)
      .filter(({ function: edmxFunction }) => edmxFunction.Parameter[0].Type.endsWith(bindingEntitySetName))
      .filter(
        ({ function: edmxFunction }) =>
          !hasUnsupportedParameterTypes(edmxFunction, bindingEntitySetName)
      );
  }
      // TODO 1571 remove when supporting entity type as parameter
  return joinedFunctionData.filter(
    ({ function: edmxFunction }) =>
      !hasUnsupportedParameterTypes(edmxFunction, bindingEntitySetName)
  );
}

/**
 * @internal
 */
export function generateFunctionImportsV4(
  serviceMetadata: ServiceMetadata,
  serviceName: string,
  entities: VdmEntityInConstruction[],
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter,
  bindingEntitySetName?: string // rename set name
): VdmFunctionImport[] {
  const functions = parseFunctions(serviceMetadata.edmx.root);
  const functionImports = parseFunctionImportsV4(serviceMetadata.edmx.root);
  const joinedFunctionData = joinFunctionImportData(functionImports, functions);
  const filteredJoinedFunctionData = filterFunctions(joinedFunctionData, bindingEntitySetName);

  // fixme(fwilhe) adapt filter for bound
  return (
    filteredJoinedFunctionData
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
            formatter,
            bindingEntitySetName
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
