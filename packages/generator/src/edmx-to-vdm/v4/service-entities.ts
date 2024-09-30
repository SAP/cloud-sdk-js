import { ServiceNameFormatter } from '../../service-name-formatter';
import { generateUnboundOperations } from './operation';
import { generateComplexTypesV4 } from './complex-type';
import { generateEntitiesV4 } from './entity';
import { generateEnumTypesV4 } from './enum-type';
import type { VdmServiceEntities } from '../../vdm-types';
import type { ServiceMetadata } from '../../edmx-parser';

/**
 * @internal
 */
export function getServiceEntitiesV4(
  serviceMetadata: ServiceMetadata,
  serviceName: string,
  skipValidation: boolean
): VdmServiceEntities {
  const formatter = new ServiceNameFormatter(serviceName, { skipValidation });

  const enumTypes = generateEnumTypesV4(serviceMetadata, formatter);
  const complexTypes = generateComplexTypesV4(
    serviceMetadata,
    enumTypes,
    formatter
  );
  const entities = generateEntitiesV4(
    serviceMetadata,
    complexTypes,
    enumTypes,
    formatter
  );
  return {
    complexTypes,
    enumTypes,
    entities,
    operations: generateUnboundOperations(
      serviceMetadata,
      serviceName,
      entities,
      complexTypes,
      formatter
    )
  };
}
