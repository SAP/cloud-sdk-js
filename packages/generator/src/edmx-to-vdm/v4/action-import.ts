/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ServiceNameFormatter } from '../../service-name-formatter';
import { transformFunctionImportBase } from '../common';
import { swaggerDefinitionForFunctionImport } from '../../swagger-parser/swagger-parser';
import { parseActionImport, parseActions } from '../../edmx-parser/v4';
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
import { VdmActionImport, VdmComplexType, VdmEntity } from '../../vdm-types';
import { parseActionImportReturnTypes } from '../common/action-function-return-types';
import { findActionForActionImport } from './action-function-util';

export function generateActionImportsV4(
  serviceMetadata: ServiceMetadata,
  entities: VdmEntity[],
  complexTypes: Omit<VdmComplexType, 'factoryName'>[],
  formatter: ServiceNameFormatter
): VdmActionImport[] {
  const actions = parseActions(serviceMetadata.edmx.root);
  const actionImports = parseActionImport(serviceMetadata.edmx.root);

  return actionImports.map(actionImport => {
    const edmxAction = findActionForActionImport(actions, actionImport);

    const httpMethod = 'post';
    const swaggerDefinition = swaggerDefinitionForFunctionImport(
      actionImport.Name,
      httpMethod,
      serviceMetadata.swagger
    );

    return {
      ...transformFunctionImportBase(
        actionImport,
        edmxAction.Parameter || [],
        swaggerDefinition,
        formatter
      ),
      httpMethod,
      returnType: parseActionImportReturnTypes(
        edmxAction.ReturnType?.Type,
        entities,
        complexTypes
      )
    };
  });
}
