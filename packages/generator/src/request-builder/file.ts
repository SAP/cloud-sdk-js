/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { SourceFileStructure, StructureKind } from 'ts-morph';
import { VdmEntity, VdmServiceMetadata } from '../vdm-types';
import { requestBuilderClass } from './class';
import { importDeclarations } from './imports';

export function requestBuilderSourceFile(
  entity: VdmEntity,
  service: VdmServiceMetadata
): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...importDeclarations(entity, service),
      requestBuilderClass(entity)
    ]
  };
}
