/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
import { VdmServiceEntities } from '../../vdm-types';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { parseReturnTypes } from '../common';
import { generateFunctionImportsV2 } from './function-import';
import { generateComplexTypesV2 } from './complex-type';
import { generateEntitiesV2 } from './entity';

export function getServiceEntitiesV2(
  serviceMetadata: ServiceMetadata
): VdmServiceEntities {
  const formatter = new ServiceNameFormatter();

  /*
  Do function imports before complex types so that function with name "createSomething" gets a nicer name, because the builder function of a complex type would also be called `create${ComplexTypeName}`.
  */
  const functionImportsWithoutReturnType = generateFunctionImportsV2(
    serviceMetadata,
    formatter
  );

  const complexTypes = generateComplexTypesV2(serviceMetadata, formatter);

  const entities = generateEntitiesV2(serviceMetadata, complexTypes, formatter);

  const functionImports = parseReturnTypes(
    functionImportsWithoutReturnType,
    entities,
    complexTypes
  );

  return {
    complexTypes,
    entities,
    functionImports
  };
}
