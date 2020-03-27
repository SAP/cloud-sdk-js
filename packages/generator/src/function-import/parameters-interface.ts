/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { InterfaceDeclarationStructure, StructureKind } from 'ts-morph';
import { VdmFunctionImport } from '../vdm-types';
import { makeBlockComment } from '../typedoc';

export function functionImportParametersInterface(
  functionImport: VdmFunctionImport
): InterfaceDeclarationStructure {
  return {
    kind: StructureKind.Interface,
    name: functionImport.parametersTypeName,
    isExported: true,
    properties: functionImport.parameters.map(parameter => ({
      name: parameter.parameterName,
      type: parameter.jsType,
      hasQuestionToken: parameter.nullable,
      docs: [makeBlockComment(parameter.description)]
    })),
    docs: [
      makeBlockComment(
        `Type of the parameters to be passed to [[${functionImport.functionName}]].`
      )
    ]
  };
}
