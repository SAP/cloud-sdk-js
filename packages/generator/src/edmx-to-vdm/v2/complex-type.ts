import { transformComplexTypesBase } from '../common';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmComplexType } from '../../vdm-types';
import { parseComplexTypes } from '../../edmx-parser/v2';
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export function generateComplexTypesV2(
  serviceMetadata: ServiceMetadata,
  formatter: ServiceNameFormatter
): Omit<VdmComplexType, 'factoryName'>[] {
  return transformComplexTypesBase(
    parseComplexTypes(serviceMetadata.edmx.root),
    [],
    formatter
  );
}
