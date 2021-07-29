import { createLogger, last } from '@sap-cloud-sdk/util';
import {
  edmToFieldType,
  edmToTsType,
  getFallbackEdmTypeIfNeeded,
  isCreatable,
  isDeletable,
  isNullableProperty,
  isUpdatable
} from '../../generator-utils';
import {
  VdmComplexType,
  VdmEntity,
  VdmNavigationProperty,
  VdmProperty,
  VdmMappedEdmType,
  VdmEnumType
} from '../../vdm-types';
import { ServiceNameFormatter } from '../../service-name-formatter';
import {
  applyPrefixOnJsConfictParam,
  applyPrefixOnJsConflictParam
} from '../../name-formatting-strategies';
import { entityDescription, propertyDescription } from '../description-util';
import {
  EdmxEntitySetBase,
  EdmxEntityTypeBase,
  EdmxNamed,
  JoinedEntityMetadata
} from '../../edmx-parser/common';
import {
  checkCollectionKind,
  complexTypeFieldType,
  isCollectionType,
  isComplexType,
  isEdmType,
  isEnumType,
  parseCollectionTypeName,
  typesForCollection
} from '../edmx-to-vdm-util';
import { SwaggerMetadata } from '../../swagger-parser/swagger-types';

const logger = createLogger({
  package: 'generator',
  messageContext: 'entity'
});

export function transformEntityBase(
  entityMetadata: JoinedEntityMetadata<EdmxEntitySetBase, any>,
  classNames: Record<string, any>,
  complexTypes: Omit<VdmComplexType, 'factoryName'>[],
  enumTypes: VdmEnumType[],
  formatter: ServiceNameFormatter
): Omit<VdmEntity, 'navigationProperties'> {
  const entity = {
    entitySetName: entityMetadata.entitySet.Name,
    entityTypeName: entityMetadata.entityType.Name,
    entityTypeNamespace: entityMetadata.entityType.Namespace,
    className: classNames[entityMetadata.entitySet.Name],
    properties: properties(entityMetadata, complexTypes, formatter, enumTypes),
    creatable: entityMetadata.entitySet
      ? isCreatable(entityMetadata.entitySet)
      : true,
    updatable: entityMetadata.entitySet
      ? isUpdatable(entityMetadata.entitySet)
      : true,
    deletable: entityMetadata.entitySet
      ? isDeletable(entityMetadata.entitySet)
      : true
  };

  return {
    ...entity,
    keys: keys(entity.properties, entityMetadata.entityType.Key.PropertyRef),
    description: entityDescription(entityMetadata, entity.className)
  };
}

function keys(props: VdmProperty[], edmxKeys: EdmxNamed[]): VdmProperty[] {
  return edmxKeys
    .map(key => props.find(prop => prop.originalName === key.Name))
    .filter(e => !!e) as VdmProperty[];
}

function properties(
  entity: JoinedEntityMetadata<EdmxEntitySetBase, any>,
  complexTypes: Omit<VdmComplexType, 'factoryName'>[],
  formatter: ServiceNameFormatter,
  enumTypes: VdmEnumType[]
): VdmProperty[] {
  return entity.entityType.Property.map(p => {
    checkCollectionKind(p);
    const swaggerProp = entity.swaggerDefinition
      ? entity.swaggerDefinition.properties[p.Name]
      : undefined;
    const instancePropertyName = formatter.originalToInstancePropertyName(
      entity.entitySet.Name,
      p.Name
    );
    const isCollection = isCollectionType(p.Type);
    const parsed = isCollection ? parseCollectionTypeName(p.Type) : p.Type;
    const isComplex = isComplexType(parsed, complexTypes);
    const isEnum = isEnumType(parsed, enumTypes);
    const typeMapping = getTypeMappingEntityProperties(
      p.Type,
      complexTypes,
      enumTypes,
      isComplex,
      isEnum
    );

    return {
      originalName: p.Name,
      instancePropertyName,
      staticPropertyName: formatter.originalToStaticPropertyName(
        entity.entitySet.Name,
        p.Name
      ),
      propertyNameAsParam: applyPrefixOnJsConfictParam(instancePropertyName),
      edmType: typeMapping.edmType,
      jsType: typeMapping.jsType,
      fieldType: typeMapping.fieldType,
      description: propertyDescription(p, swaggerProp),
      nullable: isNullableProperty(p),
      maxLength: p.MaxLength,
      isComplex,
      isEnum,
      isCollection
    };
  });
}

export function joinEntityMetadata<
  EntitySetT extends EdmxEntitySetBase,
  EntityTypeT extends EdmxEntityTypeBase<any>
>(
  entitySets: EntitySetT[],
  entityTypes: EntityTypeT[],
  swagger?: SwaggerMetadata
): JoinedEntityMetadata<EntitySetT, EntityTypeT>[] {
  return entitySets.map(entitySet => {
    let entityType = entityTypes.find(
      t => `${t.Namespace}.${t.Name}` === entitySet.EntityType
    );
    // TODO 1584 remove this block after testing all the s/4 edmx files
    if (!entityType) {
      entityType = entityTypes.find(
        t => t.Name === last(entitySet.EntityType.split('.'))
      );
    }

    if (!entityType) {
      throw Error(
        `Could not find entity type '${entitySet.EntityType}' for entity set with name '${entitySet.Name}'.'`
      );
    }

    const joined: JoinedEntityMetadata<EntitySetT, EntityTypeT> = {
      entitySet,
      entityType
    };

    if (swagger) {
      const defKey = Object.keys(swagger.definitions).find(
        name => `${entityType!.Namespace}.${name}` === entitySet.EntityType
      );
      if (defKey) {
        joined.swaggerDefinition = swagger.definitions[defKey];
      }
    }

    return joined;
  });
}

export function navigationPropertyBase(
  navPropName: string,
  entitySetName: string,
  formatter: ServiceNameFormatter
): Pick<
  VdmNavigationProperty,
  | 'originalName'
  | 'instancePropertyName'
  | 'staticPropertyName'
  | 'propertyNameAsParam'
> {
  const instancePropertyName = formatter.originalToNavigationPropertyName(
    entitySetName,
    navPropName
  );

  return {
    originalName: navPropName,
    instancePropertyName,
    staticPropertyName: formatter.originalToStaticPropertyName(
      entitySetName,
      navPropName
    ),
    propertyNameAsParam: applyPrefixOnJsConflictParam(instancePropertyName)
  };
}

export function createEntityClassNames(
  entityMetadata: JoinedEntityMetadata<EdmxEntitySetBase, any>[],
  formatter: ServiceNameFormatter
): Record<string, string> {
  return entityMetadata.reduce(
    (names, e) => ({
      ...names,
      [e.entitySet.Name]: formatter.originalToEntityClassName(e.entitySet.Name)
    }),
    {}
  );
}

function getTypeMappingEntityProperties(
  typeName: string,
  complexTypes: Omit<VdmComplexType, 'factoryName'>[],
  enumTypes: VdmEnumType[],
  isComplex: boolean,
  isEnum: boolean
): VdmMappedEdmType {
  if (isEdmType(typeName)) {
    const edmFallback = getFallbackEdmTypeIfNeeded(typeName);
    return {
      edmType: edmFallback,
      jsType: edmToTsType(edmFallback),
      fieldType: edmToFieldType(edmFallback)
    };
  }
  if (isCollectionType(typeName)) {
    return typesForCollection(typeName, enumTypes, complexTypes);
  }
  if (isComplex) {
    return {
      edmType: typeName,
      jsType: complexTypeForName(typeName, complexTypes),
      fieldType: complexTypeFieldForName(typeName, complexTypes)
    };
  }
  if (isEnum) {
    return {
      edmType: typeName,
      jsType: enumTypeForName(typeName, enumTypes),
      fieldType: 'EnumField'
    };
  }
  throw new Error(`No types found for ${typeName}`);
}

function complexTypeFieldForName(
  name: string,
  complexTypes: Omit<VdmComplexType, 'factoryName'>[]
): string {
  const complexType = findComplexType(name, complexTypes);
  if (complexType) {
    return complexTypeFieldType(complexType.typeName);
  }
  logger.warn(
    `No complex type mapping found for ${name}! Using "any" instead. This will most likely result in errors.`
  );
  return 'any';
}

const getPostfix = (type: string) => last(type.split('.'));

export const findComplexType = (
  name: string,
  complexTypes: Omit<VdmComplexType, 'factoryName'>[]
): Omit<VdmComplexType, 'factoryName'> | undefined =>
  complexTypes.find(c => c.originalName === getPostfix(name));

export const findEnumType = (
  name: string,
  enumTypes: VdmEnumType[]
): VdmEnumType | undefined =>
  enumTypes.find(e => e.originalName === getPostfix(name));

export function complexTypeForName(
  name: string,
  complexTypes: Omit<VdmComplexType, 'factoryName'>[]
): string {
  const complexType = findComplexType(name, complexTypes);
  if (complexType) {
    return complexType.typeName;
  }
  logger.warn(
    `No complex type mapping found for ${name}! Using "any" instead. This will most likely result in errors.`
  );
  return 'any';
}

export function enumTypeForName(
  name: string,
  enumTypes: VdmEnumType[]
): string {
  const enumType = findEnumType(name, enumTypes);
  if (enumType) {
    return enumType.typeName;
  }
  logger.warn(
    `No enum type mapping found for ${name}! Using "any" instead. This will most likely result in errors.`
  );
  return 'any';
}
