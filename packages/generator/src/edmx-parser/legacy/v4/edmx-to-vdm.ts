import {
  VdmNavigationProperty,
  VdmComplexType,
  VdmEntity,
  VdmFunctionImport
} from '../../../vdm-types';
import { ServiceNameFormatter } from '../../../service-name-formatter';
import { JoinedEntityMetadata, ParsedServiceMetadata } from '../common';
import {
  joinEntityMetadata,
  createEntityClassNames,
  transformEntity,
  navigationPropertyBase,
  parseReturnType,
  swaggerDefinitionForFunctionImport,
  transformFunctionImportBase
} from '../common/edmx-to-vdm';
import {
  stripNamespace,
  isCollectionType
} from '../../../edmx-to-vdm/edmx-to-vdm-util';
import { EdmxEntityType, EdmxEntitySet, EdmxMetadata } from './parser-types';

/* eslint-disable valid-jsdoc */

// TODO: This should be removed once derived types are considered.
function isDerivedNavBindingPath(path: string): boolean {
  return path.includes('/');
}

function navigationProperties(
  entityMetadata: JoinedEntityMetadata,
  classNames: { [originalName: string]: string },
  formatter: ServiceNameFormatter
): VdmNavigationProperty[] {
  const entityType = entityMetadata.entityType as EdmxEntityType;
  const entitySet = entityMetadata.entitySet as EdmxEntitySet;

  return entitySet.NavigationPropertyBinding.filter(
    navBinding => !isDerivedNavBindingPath(navBinding.Path)
  ).map(navBinding => {
    const navProp = entityType.NavigationProperty.find(
      n => n.Name === navBinding.Path
    );

    if (!navProp) {
      throw new Error(
        `Could not find navigation property ${navBinding.Path} in entity type ${entityType.Name}.`
      );
    }

    const isCollection = isCollectionType(navProp.Type);

    return {
      ...navigationPropertyBase(
        navProp.Name,
        entityMetadata.entitySet.Name,
        formatter
      ),
      from: entityMetadata.entityType.Name,
      to: navBinding.Target,
      toEntityClassName: classNames[navBinding.Target],
      multiplicity: isCollection ? '1 - *' : '1 - 1',
      isMultiLink: isCollection,
      isCollection
    };
  });
}

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export function transformEntitiesV4(
  serviceMetadata: ParsedServiceMetadata,
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter
): VdmEntity[] {
  const entitiesMetadata = joinEntityMetadata(serviceMetadata);
  const classNames = createEntityClassNames(entitiesMetadata, formatter);

  return entitiesMetadata.map(entityMetadata => ({
    ...transformEntity(entityMetadata, classNames, complexTypes, formatter),
    navigationProperties: navigationProperties(
      entityMetadata,
      classNames,
      formatter
    )
  }));
}

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export function transformFunctionImportsV4(
  serviceMetadata: ParsedServiceMetadata,
  entities: VdmEntity[],
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter
): VdmFunctionImport[] {
  const edmxMetadata = serviceMetadata.edmx as EdmxMetadata;
  const edmxFunctionImports = edmxMetadata.functionImports;

  const edmxFunctions = edmxMetadata.functions;

  return edmxFunctionImports.map(f => {
    const edmxFunction = edmxFunctions.find(
      fn => stripNamespace(f.Function) === fn.Name
    );
    if (!edmxFunction) {
      throw Error(
        `Unable to find a function with name: ${f.Function}, but specified in function import ${f.Name}`
      );
    }

    const httpMethod = 'get';
    const swaggerDefinition = swaggerDefinitionForFunctionImport(
      serviceMetadata,
      f.Name,
      httpMethod
    );

    return {
      ...transformFunctionImportBase(
        f,
        edmxFunction.Parameter,
        swaggerDefinition,
        formatter
      ),
      httpMethod,
      returnType: parseReturnType(
        edmxFunction.ReturnType?.Type,
        entities,
        complexTypes
      ),
      returnTypeEdmx: edmxFunction.ReturnType?.Type
    };
  });
}
