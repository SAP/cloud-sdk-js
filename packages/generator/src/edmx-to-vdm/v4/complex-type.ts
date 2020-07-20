/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { transformComplexTypesBase } from '../common';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmComplexType } from '../../vdm-types';
import { parseComplexTypes } from '../../edmx-parser/v4';
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';

export function generateComplexTypesV4(
  serviceMetadata: ServiceMetadata,
  formatter: ServiceNameFormatter
): Omit<VdmComplexType, 'factoryName'>[] {
  return transformComplexTypesBase(
    parseComplexTypes(serviceMetadata.edmx.root),
    formatter
  );
}
