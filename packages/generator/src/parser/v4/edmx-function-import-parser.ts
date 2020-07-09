import { forceArray } from '../../generator-utils';
import { EdmxNamed, EdmxParameter, parseReturnType, swaggerDefinitionForFunctionImport } from '../common';
import { ParsedServiceMetadata } from '../parsed-service-metadata';
import { VdmFunctionImport, VdmFunctionImportReturnTypeNotParsed } from '../../vdm-types';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { stripNamespace } from '../parser-util';
import { transformFunctionImportBase } from '../common/edmx-function-import-parser';


export interface EdmxFunctionImport extends EdmxNamed {
   EntitySet?: string;
   Function: string;
 }

export interface EdmxFunction extends EdmxNamed {
  ReturnType: { Type: string };
  Parameter: EdmxParameter[];
  IsBound: boolean;
}

function parseFunctionImports(root):EdmxFunctionImport[]{
  return forceArray(root.EntityContainer.FunctionImport)
}

function parseFunctions(root): EdmxFunction[] {
  return forceArray(root.Function).map(f => {
    f.Parameter = forceArray(f.Parameter);
    return f;
  });
}

export function transformFunctionImportsWithoutReturnTypeV4(
  serviceMetadata: ParsedServiceMetadata,
  formatter: ServiceNameFormatter
): VdmFunctionImportReturnTypeNotParsed[] {
  const functions = parseFunctions(serviceMetadata.edmx.root)
  const functionImports = parseFunctionImports(serviceMetadata.edmx.root)

  return functionImports.map(f => {
    const edmxFunction = functions.find(
      fn => stripNamespace(f.Function) === fn.Name
    );
    if (!edmxFunction) {
      throw Error(
        `Unable to find a function with name: ${f.Function}, but specified in function import ${f.Name}`
      );
    }

    const httpMethod = 'get';
    const swaggerDefinition = swaggerDefinitionForFunctionImport(
      f.Name,
      httpMethod,
      serviceMetadata.swagger
    );

    return {
      ...transformFunctionImportBase(
        f,
        edmxFunction.Parameter,
        swaggerDefinition,
        formatter
      ),
      httpMethod,
      returnTypeEdmx:f.ReturnType
    };
  });
}
