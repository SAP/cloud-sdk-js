/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { transformComplexTypesBase } from '../common/complex-type';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmComplexType } from '../../vdm-types';
import { parseComplexTypes } from '../../edmx-parser/v2/edmx-parser';
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';

export function generateComplexTypesV2(
  serviceMetadata: ServiceMetadata,
  formatter: ServiceNameFormatter
): VdmComplexType[] {
  return transformComplexTypesBase(
    parseComplexTypes(serviceMetadata.edmx.root),
    formatter
  );
}
