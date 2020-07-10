/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  parseComplexTypesBase,
  transformComplexTypesBase
} from '../common/complex-type-parser';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmComplexType } from '../../vdm-types';
import { ServiceMetadata } from '../util/edmx-types';

function parseComplexTypes(root) {
  return parseComplexTypesBase(root);
}

export function getComplexTypesV2(
  serviceMetadata: ServiceMetadata,
  formatter: ServiceNameFormatter
): VdmComplexType[] {
  return transformComplexTypesBase(
    parseComplexTypes(serviceMetadata.edmx.root),
    formatter
  );
}
