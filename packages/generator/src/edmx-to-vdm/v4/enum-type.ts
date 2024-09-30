import type { ServiceNameFormatter } from '../../service-name-formatter';
import { parseEnumTypes } from '../../edmx-parser';
import type { ServiceMetadata } from '../../edmx-parser';
import type { VdmEnumType } from '../../vdm-types';
import { transformEnumTypesBase } from '../common';

/**
 * @internal
 */
export function generateEnumTypesV4(
  serviceMetadata: ServiceMetadata,
  formatter: ServiceNameFormatter
): VdmEnumType[] {
  return transformEnumTypesBase(
    parseEnumTypes(serviceMetadata.edmx.root),
    formatter
  );
}
