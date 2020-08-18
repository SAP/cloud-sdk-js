/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { ServiceNameFormatter } from '../../service-name-formatter';
import { parseEnumTypes } from '../../edmx-parser/v4';
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
import { VdmEnumType } from '../../vdm-types';
import { transformEnumTypesBase } from '../common/enum-type';

export function generateEnumTypesV4(
  serviceMetadata: ServiceMetadata,
  formatter: ServiceNameFormatter
): VdmEnumType[] {
  return transformEnumTypesBase(
    parseEnumTypes(serviceMetadata.edmx.root),
    formatter
  );
}
