/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  parseComplexTypesBase,
  transformComplexTypesBase
} from '../common/edmx-complex-type-parser';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmComplexType } from '../../vdm-types';
import { ParsedServiceMetadata } from '../edmx-parser';

function parseComplexTypes(root) {
  return parseComplexTypesBase(root);
}

export function transformComplexTypesV2(
  serviceMetadata: ParsedServiceMetadata,
  formatter: ServiceNameFormatter
): VdmComplexType[] {
  return transformComplexTypesBase(
    parseComplexTypes(serviceMetadata.edmx.root),
    formatter
  );
}
