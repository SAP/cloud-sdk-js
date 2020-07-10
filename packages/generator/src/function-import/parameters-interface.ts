/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { InterfaceDeclarationStructure, StructureKind } from 'ts-morph';
import { VdmFunctionImport } from '../edmx-to-vdm/vdm-types';
import { addLeadingNewline } from '../typedoc';

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
      docs: [addLeadingNewline(parameter.description)]
    })),
    docs: [
      addLeadingNewline(
        `Type of the parameters to be passed to [[${functionImport.functionName}]].`
      )
    ]
  };
}
