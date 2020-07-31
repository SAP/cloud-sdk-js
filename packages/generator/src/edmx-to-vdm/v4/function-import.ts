/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ServiceNameFormatter } from '../../service-name-formatter';
import { transformFunctionImportBase } from '../common';
import { swaggerDefinitionForFunctionImport } from '../../swagger-parser/swagger-parser';
import { parseFunctionImports, parseFunctions } from '../../edmx-parser/v4';
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
import { VdmComplexType, VdmEntity, VdmFunctionImport } from '../../vdm-types';
import { parseFunctionImportReturnTypes } from '../common/action-function-return-types';
import { findFunctionForFunctionImport } from './action-function-util';

export function generateFunctionImportsV4(
  serviceMetadata: ServiceMetadata,
  entities: VdmEntity[],
  complexTypes: Omit<VdmComplexType, 'factoryName'>[],
  formatter: ServiceNameFormatter
): VdmFunctionImport[] {
  const functions = parseFunctions(serviceMetadata.edmx.root);
  const functionImports = parseFunctionImports(serviceMetadata.edmx.root);

  return functionImports.map(functionImport => {
    const edmxFunction = findFunctionForFunctionImport(
      functions,
      functionImport
    );

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
        complexTypes
      )
    };
  });
}
