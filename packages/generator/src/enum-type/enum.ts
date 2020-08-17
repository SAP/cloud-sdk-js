/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EnumDeclarationStructure, StructureKind } from 'ts-morph';
import { VdmEnumType } from '../vdm-types';

export function enumTypeClass(enumType: VdmEnumType): EnumDeclarationStructure {
  return {
    kind: StructureKind.Enum,
    name: enumType.typeName,
    isExported: true,
    members: enumType.members.map(m => ({
      name: m,
      value: m
    }))
  };
}
