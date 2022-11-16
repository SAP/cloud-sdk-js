import { ServiceNameFormatter } from '../../service-name-formatter';
import { transformOperationBase } from '../common/operation';
import { parseOperationReturnType } from '../common/operation-return-type';
import { VdmComplexType, VdmEntity, VdmOperation } from '../../vdm-types';
import { getSwaggerDefinitionForOperation } from '../../swagger-parser/swagger-parser';
import { parseFunctionImportsV2 } from '../../edmx-parser/v2/edmx-parser';
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
import { hasUnsupportedParameterTypes } from '../edmx-to-vdm-util';

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
            undefined // oData v2 does not have bound funcitons
          ),
          httpMethod,
          returnType: parseOperationReturnType(
            f.ReturnType
              ? { Type: f.ReturnType, Nullable: 'false' }
              : undefined,
            entities,
            complexTypes,
            extractResponse(f.Name),
            serviceName,
            false
          )
        };
      })
  );
}
