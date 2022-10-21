import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
import {
  EdmxEntitySet,
  EdmxEntityTypeV4
} from '../../edmx-parser/v4/edm-types';
import {
  parseEntitySetsV4,
  parseEntityType
} from '../../edmx-parser/v4/edmx-parser';
import { ServiceNameFormatter } from '../../service-name-formatter';
import {
  VdmActionImport,
  VdmComplexType,
  VdmEntity, VdmEntityInConstruction, VdmEnumType,
  VdmFunctionImport,
  VdmNavigationProperty
} from '../../vdm-types';
import {
  createEntityClassNames,
  joinEntityMetadata,
  navigationPropertyBase,
  transformEntityBase
} from '../common/entity';
import { isCollectionType } from '../edmx-to-vdm-util';
import { generateActionImportsV4 } from './action-import';
import { generateComplexTypesV4 } from './complex-type';
import { generateEnumTypesV4 } from './enum-type';
import { generateFunctionImportsV4 } from './function-import';

/**
 * @internal
 */
export function generateEntitiesV4(
  serviceMetadata: ServiceMetadata,
  complexTypes: VdmComplexType[],
  enumTypes: VdmEnumType[],
  formatter: ServiceNameFormatter
): VdmEntity[] {
  const entitySets = parseEntitySetsV4(serviceMetadata.edmx.root);
  const entityTypes = parseEntityType(serviceMetadata.edmx.root);

  const entitiesMetadata = joinEntityMetadata(
    entitySets,
    entityTypes,
    serviceMetadata.swagger
  );
  const classNames = createEntityClassNames(entitiesMetadata, formatter);

  return entitiesMetadata.map(entityMetadata => ({
    ...transformEntityBase(
      entityMetadata,
      classNames,
      complexTypes,
      enumTypes,
      formatter
    ),
    navigationProperties: navigationProperties(
      entityMetadata.entityType,
      entityMetadata.entitySet,
      classNames,
      formatter
    ),
    functions: transformBoundFunctions(
      serviceMetadata,
      entityMetadata.entityType,
      entityMetadata.entitySet,
      classNames,
      formatter
    ),
    actions: transformBoundActions(
      serviceMetadata,
      entityMetadata.entityType,
      entityMetadata.entitySet,
      classNames,
      formatter
    )
  }));
}

function navigationProperties(
  entityType: EdmxEntityTypeV4,
  entitySet: EdmxEntitySet,
  classNames: { [originalName: string]: string },
  formatter: ServiceNameFormatter
): VdmNavigationProperty[] {
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
      ...navigationPropertyBase(navProp.Name, entitySet.Name, formatter),
      from: entityType.Name,
      to: navBinding.Target,
      toEntityClassName: classNames[navBinding.Target],
      isCollection
    };
  });
}

function transformBoundFunctions(
  serviceMetadata: ServiceMetadata,
  entityType: EdmxEntityTypeV4,
  entitySet: EdmxEntitySet,
  classNames: { [originalName: string]: string },
  formatter: ServiceNameFormatter
): VdmFunctionImport[] {
  const entities: VdmEntityInConstruction[] = Object.entries(classNames).map(([originalName, className]) => ({
    className,
    entityTypeName: originalName, // entity type or set
    entityTypeNamespace: entityType.Namespace
  }));

  const enumTypes: VdmEnumType[] = generateEnumTypesV4(serviceMetadata, formatter);
  const complexTypes: VdmComplexType[] = generateComplexTypesV4(serviceMetadata, enumTypes, formatter);

  if (classNames[entitySet.Name]) {
    return generateFunctionImportsV4(serviceMetadata, entityType.Namespace, entities, complexTypes, formatter, entitySet.Name /*fixme is this the right parameter? */);
  }

  return []
}

function transformBoundActions(
  serviceMetadata: ServiceMetadata,
  entityType: EdmxEntityTypeV4,
  entitySet: EdmxEntitySet,
  classNames: { [originalName: string]: string },
  formatter: ServiceNameFormatter
): VdmActionImport[] {
  const entities: VdmEntityInConstruction[] = Object.keys(classNames).map(c => ({
    className: c,
    entityTypeName: c,
    entityTypeNamespace: entityType.Namespace
  }));

  const enumTypes: VdmEnumType[] = generateEnumTypesV4(serviceMetadata, formatter);
  const complexTypes: VdmComplexType[] = generateComplexTypesV4(serviceMetadata, enumTypes, formatter);


  if (classNames[entitySet.Name]) {
    return generateActionImportsV4(serviceMetadata, entityType.Namespace, entities, complexTypes, formatter, entitySet.Name /*fixme is this the right parameter? */);
  }

  return []
}

// TODO: This should be removed once derived types are considered.
function isDerivedNavBindingPath(path: string): boolean {
  return path.includes('/');
}
