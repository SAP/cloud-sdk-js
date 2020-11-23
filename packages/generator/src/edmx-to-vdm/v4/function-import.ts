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

function findFunctionForFunctionImport(
  functions: EdmxFunction[],
  functionImport: EdmxFunctionImport
): EdmxFunction | undefined {
  return findActionFunctionByImportName(
    functions,
    functionImport.Function,
    'function'
  );
}

const extractResponse = (response: string) => `${response}.value`;

export function generateFunctionImportsV4(
  serviceMetadata: ServiceMetadata,
  entities: VdmEntity[],
  complexTypes: Omit<VdmComplexType, 'factoryName'>[],
  formatter: ServiceNameFormatter
): VdmFunctionImport[] {
  const functions = parseFunctions(serviceMetadata.edmx.root);
  const functionImports = parseFunctionImports(serviceMetadata.edmx.root);

  return functionImports
    .map(functionImport => {
      const edmxFunction = findFunctionForFunctionImport(
        functions,
        functionImport
      );
      // TODO 1571 remove when supporting entity type as parameter
      if (!edmxFunction || hasUnsupportedParameterTypes(edmxFunction)) {
        return undefined;
      }

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
          edmxFunction.ReturnType?.Type,
          entities,
          complexTypes,
          extractResponse,
          serviceMetadata.edmx.oDataVersion
        )
      };
    })
    .filter(e => e) as VdmFunctionImport[];
}
