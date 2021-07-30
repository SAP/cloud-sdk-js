import { EnumDeclarationStructure, StructureKind } from 'ts-morph';
import { VdmEnumType } from '../vdm-types';
import { addLeadingNewline, enumDocs } from '../typedoc';

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
