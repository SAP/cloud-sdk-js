/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { createLogger, MapType } from '@sap-cloud-sdk/util';
import { last } from 'rambda';
import {
  edmToFieldType,
  isCreatable,
  isDeletable,
  isNullableProperty,
  isUpdatable
} from '../../generator-utils';
import {
  VdmComplexType,
  VdmEntity,
  VdmNavigationProperty,
  VdmProperty
} from '../../vdm-types';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { applyPrefixOnJsConfictParam } from '../../name-formatting-strategies';
import { SwaggerMetadata } from '../../edmx-parser/swagger/swagger-types';
import { entityDescription, propertyDescription } from '../description-util';
import {
  EdmxEntitySetBase,
  EdmxEntityTypeBase,
  EdmxNamed,
  JoinedEntityMetadata
} from '../../edmx-parser/common/edmx-types';
import {
  checkCollectionKind,
  filterUnknownEdmTypes,
  isCollection,
  isComplexType,
  parseTypeName,
  propertyJsType
} from '../edmx-to-vdm-util';

const logger = createLogger({
  package: 'generator',
  messageContext: 'entity'
});

export function transformEntityBase(
  entityMetadata: JoinedEntityMetadata<EdmxEntitySetBase, any>,
  classNames: {},
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter
): Omit<VdmEntity, 'navigationProperties'> {
  const entity = {
    entitySetName: entityMetadata.entitySet.Name,
    entityTypeName: entityMetadata.entityType.Name,
    className: classNames[entityMetadata.entitySet.Name],
    properties: properties(entityMetadata, complexTypes, formatter),
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
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter
): VdmProperty[] {
  return entity.entityType.Property.filter(filterUnknownEdmTypes).map(p => {
    checkCollectionKind(p);
    const swaggerProp = entity.swaggerDefinition
      ? entity.swaggerDefinition.properties[p.Name]
      : undefined;
    const instancePropertyName = formatter.originalToInstancePropertyName(
      entity.entitySet.Name,
      p.Name
    );
    const type = parseTypeName(p.Type);
    const isComplex = isComplexType(type);
    return {
      originalName: p.Name,
      instancePropertyName,
      staticPropertyName: formatter.originalToStaticPropertyName(
        entity.entitySet.Name,
        p.Name
      ),
      propertyNameAsParam: applyPrefixOnJsConfictParam(instancePropertyName),
      edmType: type,
      jsType: propertyJsType(type) || complexTypeForName(type, complexTypes),
      fieldType:
        propertyFieldType(type) || complexTypeFieldForName(type, complexTypes),
      description: propertyDescription(p, swaggerProp),
      nullable: isNullableProperty(p),
      maxLength: p.MaxLength,
      isComplex,
      isCollection: isCollection(p.Type)
    };
  });
}
const propertyFieldType = (type: string): string | undefined =>
  type.startsWith('Edm.') ? edmToFieldType(type) : undefined;

const complexTypeName = (type: string) => last(type.split('.'));
const complexTypeFieldType = (typeName: string) => typeName + 'Field';

const findComplexType = (
  name: string,
  complexTypes: VdmComplexType[]
): VdmComplexType | undefined =>
  complexTypes.find(c => c.originalName === complexTypeName(name));

function complexTypeForName(
  name: string,
  complexTypes: VdmComplexType[]
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

function complexTypeFieldForName(
  name: string,
  complexTypes: VdmComplexType[]
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

export function joinEntityMetadata<
  EntitySetT extends EdmxEntitySetBase,
  EntityTypeT extends EdmxEntityTypeBase<any>
>(
  entitySets: EntitySetT[],
  entityTypes: EntityTypeT[],
  namespace: string,
  swagger?: SwaggerMetadata
): JoinedEntityMetadata<EntitySetT, EntityTypeT>[] {
  return entitySets.map(entitySet => {
    // We assume metadata files to have a maximum of two schemas currently
    // So entitySet.EntityType.split('.').slice(-1)[0] that we will only find one matching entry (and thus never forget anything)
    const entityType = entityTypes.find(
      t => t.Name === entitySet.EntityType.split('.').slice(-1)[0]
    );

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
        name => `${namespace}.${name}` === entitySet.EntityType
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
    propertyNameAsParam: applyPrefixOnJsConfictParam(instancePropertyName)
  };
}

export function createEntityClassNames(
  entityMetadata: JoinedEntityMetadata<EdmxEntitySetBase, any>[],
  formatter: ServiceNameFormatter
): MapType<string> {
  return entityMetadata.reduce((names, e) => {
    names[e.entitySet.Name] = formatter.originalToEntityClassName(
      e.entitySet.Name
    );
    return names;
  }, {});
}
