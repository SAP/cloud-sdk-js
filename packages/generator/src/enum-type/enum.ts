import { StructureKind } from 'ts-morph';
import { addLeadingNewline, enumDocs } from '../typedoc';
import type { EnumDeclarationStructure } from 'ts-morph';
import type { VdmEnumType } from '../vdm-types';

/**
 * @internal
 */
export function enumTypeClass(enumType: VdmEnumType): EnumDeclarationStructure {
  return {
    kind: StructureKind.Enum,
    name: enumType.typeName,
    isExported: true,
    members: enumType.members.map(member => ({
      name: member.name,
      value: member.name,
      docs: [addLeadingNewline(`Original value: ${member.originalValue}`)]
    })),
    docs: [enumDocs(enumType)]
  };
}
