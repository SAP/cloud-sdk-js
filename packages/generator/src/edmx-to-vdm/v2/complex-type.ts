import { transformComplexTypesBase } from '../common';
import { parseComplexTypesV2 } from '../../edmx-parser';
import type { ServiceNameFormatter } from '../../service-name-formatter';
import type { VdmComplexType } from '../../vdm-types';
import type { ServiceMetadata } from '../../edmx-parser';

/**
 * @internal
 */
export function generateComplexTypesV2(
  serviceMetadata: ServiceMetadata,
  formatter: ServiceNameFormatter
): VdmComplexType[] {
  return transformComplexTypesBase(
    parseComplexTypesV2(serviceMetadata.edmx.root),
    [],
    formatter
  );
}
