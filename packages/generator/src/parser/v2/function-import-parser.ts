/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { forceArray } from '../../generator-utils';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { transformFunctionImportBase } from '../common/function-import-parser';
import { VdmFunctionImportReturnTypeNotParsed } from '../../vdm-types';
import { ServiceMetadata } from '../util/edmx-types';
import { swaggerDefinitionForFunctionImport } from '../util/some-util-find-good-name';
import { EdmxFunctionImport } from './edmx-types';

export function parseFunctionImports(root): EdmxFunctionImport[] {
  return forceArray(root.EntityContainer.FunctionImport).map(f => {
    f.Parameter = forceArray(f.Parameter);
    return f;
  });
}

export function transformFunctionImportsWithoutReturnTypeV2(
  serviceMetadata: ServiceMetadata,
  formatter: ServiceNameFormatter
): VdmFunctionImportReturnTypeNotParsed[] {
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
