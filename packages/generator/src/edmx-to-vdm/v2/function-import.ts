/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ServiceNameFormatter } from '../../service-name-formatter';
import { transformFunctionImportBase } from '../common';
import { VdmFunctionImport } from '../../vdm-types';
import { swaggerDefinitionForFunctionImport } from '../../edmx-parser/swagger/swagger-parser';
import { parseFunctionImports } from '../../edmx-parser/v2';
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';

export function generateFunctionImportsV2(
  serviceMetadata: ServiceMetadata,
  formatter: ServiceNameFormatter
): Omit<VdmFunctionImport, 'returnType'>[] {
  const edmxFunctionImports = parseFunctionImports(serviceMetadata.edmx.root);

  return edmxFunctionImports.map(f => {
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
      returnTypeEdmx: f.ReturnType
    };
  });
}
