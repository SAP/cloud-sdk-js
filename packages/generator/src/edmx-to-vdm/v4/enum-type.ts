import { ServiceNameFormatter } from '../../service-name-formatter';
import { parseEnumTypes } from '../../edmx-parser/v4';
import { ServiceMetadata } from '../../edmx-parser';
import { VdmEnumType } from '../../vdm-types';
import { transformEnumTypesBase } from '../common';

// eslint-disable-next-line valid-jsdoc
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
