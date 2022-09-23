import { transformComplexTypesBase } from '../common/complex-type';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmComplexType } from '../../vdm-types';
import { parseComplexTypesV2 } from '../../edmx-parser/v2/edmx-parser';
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';

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
