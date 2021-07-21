import { EnumDeclarationStructure, StructureKind } from 'ts-morph';
import BigNumber from 'bignumber.js';
import { VdmEnumType } from '../vdm-types';
import { enumDocs } from '../typedoc';

export function enumTypeClass(enumType: VdmEnumType): EnumDeclarationStructure {
  return {
    kind: StructureKind.Enum,
    name: enumType.typeName,
    isExported: true,
    members: Object.keys(enumType.members).map(key => ({
      name: key,
      value: key
    })),
    docs: [enumDocs(enumType)]
  };
}
