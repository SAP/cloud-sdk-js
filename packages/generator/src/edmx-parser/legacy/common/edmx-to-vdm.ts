import {
  unixEOL,
  pascalCase,
  createLogger,
  last,
  titleFormat
} from '@sap-cloud-sdk/util';
import {
  VdmComplexType,
  VdmEntity,
  VdmProperty,
  VdmFunctionImportReturnType,
  VdmReturnTypeCategory,
  VdmNavigationProperty,
  VdmFunctionImport
} from '../../../vdm-types';
import { ServiceNameFormatter } from '../../../service-name-formatter';
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
} from '../../../generator-utils';
import { applyPrefixOnJsConflictParam } from '../../../name-formatting-strategies';
import {
  complexTypeFieldType,
  isCollectionType,
  parseTypeName
} from '../../../edmx-to-vdm/edmx-to-vdm-util';
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
  EdmxFunctionImportBase,
  ParsedServiceMetadata
} from './parser-types';

const logger = createLogger({
  package: 'generator',
  messageContext: 'edmx-to-vdm'
});

/* eslint-disable valid-jsdoc */

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
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

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export function createEntityClassNames(
  entityMetadata: JoinedEntityMetadata[],
  formatter: ServiceNameFormatter
): Record<string, string> {
  return entityMetadata.reduce((names, e) => {
    names[e.entitySet.Name] = formatter.originalToEntityClassName(
      e.entitySet.Name
    );
    return names;
  }, {});
}

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export function transformEntity(
  entityMetadata: JoinedEntityMetadata,
  classNames: Record<string, any>,
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter
): Omit<VdmEntity, 'navigationProperties' | 'entityTypeNamespace'> {
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
      propertyNameAsParam: applyPrefixOnJsConflictParam(instancePropertyName),
      edmType: type,
      jsType: propertyJsType(type) || complexTypeForName(type, complexTypes),
      fieldType:
        propertyFieldType(type) || complexTypeFieldForName(type, complexTypes),
      description: propertyDescription(p, swaggerProp),
      nullable: isNullableProperty(p),
      maxLength: p.MaxLength,
      isComplex,
      isCollection: isCollectionType(p.Type)
    };
  });
}

const propertyFieldType = (type: string): string | undefined =>
  type.startsWith('Edm.') ? edmToFieldType(type) : undefined;

const propertyJsType = (type: string): string | undefined =>
  type.startsWith('Edm.') ? edmToTsType(type) : undefined;

export const complexTypeName = (type: string): string | undefined =>
  last(type.split('.'));

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

function shortPropertyDescription(
  property: EdmxProperty,
  swaggerProperty?: SwaggerProperty
): string {
  let desc = '';
  if (property['sap:quickinfo']) {
    desc = property['sap:quickinfo'];
  } else if (property['sap:label']) {
    desc = property['sap:label'];
  } else if (swaggerProperty && swaggerProperty.title) {
    desc = swaggerProperty.title;
  }
  return endWithDot(desc.trim());
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
    : titleFormat(className);
}

function longDescription(
  documented: EdmxDocumented,
  described?: SwaggerDescribed
): string {
  let docs = '';
  if (documented.Documentation) {
    const summmary = ensureString(documented.Documentation.Summary);
    const longDesc = ensureString(documented.Documentation.LongDescription);
    docs = `${summmary}${unixEOL}${longDesc}`.trim();
  }
  if (!docs && described) {
    docs = ensureString(described.description);
  }
  return endWithDot(docs.trim());
}

function propertyDescription(
  property: EdmxProperty,
  swaggerProperty?: SwaggerProperty
): string {
  const short = shortPropertyDescription(property, swaggerProperty);
  const long = longDescription(property, swaggerProperty);
  return `${short}${unixEOL}${long}`.trim();
}

function parameterDescription(
  parameter: EdmxParameter,
  swaggerParameter?: SwaggerPathParameter
): string {
  const short = endWithDot(titleFormat(parameter.Name));
  const long = longDescription(parameter, swaggerParameter);
  return endWithDot((long || short).trim());
}

function parseType(type: string): string {
  return type.startsWith('Edm')
    ? type
    : type.split('.')[type.split('.').length - 1];
}

function isComplexType(type: string): boolean {
  const typeParts = type.split('.');
  return typeParts[0] !== 'Edm' && typeParts[1] !== undefined;
}

function checkCollectionKind(property: EdmxProperty) {
  if (property.hasOwnProperty('CollectionKind')) {
    logger.warn(
      `"CollectionKind" attribute found in the "${property.Name}" property. Currently, handling collection of properties is not supported by the generator.`
    );
  }
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

function filterUnknownEdmTypes(p: EdmxProperty): boolean {
  const type = parseTypeName(p.Type);
  const skip = type.startsWith('Edm.') && !edmToTsType(type);
  if (skip) {
    logger.warn(
      `Edm Type ${type} not supported by the SAP Cloud SDK. Skipping generation of property ${p.Name}.`
    );
  }
  return !skip;
}

export function transformComplexTypes(
  complexTypes: EdmxComplexTypeBase[],
  formatter: ServiceNameFormatter,
  reservedNames: Set<string>
): Omit<VdmComplexType, 'namespace'>[] {
  const formattedTypes = complexTypes.reduce(
    (formatted, c) => ({
      ...formatted,
      [c.Name]: formatter.originalToComplexTypeName(c.Name)
    }),
    {}
  );
  return complexTypes.map(c => {
    const typeName = formattedTypes[c.Name];
    return {
      typeName,
      originalName: c.Name,
      factoryName: formatter.typeNameToFactoryName(typeName, reservedNames),
      fieldType: complexTypeFieldType(typeName),
      properties: c.Property.filter(filterUnknownEdmTypes).map(p => {
        checkCollectionKind(p);
        const instancePropertyName = formatter.originalToInstancePropertyName(
          c.Name,
          p.Name
        );
        const type = parseTypeName(p.Type);
        const isComplex = isComplexType(type);
        const isCollection = isCollectionType(p.Type);
        const parsedType = parseType(type);
        return {
          originalName: p.Name,
          instancePropertyName,
          staticPropertyName: formatter.originalToStaticPropertyName(
            c.Name,
            p.Name
          ),
          propertyNameAsParam:
            applyPrefixOnJsConflictParam(instancePropertyName),
          description: propertyDescription(p),
          technicalName: p.Name,
          nullable: isNullableProperty(p),
          edmType: isComplex ? type : parsedType,
          jsType: isComplex ? formattedTypes[parsedType] : edmToTsType(type),
          fieldType: isCollection
            ? 'CollectionField'
            : isComplex
            ? formattedTypes[parsedType] + 'Field'
            : edmToComplexPropertyType(type),
          isComplex,
          isCollection
        };
      })
    };
  });
}

export function parseReturnType(
  returnType: string,
  entities: VdmEntity[],
  complexTypes: Omit<VdmComplexType, 'factoryName'>[]
): VdmFunctionImportReturnType {
  if (!returnType) {
    return {
      returnTypeCategory: VdmReturnTypeCategory.VOID,
      returnType: 'undefined',
      builderFunction: '(val) => undefined',
      isMulti: false,
      isNullable: false,
      isCollection: false
    };
  }
  const isCollection = isCollectionType(returnType);
  const isNullable = false;
  returnType = parseTypeName(returnType);
  if (returnType.startsWith('Edm.')) {
    return {
      returnTypeCategory: VdmReturnTypeCategory.EDM_TYPE,
      returnType: propertyJsType(returnType)!,
      builderFunction: `(val) => edmToTs(val, '${returnType}')`,
      isMulti: isCollection,
      isNullable,
      isCollection
    };
  }
  const parsedReturnType = returnType.split('.').slice(-1)[0];
  const entity = entities.find(e => e.entityTypeName === parsedReturnType);
  if (entity) {
    return {
      returnTypeCategory: VdmReturnTypeCategory.ENTITY,
      returnType: entity.className,
      builderFunction: entity.className,
      isMulti: isCollection,
      isNullable,
      isCollection
    };
  }
  const complexType = complexTypes.find(
    c => c.originalName === parsedReturnType
  );
  if (!complexType) {
    throw Error(`Unable to find complex type with name ${parsedReturnType}.`);
  }
  return {
    returnTypeCategory: VdmReturnTypeCategory.COMPLEX_TYPE,
    returnType: complexType.typeName,
    builderFunction: `${complexType.typeName}.build`,
    isMulti: isCollection,
    isNullable,
    isCollection
  };
}

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export function transformFunctionImportBase(
  edmxFunctionImport: EdmxFunctionImportBase,
  edmxParameters: EdmxParameter[],
  swaggerDefinition: SwaggerPath | undefined,
  formatter: ServiceNameFormatter
): Omit<VdmFunctionImport, 'returnTypeEdmx' | 'httpMethod' | 'returnType'> {
  const functionName = formatter.originalToFunctionImportName(
    edmxFunctionImport.Name
  );
  const functionImport = {
    originalName: edmxFunctionImport.Name,
    name: functionName,
    parametersTypeName: pascalCase(`${functionName}Parameters`)
  };

  const parameters = edmxParameters.filter(filterUnknownEdmTypes).map(p => {
    const swaggerParameter = swaggerDefinition
      ? swaggerDefinition.parameters.find(param => param.name === p.Name)
      : undefined;
    return {
      originalName: p.Name,
      parameterName: formatter.originalToParameterName(
        edmxFunctionImport.Name,
        p.Name
      ),
      edmType: parseType(p.Type),
      jsType: edmToTsType(p.Type)!,
      fieldType: edmToFieldType(p.Type),
      nullable: isNullableParameter(p),
      description: parameterDescription(p, swaggerParameter)
    };
  });

  return {
    ...functionImport,
    parameters,
    description: functionImportDescription(
      swaggerDefinition,
      functionImport.originalName
    )
  };
}

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export function swaggerDefinitionForFunctionImport(
  serviceMetadata: ParsedServiceMetadata,
  originalName: string,
  httpMethod: string
): SwaggerPath | undefined {
  if (serviceMetadata.swagger) {
    const paths = serviceMetadata.swagger.paths;
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

function functionImportDescription(
  swaggerDefinition: SwaggerPath | undefined,
  originalName: string
): string {
  if (swaggerDefinition && swaggerDefinition.summary) {
    return endWithDot(swaggerDefinition.summary);
  }
  return endWithDot(titleFormat(originalName));
}
