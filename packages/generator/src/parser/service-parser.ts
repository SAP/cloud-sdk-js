/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { toTitleFormat, toTypeNameFormat } from '@sap-cloud-sdk/core';
import { createLogger, propertyExists, VALUE_IS_UNDEFINED } from '@sap-cloud-sdk/util';
import { last } from 'rambda';
import voca from 'voca';
import { GeneratorOptions } from '../generator-options';
import {
  edmToComplexPropertyType,
  edmToFieldType,
  edmToTsType,
  endWithDot,
  ensureString,
  isCreatable,
  isDeletable,
  isNullableParameter,
  isNullableProperty,
  isUpdatable,
  npmCompliantName
} from '../generator-utils';
import { GlobalNameFormatter } from '../global-name-formatter';
import { inputPaths, ServiceDefinitionPaths } from '../input-path-provider';
import { applyPrefixOnJsConfictParam } from '../name-formatting-strategies';
import { readServiceMapping, ServiceMapping, VdmMapping } from '../service-mapping';
import { ServiceNameFormatter } from '../service-name-formatter';
import {
  ApiBusinessHubMetadata,
  VdmComplexType,
  VdmEntity,
  VdmFunctionImport,
  VdmFunctionImportReturnType,
  VdmFunctionImportReturnTypeCategory,
  VdmNavigationProperty,
  VdmProperty,
  VdmServiceMetadata
} from '../vdm-types';
import { parseEdmxFromPath } from './edmx-parser';
import {
  EdmxAssociation,
  EdmxAssociationSet,
  EdmxComplexType,
  EdmxDocumented,
  EdmxEntitySet,
  EdmxEntityType,
  EdmxParameter,
  EdmxProperty,
  EdmxPropertyRef,
  ParsedServiceMetadata,
  SwaggerDescribed,
  SwaggerEntity,
  SwaggerMetadata,
  SwaggerPath,
  SwaggerPathParameter,
  SwaggerProperty
} from './parser-types';
import { parseSwaggerFromPath } from './swagger-parser';

const logger = createLogger({
  package: 'generator',
  messageContext: 'service-parser'
});

export function parseAllServices(options: GeneratorOptions): VdmServiceMetadata[] {
  const serviceMapping = readServiceMapping(options);
  const globalNameFormatter = new GlobalNameFormatter(serviceMapping);
  return inputPaths(options.inputDir, options.useSwagger).map(p => parseService(p, options, serviceMapping, globalNameFormatter));
}

export function parseService(
  serviceDefinitionPaths: ServiceDefinitionPaths,
  options: GeneratorOptions,
  mappings: VdmMapping,
  globalNameFormatter: GlobalNameFormatter
): VdmServiceMetadata {
  const serviceMetadata = parseServiceMetadata(serviceDefinitionPaths);
  const serviceMapping = mappings[serviceMetadata.edmx.fileName];
  return transformServiceMetadata(serviceMetadata, options, globalNameFormatter, serviceDefinitionPaths, serviceMapping);
}

function parseServiceMetadata(serviceDefinitionPaths: ServiceDefinitionPaths): ParsedServiceMetadata {
  const serviceMetadata: ParsedServiceMetadata = {
    edmx: parseEdmxFromPath(serviceDefinitionPaths.edmxPath)
  };
  if (serviceDefinitionPaths.swaggerPath) {
    serviceMetadata.swagger = parseSwaggerFromPath(serviceDefinitionPaths.swaggerPath);
  }

  return serviceMetadata;
}

function transformServiceMetadata(
  metadata: ParsedServiceMetadata,
  options: GeneratorOptions,
  globalNameFormatter: GlobalNameFormatter,
  serviceDefinitionPaths: ServiceDefinitionPaths,
  serviceMapping?: ServiceMapping
): VdmServiceMetadata {
  const formatter = new ServiceNameFormatter(
    metadata.edmx.entitySets.map(entitySet => entitySet.Name),
    metadata.edmx.complexTypes.map(complexType => complexType.Name),
    metadata.edmx.functionImports.map(functionImport => functionImport.Name)
  );

  const namespace = metadata.edmx.namespace;
  const directoryName = globalNameFormatter.uniqueDirectoryName(packageName(metadata, options, formatter), metadata.edmx.fileName);
  const npmPackageName = globalNameFormatter.uniqueNpmPackageName(npmCompliantName(directoryName), metadata.edmx.fileName);
  const speakingModuleName = formatter.directoryToSpeakingModuleName(directoryName);
  const joinedAssociationMetadata = joinAssociationMetadata(metadata.edmx.associationSets, metadata.edmx.associations);
  const joinedEntityMetadata = joinEntityMetadata(namespace, metadata.edmx.entityTypes, metadata.edmx.entitySets, metadata.swagger);
  const reservedFunctionImportNames = getFunctionImportNames(metadata);
  const complexTypes = transformComplexTypes(metadata.edmx.complexTypes, formatter, reservedFunctionImportNames);
  const className = `${speakingModuleName.replace(/ /g, '')}`;

  const vdmService = {
    namespace,
    originalFileName: metadata.edmx.fileName,
    directoryName,
    npmPackageName,
    speakingModuleName,
    servicePath: getServicePath(metadata, serviceMapping),
    entities: transformEntities(joinedEntityMetadata, joinedAssociationMetadata, complexTypes, formatter),
    edmxPath: serviceDefinitionPaths.edmxPath
  };
  const functionImports = transformFunctionImports(metadata, vdmService.entities, complexTypes, formatter);

  const apiHubMetadata = apiBusinessHubMetadata(metadata.swagger);

  return {
    ...vdmService,
    complexTypes,
    functionImports,
    apiBusinessHubMetadata: apiHubMetadata,
    className
  };
}

function apiBusinessHubMetadata(swagger?: SwaggerMetadata): ApiBusinessHubMetadata | undefined {
  if (!swagger) {
    return undefined;
  }

  const metadata: ApiBusinessHubMetadata = {
    communicationScenario: communicationScenario(swagger),
    url: `https://api.sap.com/api/${apiHubServiceName(swagger)}`
  };

  if (swagger.externalDocs && swagger.externalDocs.description === 'Business Documentation') {
    metadata.businessDocumentationUrl = swagger.externalDocs.url;
  }

  return metadata;
}

function apiHubServiceName(swagger: SwaggerMetadata): string {
  if (!swagger.basePath) {
    throw Error('The swagger base path is undefined.');
  }
  return swagger.basePath.split('/').slice(-1)[0];
}

function communicationScenario(swagger: SwaggerMetadata): string | null {
  if (!swagger['x-sap-ext-overview']) {
    return null;
  }

  return (
    swagger['x-sap-ext-overview']
      .find(x => x.name === 'Communication Scenario')
      .values.map(x => x.text)
      .join(', ') || null
  );
}

function packageName(metadata: ParsedServiceMetadata, options: GeneratorOptions, formatter: ServiceNameFormatter) {
  return formatter.originalToServiceName(metadata.edmx.namespace);
}

function getServicePath(metadata: ParsedServiceMetadata, serviceMapping?: ServiceMapping): string {
  let servicePath = servicePathFromMapping(serviceMapping) || servicePathFromSelfLink(metadata) || servicePathFromSwagger(metadata.swagger);
  if (!servicePath || servicePath === VALUE_IS_UNDEFINED) {
    logger.warn(
      'No service path could be determined from available metadata! ' +
        'To avoid this in the future, you can provide the correct value in "service-mapping.json". ' +
        'By default, the "service-mapping.json" file will be saved to and read from the input directory. ' +
        'You can supply a custom path using the -s/--serviceMapping flag. '
    );
    servicePath = VALUE_IS_UNDEFINED;
  }
  return servicePath;
}

function servicePathFromMapping(serviceMapping?: ServiceMapping): string | undefined {
  return serviceMapping && propertyExists(serviceMapping, 'servicePath') ? serviceMapping.servicePath : undefined;
}

function servicePathFromSelfLink(metadata: ParsedServiceMetadata): string | undefined {
  const selfLink = metadata.edmx.selfLink;
  if (selfLink) {
    return selfLink
      .replace(/^https?:\/\//, '')
      .replace(/\/\$metadata$/, '')
      .replace(/^[^\/]+/, '');
  }
}

function servicePathFromSwagger(swagger?: SwaggerMetadata): string | undefined {
  if (swagger && propertyExists(swagger, 'basePath')) {
    return swagger.basePath;
  }
}

function transformComplexTypes(complexTypes: EdmxComplexType[], formatter: ServiceNameFormatter, reservedNames: Set<string>): VdmComplexType[] {
  const formattedTypes = complexTypes.reduce((formatted, c) => ({ ...formatted, [c.Name]: formatter.originalToComplexTypeName(c.Name) }), {});
  return complexTypes.map(c => {
    const typeName = formattedTypes[c.Name];
    return {
      typeName,
      originalName: c.Name,
      factoryName: formatter.typeNameToFactoryName(typeName, reservedNames),
      fieldType: complexTypeFieldType(typeName),
      properties: c.Property.map(p => {
        checkCollectionKind(p);
        const instancePropertyName = formatter.originalToInstancePropertyName(c.Name, p.Name);
        const isComplex = isComplexType(p.Type);
        const parsedType = parseType(p.Type);
        return {
          originalName: p.Name,
          instancePropertyName,
          staticPropertyName: formatter.originalToStaticPropertyName(c.Name, p.Name),
          propertyNameAsParam: applyPrefixOnJsConfictParam(instancePropertyName),
          description: propertyDescription(p),
          technicalName: p.Name,
          nullable: isNullableProperty(p),
          edmType: isComplex ? p.Type : parsedType,
          jsType: isComplex ? formattedTypes[parsedType] : edmToTsType(p.Type),
          fieldType: isComplex ? formattedTypes[parsedType] + 'Field' : edmToComplexPropertyType(p.Type),
          isComplex
        };
      })
    };
  });
}

function parseReturnType(returnType: string, entities: VdmEntity[], complexTypes: VdmComplexType[]): VdmFunctionImportReturnType {
  if (!returnType) {
    return {
      returnTypeCategory: VdmFunctionImportReturnTypeCategory.VOID,
      returnType: 'undefined',
      builderFunction: '(val) => undefined',
      isMulti: false
    };
  }
  const isMulti = isMultiReturnType(returnType);
  if (isMulti) {
    returnType = returnType.replace('Collection(', '').replace(')', '');
  }
  if (returnType.startsWith('Edm.')) {
    return {
      returnTypeCategory: VdmFunctionImportReturnTypeCategory.EDM_TYPE,
      returnType: propertyJsType(returnType)!,
      builderFunction: `(val) => edmToTs(val, '${returnType}')`,
      isMulti
    };
  }
  const parsedReturnType = returnType.split('.').slice(-1)[0];
  const entity = entities.find(e => e.entityTypeName === parsedReturnType);
  if (entity) {
    return {
      returnTypeCategory: VdmFunctionImportReturnTypeCategory.ENTITY,
      returnType: entity.className,
      builderFunction: entity.className,
      isMulti
    };
  } else {
    const complexType = complexTypes.find(c => c.originalName === parsedReturnType);
    if (!complexType) {
      throw Error(`Unable to find complex type with name ${parsedReturnType}.`);
    }
    return {
      returnTypeCategory: VdmFunctionImportReturnTypeCategory.COMPLEX_TYPE,
      returnType: complexType.typeName,
      builderFunction: `${complexType.typeName}.build`,
      isMulti
    };
  }
}

function isMultiReturnType(returnType: string): boolean {
  return returnType.startsWith('Collection');
}

function transformFunctionImports(
  serviceMetadata: ParsedServiceMetadata,
  entities: VdmEntity[],
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter
): VdmFunctionImport[] {
  const edmxFunctionImports = serviceMetadata.edmx.functionImports;

  return edmxFunctionImports.map(f => {
    const functionName = formatter.originalToFunctionImportName(f.Name);
    const functionImport = {
      httpMethod: f['m:HttpMethod'].toLowerCase(),
      originalName: f.Name,
      functionName,
      returnType: parseReturnType(f.ReturnType, entities, complexTypes),
      parametersTypeName: toTypeNameFormat(`${functionName}Parameters`)
    };

    const swaggerDefinition = swaggerDefinitionForFunctionImport(serviceMetadata, functionImport.originalName, functionImport.httpMethod);

    const parameters = f.Parameter.map(p => {
      const swaggerParameter = swaggerDefinition ? swaggerDefinition.parameters.find(param => param.name === p.Name) : undefined;
      return {
        originalName: p.Name,
        parameterName: formatter.originalToParameterName(f.Name, p.Name),
        edmType: parseType(p.Type),
        jsType: edmToTsType(p.Type),
        nullable: isNullableParameter(p),
        description: parameterDescription(p, swaggerParameter)
      };
    });

    return {
      ...functionImport,
      parameters,
      description: functionImportDescription(swaggerDefinition, functionImport.originalName)
    };
  });
}

function swaggerDefinitionForFunctionImport(
  serviceMetadata: ParsedServiceMetadata,
  originalName: string,
  httpMethod: string
): SwaggerPath | undefined {
  if (serviceMetadata.swagger) {
    const paths = serviceMetadata.swagger.paths;
    const entryPath = Object.keys(paths).find(path => path === `/${originalName}`);
    if (entryPath) {
      const key = Object.keys(paths[entryPath]).find(k => k.toLowerCase() === httpMethod.toLowerCase());
      if (key) {
        return paths[entryPath][key];
      }
    }
  }
}

function functionImportDescription(swaggerDefinition: SwaggerPath | undefined, originalName: string): string {
  if (swaggerDefinition && swaggerDefinition.summary) {
    return endWithDot(swaggerDefinition.summary);
  }
  return endWithDot(toTitleFormat(originalName));
}

function joinAssociationMetadata(associationSets: EdmxAssociationSet[], associations: EdmxAssociation[]): JoinedAssociationMetadata[] {
  return associationSets.map(assocSet => {
    const matchingAssoc = associations.find(a => a.Name === assocSet.Association.split('.')[assocSet.Association.split('.').length - 1]);

    if (!matchingAssoc) {
      throw Error(`Unable to match the association set: ${assocSet.Association} with associations: ${associations}.`);
    }

    const ends = assocSet.End.map(
      assocSetEnd =>
        ({
          ...assocSetEnd,
          ...matchingAssoc.End.find(end => end.Role === assocSetEnd.Role)
        } as End)
    );

    return {
      Name: matchingAssoc.Name,
      'sap:creatable': assocSet['sap:creatable'],
      'sap:updatable': assocSet['sap:updatable'],
      'sap:deletable': assocSet['sap:deletable'],
      'sap:content-version': assocSet['sap:content-version'],
      Ends: ends
    };
  });
}

function joinEntityMetadata(
  namespace: string,
  entityTypes: EdmxEntityType[],
  entitySets: EdmxEntitySet[],
  swaggerMetaData?: SwaggerMetadata
): JoinedEntityMetadata[] {
  return entitySets.map(entitySet => {
    // we assume metadata files to have a maximum of two schemas currently
    // so entitySet.EntityType.split('.').slice(-1)[0] that we will only find one matching entry (and thus never forget anything)
    const entityType = entityTypes.find(t => t.Name === entitySet.EntityType.split('.').slice(-1)[0]);

    if (!entityType) {
      throw Error('The entity type is undefined.');
    }

    const joined: JoinedEntityMetadata = {
      entitySet,
      entityType
    };

    if (swaggerMetaData) {
      const defKey = Object.keys(swaggerMetaData.definitions).find(name => `${namespace}.${name}` === entitySet.EntityType);
      if (defKey) {
        joined.swaggerDefinition = swaggerMetaData.definitions[defKey];
      }
    }

    return joined;
  });
}

function transformEntities(
  entities: JoinedEntityMetadata[],
  associations: JoinedAssociationMetadata[],
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter
): VdmEntity[] {
  const classNames = entities.reduce((names, e) => {
    names[e.entitySet.Name] = formatter.originalToEntityClassName(e.entitySet.Name);
    return names;
  }, {});
  return entities.map(e => {
    const entity = {
      entitySetName: e.entitySet.Name,
      entityTypeName: e.entityType.Name,
      className: classNames[e.entitySet.Name],
      properties: properties(e, complexTypes, formatter),
      navigationProperties: navigationProperties(e, associations, classNames, formatter),
      creatable: e.entitySet ? isCreatable(e.entitySet) : true,
      updatable: e.entitySet ? isUpdatable(e.entitySet) : true,
      deletable: e.entitySet ? isDeletable(e.entitySet) : true
    };

    return {
      ...entity,
      keys: keys(entity.properties, e.entityType.Key.PropertyRef),
      description: entityDescription(e, entity.className)
    };
  });
}

function keys(props: VdmProperty[], edmxKeys: EdmxPropertyRef[]): VdmProperty[] {
  return edmxKeys.map(key => props.find(prop => prop.originalName === key.Name)).filter(e => !!e) as VdmProperty[];
}

function properties(entity: JoinedEntityMetadata, complexTypes: VdmComplexType[], formatter: ServiceNameFormatter): VdmProperty[] {
  return entity.entityType.Property.map(p => {
    checkCollectionKind(p);
    const swaggerProp = entity.swaggerDefinition ? entity.swaggerDefinition.properties[p.Name] : undefined;
    const instancePropertyName = formatter.originalToInstancePropertyName(entity.entitySet.Name, p.Name);
    const isComplex = isComplexType(p.Type);
    return {
      originalName: p.Name,
      instancePropertyName,
      staticPropertyName: formatter.originalToStaticPropertyName(entity.entitySet.Name, p.Name),
      propertyNameAsParam: applyPrefixOnJsConfictParam(instancePropertyName),
      edmType: p.Type,
      jsType: propertyJsType(p.Type) || complexTypeForName(p.Type, complexTypes),
      fieldType: propertyFieldType(p.Type) || complexTypeFieldForName(p.Type, complexTypes),
      description: propertyDescription(p, swaggerProp),
      nullable: isNullableProperty(p),
      maxLength: p.MaxLength,
      isComplex
    };
  });
}

const propertyFieldType = (type: string): string | undefined => (type.startsWith('Edm.') ? edmToFieldType(type) : undefined);

const propertyJsType = (type: string): string | undefined => (type.startsWith('Edm.') ? edmToTsType(type) : undefined);

const complexTypeName = (type: string) => last(type.split('.'));

const findComplexType = (name: string, complexTypes: VdmComplexType[]): VdmComplexType | undefined =>
  complexTypes.find(c => c.originalName === complexTypeName(name));

function complexTypeForName(name: string, complexTypes: VdmComplexType[]): string {
  const complexType = findComplexType(name, complexTypes);
  if (complexType) {
    return complexType.typeName;
  }
  logger.warn(`No complex type mapping found for ${name}! Using "any" instead. This will most likely result in errors.`);
  return 'any';
}

const complexTypeFieldType = (typeName: string) => typeName + 'Field';

function complexTypeFieldForName(name: string, complexTypes: VdmComplexType[]): string {
  const complexType = findComplexType(name, complexTypes);
  if (complexType) {
    return complexTypeFieldType(complexType.typeName);
  }
  logger.warn(`No complex type mapping found for ${name}! Using "any" instead. This will most likely result in errors.`);
  return 'any';
}

function navigationProperties(
  entity: JoinedEntityMetadata,
  associations: JoinedAssociationMetadata[],
  classNames: { [originalName: string]: string },
  formatter: ServiceNameFormatter
): VdmNavigationProperty[] {
  return entity.entityType.NavigationProperty.map(navProp => {
    const relationship = navProp.Relationship.split('.').pop();
    const association = associations.filter(ass => ass.Name === relationship).pop();
    if (!association) {
      throw Error(`Unable to find the association with the name: ${relationship}`);
    }
    const from = association.Ends.find(end => end.Role === navProp.FromRole);
    const to = association.Ends.find(end => end.Role === navProp.ToRole);

    if (!from) {
      throw Error(`Unable to get the role property of the association ends: ${association.Ends} with the name: ${navProp.FromRole}`);
    }
    if (!to) {
      throw Error(`Unable to get the role property of the association ends: ${association.Ends} with the name: ${navProp.ToRole}`);
    }

    const instancePropertyName = formatter.originalToNavigationPropertyName(entity.entitySet.Name, navProp.Name);

    return {
      originalName: navProp.Name,
      instancePropertyName,
      staticPropertyName: formatter.originalToStaticPropertyName(entity.entitySet.Name, navProp.Name),
      propertyNameAsParam: applyPrefixOnJsConfictParam(instancePropertyName),
      from: entity.entityType.Name,
      to: to.EntitySet,
      toEntityClassName: classNames[to.EntitySet],
      multiplicity: from.Multiplicity + ' - ' + to.Multiplicity,
      isMultiLink: to.Multiplicity.endsWith('*')
    };
  });
}

function shortPropertyDescription(property: EdmxProperty, swaggerProperty?: SwaggerProperty): string {
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

function entityDescription(entity: JoinedEntityMetadata, className: string): string {
  if (entity.entityType['sap:label']) {
    return entity.entityType['sap:label'];
  }
  return entity.swaggerDefinition && entity.swaggerDefinition.title ? entity.swaggerDefinition.title : toTitleFormat(className);
}

function longDescription(documented: EdmxDocumented, described?: SwaggerDescribed): string {
  let docs = '';
  if (documented.Documentation) {
    const summmary = ensureString(documented.Documentation.Summary);
    const longDesc = ensureString(documented.Documentation.LongDescription);
    docs = `${summmary}\n${longDesc}`.trim();
  }
  if (!docs && described) {
    docs = ensureString(described.description);
  }
  return endWithDot(docs.trim());
}

function propertyDescription(property: EdmxProperty, swaggerProperty?: SwaggerProperty): string {
  const short = shortPropertyDescription(property, swaggerProperty);
  const long = longDescription(property, swaggerProperty);
  return `${short}\n${long}`.trim();
}

function parameterDescription(parameter: EdmxParameter, swaggerParameter?: SwaggerPathParameter): string {
  const short = endWithDot(toTitleFormat(parameter.Name));
  const long = longDescription(parameter, swaggerParameter);
  return endWithDot((long || short).trim());
}

function parseType(type: string): string {
  return type.startsWith('Edm') ? type : type.split('.')[1];
}

function isComplexType(type: string): boolean {
  const typeParts = type.split('.');
  return typeParts[0] !== 'Edm' && typeParts[1] !== undefined;
}

function getFunctionImportNames(metadata: ParsedServiceMetadata) {
  return new Set(metadata.edmx.functionImports.map(f => voca.camelCase(f.Name)));
}

function checkCollectionKind(property: EdmxProperty) {
  if (property.hasOwnProperty('CollectionKind')) {
    logger.warn(
      `"CollectionKind" attribute found in the "${property.Name}" property. Currently, handling collection of properties is not supported by the generator.`
    );
  }
}

interface JoinedEntityMetadata {
  entitySet: EdmxEntitySet;
  entityType: EdmxEntityType;
  swaggerDefinition?: SwaggerEntity;
}

interface JoinedAssociationMetadata {
  Name: string;
  'sap:creatable': string;
  'sap:updatable': string;
  'sap:deletable': string;
  'sap:content-version': string;
  Ends: End[];
}

interface End {
  EntitySet: string;
  Type: string;
  Multiplicity: string;
  Role: string;
}
