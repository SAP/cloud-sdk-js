/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  EdmxComplexType,
  parseComplexTypesBase,
  transformComplexTypesBase
} from '../common/edmx-complex-type-parser';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmComplexType } from '../../vdm-types';
import { ParsedServiceMetadata } from '../edmx-parser';
import { joinTypesWithBaseTypes } from './edmx-parser-util';

function parseComplexType(root): EdmxComplexType[] {
  return joinTypesWithBaseTypes(parseComplexTypesBase(root), joinComplexTypes);
}

export function joinComplexTypes(
  complexType: EdmxComplexType,
  baseType: EdmxComplexType
): EdmxComplexType {
  return {
    ...complexType,
    Property: [...complexType.Property, ...baseType.Property]
  };
}

export function transformComplexTypesV4(
  serviceMetadata: ParsedServiceMetadata,
  formatter: ServiceNameFormatter
): VdmComplexType[] {
  return transformComplexTypesBase(
    parseComplexType(serviceMetadata.edmx.root),
    formatter
  );
}
