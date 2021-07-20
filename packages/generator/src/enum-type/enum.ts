import { EnumDeclarationStructure, StructureKind } from 'ts-morph';
import BigNumber from 'bignumber.js';
import { VdmEnumType } from '../vdm-types';

export function enumTypeClass(enumType: VdmEnumType): EnumDeclarationStructure {
  return {
    kind: StructureKind.Enum,
    name: enumType.typeName,
    isExported: true,
    members: Object.entries(enumType.members).map(([key,value]) => ({
      name: key,
      value: enumType.underlyingType === 'Edm.Int64' ? `${fromBigNumber(value as BigNumber)}L` : value as number
    }))
  };
}

const fromBigNumber = (value: BigNumber): string =>
  (value as BigNumber).toString();
