import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmServiceEntities } from '../../vdm-types';
import { generateFunctionImportsV4 } from './function-import';
import { generateComplexTypesV4 } from './complex-type';
import { generateEntitiesV4 } from './entity';
import { generateActionImportsV4 } from './action-import';
import { generateEnumTypesV4 } from './enum-type';

/**
 * @internal
 */
export function getServiceEntitiesV4(
  serviceMetadata: ServiceMetadata,
  serviceName: string
): VdmServiceEntities {
  const formatter = new ServiceNameFormatter();

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
  const actionImports = generateActionImportsV4(
    serviceMetadata,
    serviceName,
    entities,
    complexTypes,
    formatter
  );
  const functionImports = generateFunctionImportsV4(
    serviceMetadata,
    serviceName,
    entities,
    complexTypes,
    formatter
  );

  return {
    complexTypes,
    enumTypes,
    entities,
    functionImports,
    actionImports
  };
}
