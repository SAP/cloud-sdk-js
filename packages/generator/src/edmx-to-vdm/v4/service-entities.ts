/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmServiceEntities } from '../../vdm-types';
import { includeFactoryName } from '../common';
import { generateFunctionImportsV4 } from './function-import';
import { generateComplexTypesV4 } from './complex-type';
import { generateEntitiesV4 } from './entity';
import { generateActionImportsV4 } from './action-import';

export function getServiceEntitiesV4(
  serviceMetadata: ServiceMetadata
): VdmServiceEntities {
  const formatter = new ServiceNameFormatter();

  const complexTypes = generateComplexTypesV4(serviceMetadata, formatter);
  const entities = generateEntitiesV4(serviceMetadata, complexTypes, formatter);
  const actionsImports = generateActionImportsV4(
    serviceMetadata,
    entities,
    complexTypes,
    formatter
  );
  const functionImports = generateFunctionImportsV4(
    serviceMetadata,
    entities,
    complexTypes,
    formatter
  );

  return {
    complexTypes: includeFactoryName(complexTypes, formatter),
    entities,
    functionImports,
    actionsImports
  };
}
