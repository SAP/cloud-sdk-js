import { ServiceNameFormatter } from '../../service-name-formatter';
import { generateFunctionImportsV2 } from './function-import';
import { generateComplexTypesV2 } from './complex-type';
import { generateEntitiesV2 } from './entity';
import type { VdmServiceEntities } from '../../vdm-types';
import type { ServiceMetadata } from '../../edmx-parser';

/**
 * @internal
 */
export function getServiceEntitiesV2(
  serviceMetadata: ServiceMetadata,
  serviceName: string,
  skipValidation: boolean
): VdmServiceEntities {
  const formatter = new ServiceNameFormatter(serviceName, { skipValidation });

  const complexTypes = generateComplexTypesV2(serviceMetadata, formatter);
  const entities = generateEntitiesV2(serviceMetadata, complexTypes, formatter);
  const functionImports = generateFunctionImportsV2(
    serviceMetadata,
    serviceName,
    entities,
    complexTypes,
    formatter
  );

  return {
    complexTypes,
    enumTypes: [],
    entities,
    operations: functionImports
  };
}
