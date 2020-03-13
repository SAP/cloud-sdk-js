/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { SourceFileStructure, StructureKind } from 'ts-morph';
import { VdmComplexType } from '../vdm-types';
import { builderFunction } from './builder-function';
import { fieldTypeClass } from './field-type-class';
import { importDeclarations } from './imports';
import { complexTypeInterface } from './interface';
import { complexTypeNamespace } from './namespace';

export function complexTypeSourceFile(complexType: VdmComplexType): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...importDeclarations(complexType),
      complexTypeInterface(complexType),
      builderFunction(complexType),
      fieldTypeClass(complexType),
      complexTypeNamespace(complexType)
    ]
  };
}
