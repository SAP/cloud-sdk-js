/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { transformComplexTypesBase } from '../common/complex-type-vdm';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmComplexType } from '../vdm-types';
import { EdmxComplexType } from '../../parser/v4/edmx-types';
import { parseComplexTypes } from '../../parser/v4/edmx-parser';
import { ServiceMetadata } from '../../parser/edmx-file-reader';

export function joinComplexTypes(
  complexType: EdmxComplexType,
  baseType: EdmxComplexType
): EdmxComplexType {
  return {
    ...complexType,
    Property: [...complexType.Property, ...baseType.Property]
  };
}

export function getComplexTypesV4(
  serviceMetadata: ServiceMetadata,
  formatter: ServiceNameFormatter
): VdmComplexType[] {
  return transformComplexTypesBase(
    parseComplexTypes(serviceMetadata.edmx.root),
    formatter
  );
}
