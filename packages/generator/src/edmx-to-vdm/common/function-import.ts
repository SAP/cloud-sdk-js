import { pascalCase } from '@sap-cloud-sdk/util';
import { EdmxParameter } from '../../edmx-parser/common';
import { EdmxFunctionImportV2 } from '../../edmx-parser/v2';
import { EdmxFunctionImportV4 } from '../../edmx-parser/v4';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { SwaggerPath } from '../../swagger-parser';
import { VdmFunctionImportBase } from '../../vdm-types';
import { functionImportDescription } from '../description-util';
import { getFunctionImportParameters } from './action-function-parameters';

/**
 * @internal
 */
export function transformFunctionImportBase(
  edmxFunctionImport: EdmxFunctionImportV2 | EdmxFunctionImportV4,
  edmxParameters: EdmxParameter[],
  swaggerDefinition: SwaggerPath | undefined,
  formatter: ServiceNameFormatter,
  bindingEntitySetName?: string
): VdmFunctionImportBase {
  const name = bindingEntitySetName ? formatter.originalToBoundFunctionImportName(bindingEntitySetName, edmxFunctionImport.Name) : formatter.originalToFunctionImportName(edmxFunctionImport.Name);
  const functionImport = {
    originalName: edmxFunctionImport.Name,
    name,
    parametersTypeName: pascalCase(`${name}Parameters`)
  };

  const parameters = getFunctionImportParameters(
    edmxFunctionImport,
    edmxParameters,
    swaggerDefinition,
    formatter,
    bindingEntitySetName
  );

  return {
    ...functionImport,
    parameters,
    description: functionImportDescription(
      swaggerDefinition,
      functionImport.originalName
    )
  };
}
