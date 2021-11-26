import { transformComplexTypesBase } from '../common';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmComplexType, VdmEnumType } from '../../vdm-types';
import { parseComplexTypesV4 } from '../../edmx-parser/v4';
import { ServiceMetadata } from '../../edmx-parser';

// eslint-disable-next-line valid-jsdoc
/**
 * @internal
 */
export function generateComplexTypesV4(
  serviceMetadata: ServiceMetadata,
  enumTypes: VdmEnumType[],
  formatter: ServiceNameFormatter
): Omit<VdmComplexType, 'factoryName'>[] {
  return transformComplexTypesBase(
    parseComplexTypesV4(serviceMetadata.edmx.root),
    enumTypes,
    formatter
  );
}
