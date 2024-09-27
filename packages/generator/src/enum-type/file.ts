import type { SourceFileStructure } from 'ts-morph';
import { StructureKind } from 'ts-morph';
import type { VdmEnumType } from '../vdm-types';
import { enumTypeClass } from './enum';

/**
 * @internal
 */
export function enumTypeSourceFile(enumType: VdmEnumType): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [enumTypeClass(enumType)]
  };
}
