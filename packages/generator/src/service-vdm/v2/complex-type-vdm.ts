/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { transformComplexTypesBase } from '../common/complex-type-vdm';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmComplexType } from '../vdm-types';
import { ServiceMetadata } from '../../parser/util/edmx-types';
import { parseComplexTypes } from '../../parser/v2/edmx-parser';

export function getComplexTypesV2(
  serviceMetadata: ServiceMetadata,
  formatter: ServiceNameFormatter
): VdmComplexType[] {
  return transformComplexTypesBase(
    parseComplexTypes(serviceMetadata.edmx.root),
    formatter
  );
}
