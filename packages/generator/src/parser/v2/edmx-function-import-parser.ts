import {
  EdmxNamed,
  EdmxParameter, parseReturnType,
  swaggerDefinitionForFunctionImport

} from '../common';
import { forceArray } from '../../generator-utils';
import { ParsedServiceMetadata } from '../parsed-service-metadata';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { transformFunctionImportBase } from '../common/edmx-function-import-parser';
import { VdmFunctionImport } from '../../vdm-types';



export interface EdmxFunctionImport extends EdmxNamed {
  EntitySet?: string;
  ReturnType: string;
  'sap:action-for': string;
  Parameter: EdmxParameter[];
  'm:HttpMethod': string;
}

export function parseFunctionImports(root):EdmxFunctionImport[]{
  return forceArray(root.EntityContainer.FunctionImport).map(f => {
    f.Parameter = forceArray(f.Parameter);
    return f;
  });
}


export function transformFunctionImportsWithoutReturnTypeV2(
  serviceMetadata: ParsedServiceMetadata,
  formatter: ServiceNameFormatter
): Omit<VdmFunctionImport, 'returnType' >[] {
  const edmxFunctionImports = parseFunctionImports(serviceMetadata.edmx.root)

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
      httpMethod
    };
  });
}
