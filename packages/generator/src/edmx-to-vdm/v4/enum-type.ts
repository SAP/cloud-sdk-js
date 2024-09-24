import type { ServiceNameFormatter } from '../../service-name-formatter';
import { parseEnumTypes } from '../../edmx-parser/v4/edmx-parser';
import type { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
import type { VdmEnumType } from '../../vdm-types';
import { transformEnumTypesBase } from '../common/enum-type';

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
