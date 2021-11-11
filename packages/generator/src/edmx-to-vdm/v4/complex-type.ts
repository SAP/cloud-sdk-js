import { transformComplexTypesBase } from '../common';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmComplexType, VdmEnumType } from '../../vdm-types';
import { parseComplexTypes } from '../../edmx-parser/v4';
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export function generateComplexTypesV4(
  serviceMetadata: ServiceMetadata,
  enumTypes: VdmEnumType[],
  formatter: ServiceNameFormatter
): Omit<VdmComplexType, 'factoryName'>[] {
  return transformComplexTypesBase(
    parseComplexTypes(serviceMetadata.edmx.root),
    enumTypes,
    formatter
  );
}
