/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { toTypeNameFormat } from '@sap-cloud-sdk/core';
import { createLogger } from '@sap-cloud-sdk/util';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmFunctionImportBase } from '../../vdm-types';
import { SwaggerPath } from '../../swagger-parser/swagger-types';
import { functionImportDescription } from '../description-util';
import { EdmxParameter } from '../../edmx-parser/common';
import { EdmxFunctionImport as EdmxFunctionImportV2 } from '../../edmx-parser/v2';
import { EdmxFunctionImport as EdmxFunctionImportV4 } from '../../edmx-parser/v4';
import { getFunctionImportParameters } from './action-function-parameters';

const logger = createLogger({
  package: 'generator',
  messageContext: 'function-import'
});

export function transformFunctionImportBase(
  edmxFunctionImport: EdmxFunctionImportV2 | EdmxFunctionImportV4,
  edmxParameters: EdmxParameter[],
  swaggerDefinition: SwaggerPath | undefined,
  formatter: ServiceNameFormatter
): VdmFunctionImportBase {
  const name = formatter.originalToFunctionImportName(edmxFunctionImport.Name);
  const functionImport = {
    originalName: edmxFunctionImport.Name,
    name,
    parametersTypeName: toTypeNameFormat(`${name}Parameters`)
  };

  const parameters = getFunctionImportParameters(
    edmxFunctionImport,
    edmxParameters,
    swaggerDefinition,
    formatter
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
