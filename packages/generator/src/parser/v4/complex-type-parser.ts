/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  parseComplexTypesBase,
  transformComplexTypesBase
} from '../common/complex-type-parser';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmComplexType } from '../../vdm-types';
import { ServiceMetadata } from '../util/edmx-types';
import { EdmxComplexType } from '../common/edmx-types';
import { joinTypesWithBaseTypes } from './function-import-parser';

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
  serviceMetadata: ServiceMetadata,
  formatter: ServiceNameFormatter
): VdmComplexType[] {
  return transformComplexTypesBase(
    parseComplexType(serviceMetadata.edmx.root),
    formatter
  );
}
