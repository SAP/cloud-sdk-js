/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { forceArray } from '../../generator-utils';
import { VdmFunctionImportReturnTypeNotParsed } from '../../vdm-types';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { ServiceMetadata } from '../util/edmx-types';
import { stripNamespace } from '../util/parser-util';
import { transformFunctionImportBase } from '../common/function-import-parser';
import { swaggerDefinitionForFunctionImport } from '../swagger/swagger-parser';
import {
  EdmxDerivedType,
  EdmxFunction,
  EdmxFunctionImport
} from './edmx-types';

function parseFunctionImports(root): EdmxFunctionImport[] {
  return forceArray(root.EntityContainer.FunctionImport);
}

function parseFunctions(root): EdmxFunction[] {
  return forceArray(root.Function).map(f => {
    f.Parameter = forceArray(f.Parameter);
    return f;
  });
}

export function transformFunctionImportsWithoutReturnTypeV4(
  serviceMetadata: ServiceMetadata,
  formatter: ServiceNameFormatter
): VdmFunctionImportReturnTypeNotParsed[] {
  const functions = parseFunctions(serviceMetadata.edmx.root);
  const functionImports = parseFunctionImports(serviceMetadata.edmx.root);

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
      returnTypeEdmx: edmxFunction.ReturnType?.Type
    };
  });
}

/**
 * Recursively adds the base type data to the current type
 * @param type An EDMX type that can have a base type (e. g. EntityType or ComplexType)
 * @param types All parsed EDMX types
 * @param joinTypes Function to ultimatively join types
 * @returns The enriched type (type + basetype)
 */
export function joinTypeWithBaseType<T extends EdmxDerivedType>(
  type: T,
  types: T[],
  joinTypes: (type: T, baseType: T) => T
): T {
  if (type.BaseType) {
    const baseType = types.find(e => e.Name === stripNamespace(type.BaseType!));

    if (!baseType) {
      throw new Error(
        `Type ${type.BaseType} not found, but defined as BaseType of Type ${type.Name}.`
      );
    }

    return joinTypes(type, joinTypeWithBaseType(baseType, types, joinTypes));
  }
  return type;
}

export function joinTypesWithBaseTypes<T extends EdmxDerivedType>(
  types: T[],
  joinTypes: (type: T, baseType: T) => T
): T[] {
  return types.map(type => joinTypeWithBaseType(type, types, joinTypes));
}
