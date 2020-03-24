/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { SourceFileStructure, StructureKind } from 'ts-morph';
import { VdmEntity } from '../vdm-types';
import { requestBuilderClass } from './class';
import { importDeclarations } from './imports';

export function requestBuilderSourceFile(
  entity: VdmEntity
): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [...importDeclarations(entity), requestBuilderClass(entity)]
  };
}
