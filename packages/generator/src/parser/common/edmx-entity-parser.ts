import { EdmxNamed, EdmxProperty, SwaggerEntity, SwaggerMetadata } from './parser-types';
import {
  edmToFieldType, edmToTsType,
  forceArray,
  isCreatable,
  isDeletable,
  isNullableProperty,
  isUpdatable
} from '../../generator-utils';
import { EdmxMetadataBase } from '../edmx-parser';
import { VdmComplexType, VdmEntity, VdmNavigationProperty, VdmProperty } from '../../vdm-types';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { isCollection, parseTypeName } from '../parser-util';
import { applyPrefixOnJsConfictParam } from '../../name-formatting-strategies';
import { toTitleFormat } from '@sap-cloud-sdk/core';
import {
  checkCollectionKind,
  filterUnknownEdmTypes,
  isComplexType,
  propertyDescription, propertyJsType
} from './some-util-find-good-name';
import { ParsedServiceMetadata } from '../parsed-service-metadata';
import { createLogger } from '@sap-cloud-sdk/util';
import { last } from 'rambda';

const logger = createLogger({
  package: 'generator',
  messageContext: 'edmx-entity-parser'
});

export interface EdmxEntitySetBase extends EdmxNamed {
  EntityType: string;
  'sap:content-version': string;
  'sap:creatable': string;
  'sap:deletable': string;
  'sap:pageable': string;
  'sap:updatable': string;
}

export function parseEntitySetsBase(root): EdmxEntitySetBase[] {
  return forceArray(root.EntityContainer.EntitySet)
}

export function getEntitySetNames(edmxData:EdmxMetadataBase):string[]{
  throw new Error('Not yet implemented')
}


export interface EdmxKey {
  PropertyRef: EdmxNamed[];
}

export interface EdmxEntityType<NavigationType> extends EdmxNamed {
  Key: EdmxKey;
  Property: EdmxProperty[];
  'sap:content-version': string;
  'sap:label'?: string;
  NavigationProperty:NavigationType[]
}

//TODO more elegant way to pass the type in?
export function parseEntityTypesBase<NavigationType>(root,foo:NavigationType): EdmxEntityType<NavigationType>[] {
  return forceArray(root.EntityType).map(e => {
    if (!e.Key) {
      e.Key = {};
    }
    e.Key.PropertyRef = forceArray(e.Key.PropertyRef);
    e.NavigationProperty = forceArray(e.NavigationProperty);
    e.Property = forceArray(e.Property);
    return e;
  });
}


export function transformEntityBase(
  entityMetadata: JoinedEntityMetadata<any>,
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

function entityDescription(
  entity: JoinedEntityMetadata<any>,
  className: string
): string {
  if (entity.entityType['sap:label']) {
    return entity.entityType['sap:label'];
  }
  return entity.swaggerDefinition && entity.swaggerDefinition.title
    ? entity.swaggerDefinition.title
    : toTitleFormat(className);
}

function keys(props: VdmProperty[], edmxKeys: EdmxNamed[]): VdmProperty[] {
  return edmxKeys
    .map(key => props.find(prop => prop.originalName === key.Name))
    .filter(e => !!e) as VdmProperty[];
}


function properties(
  entity: JoinedEntityMetadata<any>,
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

export interface JoinedEntityMetadata<NavProp> {
  entitySet: EdmxEntitySetBase;
  entityType: EdmxEntityType<NavProp>;
  swaggerDefinition?: SwaggerEntity;
}


export function joinEntityMetadata<NavProp>(
  entitySets:EdmxEntitySetBase[],
  entityTypes:EdmxEntityType<NavProp>[],
  namespace:string,
  swagger?:SwaggerMetadata
): JoinedEntityMetadata<any>[] {
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

    const joined: JoinedEntityMetadata<any> = {
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
