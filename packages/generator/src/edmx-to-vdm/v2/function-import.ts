import { transformOperationBase, parseOperationReturnType } from '../common';
import { getSwaggerDefinitionForOperation } from '../../swagger-parser';
import { parseFunctionImportsV2 } from '../../edmx-parser';
import { hasUnsupportedParameterTypes } from '../edmx-to-vdm-util';
import type { ServiceMetadata } from '../../edmx-parser';
import type { VdmComplexType, VdmEntity, VdmOperation } from '../../vdm-types';
import type { ServiceNameFormatter } from '../../service-name-formatter';

const extractResponse = (functionName: string) => (response: string) =>
  `${response}.${functionName}`;

/**
 * @internal
 */
export function generateFunctionImportsV2(
  serviceMetadata: ServiceMetadata,
  serviceName: string,
  entities: VdmEntity[],
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter
): VdmOperation[] {
  const edmxFunctionImports = parseFunctionImportsV2(serviceMetadata.edmx.root);

  return (
    edmxFunctionImports
      // TODO 1571 remove when supporting entity type as parameter
      .filter(functionImport => !hasUnsupportedParameterTypes(functionImport))
      .map(f => {
        const httpMethod = f['m:HttpMethod'].toLowerCase();
        const swaggerDefinition = getSwaggerDefinitionForOperation(
          f.Name,
          httpMethod,
          serviceMetadata.swagger
        );

        return {
          ...transformOperationBase(
            f,
            f.Parameter,
            'function',
            swaggerDefinition,
            formatter,
            undefined // oData v2 does not have bound functions
          ),
          httpMethod,
          returnType: parseOperationReturnType(
            f.ReturnType
              ? { Type: f.ReturnType, Nullable: 'false' }
              : undefined,
            entities,
            complexTypes,
            extractResponse(f.Name),
            serviceName
          )
        };
      })
  );
}
