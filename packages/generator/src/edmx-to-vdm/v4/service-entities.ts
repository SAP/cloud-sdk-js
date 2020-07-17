/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmServiceEntities } from '../../vdm-types';
import { parseReturnTypes } from '../common';
import { generateFunctionImportsV4 } from './function-import';
import { generateComplexTypesV4 } from './complex-type';
import { generateEntitiesV4 } from './entity';

export function getServiceEntitiesV4(
  serviceMetadata: ServiceMetadata
): VdmServiceEntities {
  const formatter = new ServiceNameFormatter();

  /*
  Do function imports before complex types so that function with name "createSomething" gets a nicer name, because the builder function of a complex type would also be called `create${ComplexTypeName}`.
  */
  const functionImportsWithoutReturnType = generateFunctionImportsV4(
    serviceMetadata,
    formatter
  );

  const complexTypes = generateComplexTypesV4(serviceMetadata, formatter);

  const entities = generateEntitiesV4(serviceMetadata, complexTypes, formatter);

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
