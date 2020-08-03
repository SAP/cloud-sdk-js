/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { toTypeNameFormat } from '@sap-cloud-sdk/core';
import { createLogger } from '@sap-cloud-sdk/util';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmActionImportBase } from '../../vdm-types';
import { SwaggerPath } from '../../swagger-parser/swagger-types';
import { actionImportDescription } from '../description-util';
import { EdmxParameter } from '../../edmx-parser/common';
import { EdmxActionImport } from '../../edmx-parser/v4';
import { getActionImportParameters } from './action-function-parameters';

const logger = createLogger({
  package: 'generator',
  messageContext: 'function-import'
});

export function transformActionImportBase(
  edmxActionImport: EdmxActionImport,
  edmxParameters: EdmxParameter[],
  swaggerDefinition: SwaggerPath | undefined,
  formatter: ServiceNameFormatter
): VdmActionImportBase {
  const actionName = formatter.originalToActionImportName(
    edmxActionImport.Name
  );
  const actiononImport = {
    originalName: edmxActionImport.Name,
    name: actionName,
    parametersTypeName: toTypeNameFormat(`${actionName}Parameters`)
  };

  const parameters = getActionImportParameters(
    edmxActionImport,
    edmxParameters,
    swaggerDefinition,
    formatter
  );

  return {
    ...actiononImport,
    parameters,
    description: actionImportDescription(
      swaggerDefinition,
      actiononImport.originalName
    )
  };
}
