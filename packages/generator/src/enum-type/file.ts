import { StructureKind } from 'ts-morph';
import { enumTypeClass } from './enum';
import type { SourceFileStructure } from 'ts-morph';
import type { VdmEnumType } from '../vdm-types';

/**
 * @internal
 */
export function enumTypeSourceFile(enumType: VdmEnumType): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [enumTypeClass(enumType)]
  };
}
