/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { last } from 'rambda';
import { toTitleFormat, toTypeNameFormat } from '@sap-cloud-sdk/core';
import { createLogger, MapType } from '@sap-cloud-sdk/util';
import {
  VdmComplexType,
  VdmEntity,
  VdmProperty,
  VdmFunctionImportReturnType,
  VdmFunctionImportReturnTypeCategory,
  VdmNavigationProperty,
  VdmFunctionImport
} from '../../vdm-types';
import { ServiceNameFormatter } from '../../service-name-formatter';
import {
  isCreatable,
  isUpdatable,
  isDeletable,
  isNullableProperty,
  edmToFieldType,
  edmToTsType,
  endWithDot,
  ensureString,
  edmToComplexPropertyType,
  isNullableParameter
} from '../../generator-utils';
import { applyPrefixOnJsConfictParam } from '../../name-formatting-strategies';
import { isCollection, parseTypeName } from '../parser-util';
import { ParsedServiceMetadata } from '../parsed-service-metadata';
import {
  JoinedEntityMetadata,
  EdmxProperty,
  SwaggerProperty,
  EdmxDocumented,
  SwaggerDescribed,
  EdmxParameter,
  SwaggerPathParameter,
  EdmxNamed,
  EdmxComplexTypeBase,
  SwaggerPath,
  EdmxFunctionImportBase, SwaggerMetadata
} from './parser-types';
import { longDescription } from './description-util';

const logger = createLogger({
  package: 'generator',
  messageContext: 'edmx-to-vdm'
});

export function joinEntityMetadata(
  metadata: ParsedServiceMetadata
): JoinedEntityMetadata[] {
  return metadata.edmx.entitySets.map(entitySet => {
    // We assume metadata files to have a maximum of two schemas currently
    // So entitySet.EntityType.split('.').slice(-1)[0] that we will only find one matching entry (and thus never forget anything)
    const entityType = metadata.edmx.entityTypes.find(
      t => t.Name === entitySet.EntityType.split('.').slice(-1)[0]
    );

    if (!entityType) {
      throw Error(
        `Could not find entity type '${entitySet.EntityType}' for entity set with name '${entitySet.Name}'.'`
      );
    }

    const joined: JoinedEntityMetadata = {
      entitySet,
      entityType
    };

    if (metadata.swagger) {
      const defKey = Object.keys(metadata.swagger.definitions).find(
        name => `${metadata.edmx.namespace}.${name}` === entitySet.EntityType
      );
      if (defKey) {
        joined.swaggerDefinition = metadata.swagger.definitions[defKey];
      }
    }

    return joined;
  });
}

export function createEntityClassNames(
  entityMetadata: JoinedEntityMetadata[],
  formatter: ServiceNameFormatter
): MapType<string> {
  return entityMetadata.reduce((names, e) => {
    names[e.entitySet.Name] = formatter.originalToEntityClassName(
      e.entitySet.Name
    );
    return names;
  }, {});
}

export function transformEntity(
  entityMetadata: JoinedEntityMetadata,
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
  entity: JoinedEntityMetadata,
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

const propertyJsType = (type: string): string | undefined =>
  type.startsWith('Edm.') ? edmToTsType(type) : undefined;

const complexTypeName = (type: string) => last(type.split('.'));

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


function entityDescription(
  entity: JoinedEntityMetadata,
  className: string
): string {
  if (entity.entityType['sap:label']) {
    return entity.entityType['sap:label'];
  }
  return entity.swaggerDefinition && entity.swaggerDefinition.title
    ? entity.swaggerDefinition.title
    : toTitleFormat(className);
}








function isComplexType(type: string): boolean {
  const typeParts = type.split('.');
  return typeParts[0] !== 'Edm' && typeParts[1] !== undefined;
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


export function parseReturnType(
  returnType: string,
  entities: VdmEntity[],
  complexTypes: VdmComplexType[]
): VdmFunctionImportReturnType {
  if (!returnType) {
    return {
      returnTypeCategory: VdmFunctionImportReturnTypeCategory.VOID,
      returnType: 'undefined',
      builderFunction: '(val) => undefined',
      isMulti: false,
      isCollection: false
    };
  }
  const isCollectionReturnType = isCollection(returnType);
  returnType = parseTypeName(returnType);
  if (returnType.startsWith('Edm.')) {
    return {
      returnTypeCategory: VdmFunctionImportReturnTypeCategory.EDM_TYPE,
      returnType: propertyJsType(returnType)!,
      builderFunction: `(val) => edmToTs(val, '${returnType}')`,
      isMulti: isCollectionReturnType,
      isCollection: isCollectionReturnType
    };
  }
  const parsedReturnType = returnType.split('.').slice(-1)[0];
  const entity = entities.find(e => e.entityTypeName === parsedReturnType);
  if (entity) {
    return {
      returnTypeCategory: VdmFunctionImportReturnTypeCategory.ENTITY,
      returnType: entity.className,
      builderFunction: entity.className,
      isMulti: isCollectionReturnType,
      isCollection: isCollectionReturnType
    };
  }
  const complexType = complexTypes.find(
    c => c.originalName === parsedReturnType
  );
  if (!complexType) {
    throw Error(`Unable to find complex type with name ${parsedReturnType}.`);
  }
  return {
    returnTypeCategory: VdmFunctionImportReturnTypeCategory.COMPLEX_TYPE,
    returnType: complexType.typeName,
    builderFunction: `${complexType.typeName}.build`,
    isMulti: isCollectionReturnType,
    isCollection: isCollectionReturnType
  };
}


export function swaggerDefinitionForFunctionImport(
  originalName: string,
  httpMethod: string,
  swaggerMetadata: SwaggerMetadata|undefined,
): SwaggerPath | undefined {
  if (swaggerMetadata) {
    const paths = swaggerMetadata.paths;
    const entryPath = Object.keys(paths).find(
      path => path === `/${originalName}`
    );
    if (entryPath) {
      const key = Object.keys(paths[entryPath]).find(
        k => k.toLowerCase() === httpMethod.toLowerCase()
      );
      if (key) {
        return paths[entryPath][key];
      }
    }
  }
}

// function functionImportDescription(
//   swaggerDefinition: SwaggerPath | undefined,
//   originalName: string
// ): string {
//   if (swaggerDefinition && swaggerDefinition.summary) {
//     return endWithDot(swaggerDefinition.summary);
//   }
//   return endWithDot(toTitleFormat(originalName));
// }
