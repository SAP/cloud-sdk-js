import { transformComplexTypesBase } from '../common';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmComplexType } from '../../vdm-types';
import { parseComplexTypesV2 } from '../../edmx-parser/v2';
import { ServiceMetadata } from '../../edmx-parser';

// eslint-disable-next-line valid-jsdoc
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
