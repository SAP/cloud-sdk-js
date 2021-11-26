import { ServiceNameFormatter } from '../../service-name-formatter';
import {
  transformFunctionImportBase,
  parseFunctionImportReturnTypes
} from '../common';
import { VdmComplexType, VdmEntity, VdmFunctionImport } from '../../vdm-types';
import { swaggerDefinitionForFunctionImport } from '../../swagger-parser';
import { parseFunctionImportsV2 } from '../../edmx-parser/v2';
import { ServiceMetadata } from '../../edmx-parser';
import { hasUnsupportedParameterTypes } from '../edmx-to-vdm-util';

const extractResponse = (functionName: string) => (response: string) =>
  `${response}.${functionName}`;

// eslint-disable-next-line valid-jsdoc
/**
 * @internal
 */
export function generateFunctionImportsV2(
  serviceMetadata: ServiceMetadata,
  entities: VdmEntity[],
  complexTypes: Omit<VdmComplexType, 'factoryName'>[],
  formatter: ServiceNameFormatter
): VdmFunctionImport[] {
  const edmxFunctionImports = parseFunctionImportsV2(serviceMetadata.edmx.root);

  return (
    edmxFunctionImports
      // TODO 1571 remove when supporting entity type as parameter
      .filter(functionImport => !hasUnsupportedParameterTypes(functionImport))
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
            formatter
          ),
          httpMethod,
          returnType: parseFunctionImportReturnTypes(
            f.ReturnType
              ? { Type: f.ReturnType, Nullable: 'false' }
              : undefined,
            entities,
            complexTypes,
            extractResponse(f.Name)
          )
        };
      })
  );
}
