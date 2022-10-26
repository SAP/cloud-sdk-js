import { pascalCase } from '@sap-cloud-sdk/util';
import { EdmxParameter } from '../../edmx-parser/common';
import { EdmxActionImport } from '../../edmx-parser/v4';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { SwaggerPath } from '../../swagger-parser/swagger-types';
import { VdmActionImportBase } from '../../vdm-types';
import { actionImportDescription } from '../description-util';
import { getActionImportParameters } from './action-function-parameters';

/**
 * @internal
 */
export function transformActionImportBase(
  edmxActionImport: EdmxActionImport,
  edmxParameters: EdmxParameter[],
  swaggerDefinition: SwaggerPath | undefined,
  formatter: ServiceNameFormatter,
  bindingEntitySetName?: string
): VdmActionImportBase {
  const name = bindingEntitySetName ? formatter.originalToBoundActionImportName(bindingEntitySetName, edmxActionImport.Name) : formatter.originalToActionImportName(edmxActionImport.Name);
  const actionImport = {
    originalName: edmxActionImport.Name,
    name,
    parametersTypeName: pascalCase(`${name}Parameters`)
  };

  const parameters = getActionImportParameters(
    edmxActionImport,
    edmxParameters,
    swaggerDefinition,
    formatter,
    bindingEntitySetName
  );

  return {
    ...actionImport,
    parameters,
    description: actionImportDescription(
      swaggerDefinition,
      actionImport.originalName
    )
  };
}
