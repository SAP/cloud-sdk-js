import { ServiceNameFormatter } from '../../service-name-formatter';
import { transformFunctionImportBase } from '../common/function-import';
import { parseFunctionImportReturnTypes } from '../common/action-function-return-types';
import { VdmComplexType, VdmEntity, VdmFunctionImport } from '../../vdm-types';
import { swaggerDefinitionForFunctionImport } from '../../swagger-parser/swagger-parser';
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
): VdmFunctionImport[] {
  const edmxFunctionImports = parseFunctionImportsV2(serviceMetadata.edmx.root);

  return (
    edmxFunctionImports
      // TODO 1571 remove when supporting entity type as parameter
      .filter(functionImport => !hasUnsupportedParameterTypes(functionImport, false))
      .map(f => {
        const httpMethod = f['m:HttpMethod'].toLowerCase();
        const swaggerDefinition = swaggerDefinitionForFunctionImport(
          f.Name,
          httpMethod,
          serviceMetadata.swagger
        );

        return {
          ...transformFunctionImportBase(
            f,
            f.Parameter,
            swaggerDefinition,
            formatter, false
          ),
          httpMethod,
          returnType: parseFunctionImportReturnTypes(
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
