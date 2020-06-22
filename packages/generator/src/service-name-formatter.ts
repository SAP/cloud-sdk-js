/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { toPropertyFormat, toStaticPropertyFormat } from '@sap-cloud-sdk/core';
import voca from 'voca';
import { stripPrefix } from './internal-prefix';
import { applyPrefixOnJsConfictFunctionImports } from './name-formatting-strategies';
import { UniqueNameFinder } from './unique-name-finder';

export class ServiceNameFormatter {
  private serviceWideNamesCache: string[] = [
    'BinaryField',
    'NumberField',
    'Moment',
    'BigNumber',
    'BigNumberField',
    'StringField',
    'DateField',
    'AllFields',
    'CustomField',
    'Entity',
    'EntityBuilderType',
    'Field',
    'Selectable',
    'OneToOneLink',
    'BooleanField',
    'Link',
    'Time',
    'TimeField'
  ];

  private parameterNamesCache: { [functionImportName: string]: string[] } = {};
  private staticPropertyNamesCache: {
    [entitySetOrComplexTypeName: string]: string[];
  } = {};
  private instancePropertyNamesCache: {
    [entitySetOrComplexTypeName: string]: string[];
  } = {};

  constructor(
    entitySetNames: string[],
    complexTypeNames: string[],
    functionImportNames: string[]
  ) {
    // Here we assume that entitysets and complextypes cannot have the same original name
    [...entitySetNames, ...complexTypeNames].forEach(
      entitySetOrComplexTypeName => {
        this.staticPropertyNamesCache[entitySetOrComplexTypeName] = [];
        this.instancePropertyNamesCache[entitySetOrComplexTypeName] = [];
      }
    );

    functionImportNames.forEach(functionImportName => {
      this.parameterNamesCache[functionImportName] = [];
    });
  }

  originalToServiceName(name: string): string {
    let formattedName = name.replace(/\.|\//g, '_');
    formattedName = stripAPIUnderscore(formattedName);
    formattedName = stripUnderscoreSrv(formattedName);
    formattedName = voca.kebabCase(formattedName);
    return formattedName.endsWith('service')
      ? formattedName
      : `${formattedName}-service`;
  }

  originalToStaticPropertyName(
    originalContainerTypeName: string,
    originalPropertyName: string
  ): string {
    const transformedName = toStaticPropertyFormat(
      stripPrefix(originalPropertyName)
    );
    const cache = this.getAndInitStaticPropertyNameCache(
      originalContainerTypeName
    );
    const newName = UniqueNameFinder.getInstance()
      .withAlreadyUsedNames(cache)
      .findUniqueName(transformedName);

    cache.push(newName.uniqueName);
    return newName.uniqueName;
  }

  originalToInstancePropertyName(
    originalContainerTypeName: string,
    originalPropertyName: string
  ): string {
    const transformedName = toPropertyFormat(stripPrefix(originalPropertyName));

    const cache = this.getAndInitInstancePropertyNameCache(
      originalContainerTypeName
    );
    const newName = UniqueNameFinder.getInstance()
      .withAlreadyUsedNames(cache)
      .findUniqueName(transformedName);

    cache.push(newName.uniqueName);
    return newName.uniqueName;
  }

  originalToFunctionImportName(str: string): string {
    const transformedName = voca.camelCase(str);
    const newName = UniqueNameFinder.getInstance()
      .withAlreadyUsedNames(this.serviceWideNamesCache)
      .findUniqueName(transformedName);

    this.serviceWideNamesCache.push(newName.uniqueName);
    return applyPrefixOnJsConfictFunctionImports(newName.uniqueName);
  }

  originalToComplexTypeName(str: string): string {
    const transformedName = stripAUnderscore(voca.titleCase(str)).replace(
      '_',
      ''
    );

    const newName = UniqueNameFinder.getInstance()
      .withAlreadyUsedNames(this.serviceWideNamesCache)
      .findUniqueName(transformedName);

    this.serviceWideNamesCache.push(newName.uniqueName);
    return newName.uniqueName;
  }

  typeNameToFactoryName(str: string, reservedNames: Set<string>): string {
    let factoryName = `create${str}`;
    let index = 1;
    while (reservedNames.has(factoryName)) {
      factoryName = `${factoryName}_${index}`;
      index += 1;
    }
    const newName = UniqueNameFinder.getInstance()
      .withAlreadyUsedNames(this.serviceWideNamesCache)
      .findUniqueName(factoryName);

    this.serviceWideNamesCache.push(newName.uniqueName);
    return newName.uniqueName;
  }

  originalToNavigationPropertyName(
    entitySetName: string,
    originalPropertyName: string
  ): string {
    const transformedName = voca.camelCase(originalPropertyName);

    const cache = this.getAndInitInstancePropertyNameCache(entitySetName);
    const newName = UniqueNameFinder.getInstance()
      .withAlreadyUsedNames(cache)
      .findUniqueName(transformedName);

    cache.push(newName.uniqueName);
    return newName.uniqueName;
  }

  originalToParameterName(
    originalFunctionImportName: string,
    originalParameterName: string
  ): string {
    const transformedName = voca.camelCase(originalParameterName);

    const cache = this.getAndInitParameterNameCache(originalFunctionImportName);
    const newName = UniqueNameFinder.getInstance()
      .withAlreadyUsedNames(cache)
      .findUniqueName(transformedName);

    cache.push(newName.uniqueName);
    return newName.uniqueName;
  }

  originalToEntityClassName(entitySetName: string): string {
    let transformedName = entitySetName;
    if (transformedName.endsWith('Collection')) {
      transformedName = stripCollection(entitySetName);
    }

    transformedName = stripAUnderscore(voca.titleCase(transformedName));

    const newName = UniqueNameFinder.getInstance()
      .withAlreadyUsedNames(this.serviceWideNamesCache)
      .withRelatedNames(getInterfaceNames)
      .findUniqueName(transformedName);
    this.serviceWideNamesCache.push(
      newName.uniqueName,
      ...newName.relatedUniqueNames
    );
    return newName.uniqueName;
  }

  directoryToSpeakingModuleName(packageName: string): string {
    return voca.titleCase(packageName.replace(/-/g, ' '));
  }

  private getAndInitStaticPropertyNameCache(name: string) {
    if (this.staticPropertyNamesCache[name]) {
      return this.staticPropertyNamesCache[name];
    }
    this.staticPropertyNamesCache[name] = [];
    return this.staticPropertyNamesCache[name];
  }

  private getAndInitInstancePropertyNameCache(name: string) {
    if (this.instancePropertyNamesCache[name]) {
      return this.instancePropertyNamesCache[name];
    }
    this.instancePropertyNamesCache[name] = [];
    return this.instancePropertyNamesCache[name];
  }

  private getAndInitParameterNameCache(name: string) {
    if (this.parameterNamesCache[name]) {
      return this.parameterNamesCache[name];
    }
    this.parameterNamesCache[name] = [];
    return this.parameterNamesCache[name];
  }
}

function stripUnderscoreSrv(name: string) {
  return name.endsWith('_SRV') ? name.substr(0, name.length - 4) : name;
}

function stripAPIUnderscore(name: string) {
  return name.startsWith('API_') ? name.substring(4, name.length) : name;
}

export function stripCollection(name: string) {
  return name.endsWith('Collection')
    ? name.substring(0, name.length - 10)
    : name;
}

function stripAUnderscore(name: string) {
  return name.startsWith('A_') ? name.substring(2, name.length) : name;
}

// TODO discuss how to use this in a test without exporting
export function getInterfaceNames(entitySetName: string): string[] {
  return [`${entitySetName}Type`, `${entitySetName}TypeForceMandatory`];
}
