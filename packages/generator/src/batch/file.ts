/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { SourceFileStructure, StructureKind } from 'ts-morph';
import { VdmServiceMetadata } from '../service-vdm/vdm-types';
import { batchFunction, changesetFunction } from './function';
import { importBatchDeclarations } from './imports';
import { readRequestType, writeReqeustType } from './type';

export function batchSourceFile(
  service: VdmServiceMetadata
): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...importBatchDeclarations(service),
      batchFunction(service),
      changesetFunction(service),
      `export const default${service.className}Path = '/sap/opu/odata/sap/${service.namespace}';`,
      `const map = ${mappingInitializer(service)};`,
      readRequestType(service),
      writeReqeustType(service)
    ]
  };
}

function mappingInitializer(service: VdmServiceMetadata): string {
  const mapBody = service.entities
    .map(e => `\'${e.entitySetName}\' : ${e.className}`)
    .join(', ');
  return `{${mapBody}}`;
}
