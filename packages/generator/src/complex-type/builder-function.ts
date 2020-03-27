/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { FunctionDeclarationStructure, StructureKind } from 'ts-morph';
import { VdmComplexType } from '../vdm-types';
import { makeBlockComment } from '../typedoc';

export function builderFunction(
  complexType: VdmComplexType
): FunctionDeclarationStructure {
  return {
    kind: StructureKind.Function,
    name: complexType.factoryName,
    isExported: true,
    parameters: [
      {
        name: 'json',
        type: 'any'
      }
    ],
    returnType: complexType.typeName,
    statements: `return ${complexType.typeName}.build(json);`,
    docs: [
      makeBlockComment(
        `@deprecated since v1.6.0. Use [[${complexType.typeName}.build]] instead.`
      )
    ]
  };
}
