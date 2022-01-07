import { ServiceMetadata } from '../../edmx-parser';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmServiceEntities } from '../../vdm-types';
import { includeFactoryName } from '../common';
import { generateFunctionImportsV4 } from './function-import';
import { generateComplexTypesV4 } from './complex-type';
import { generateEntitiesV4 } from './entity';
import { generateActionImportsV4 } from './action-import';
import { generateEnumTypesV4 } from './enum-type';

// eslint-disable-next-line valid-jsdoc
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
  const actionsImports = generateActionImportsV4(
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
    complexTypes: includeFactoryName(complexTypes, formatter),
    enumTypes,
    entities,
    functionImports,
    actionImports: actionsImports
  };
}
