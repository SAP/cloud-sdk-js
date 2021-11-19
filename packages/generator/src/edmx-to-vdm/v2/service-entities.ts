import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
import { VdmServiceEntities } from '../../vdm-types';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { includeFactoryName } from '../common';
import { generateFunctionImportsV2 } from './function-import';
import { generateComplexTypesV2 } from './complex-type';
import { generateEntitiesV2 } from './entity';

// eslint-disable-next-line valid-jsdoc
/**
 * @internal
 */
export function getServiceEntitiesV2(
  serviceMetadata: ServiceMetadata
): VdmServiceEntities {
  const formatter = new ServiceNameFormatter();

  const complexTypes = generateComplexTypesV2(serviceMetadata, formatter);
  const entities = generateEntitiesV2(serviceMetadata, complexTypes, formatter);
  const functionImports = generateFunctionImportsV2(
    serviceMetadata,
    entities,
    complexTypes,
    formatter
  );

  return {
    complexTypes: includeFactoryName(complexTypes, formatter),
    enumTypes: [],
    entities,
    functionImports
  };
}
