/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { caps, ODataVersion, unique } from '@sap-cloud-sdk/util';
import { getGenericParameters, linkClass } from '../generator-utils';
import {
  VdmProperty,
  VdmNavigationProperty,
  VdmEntity,
  VdmMappedEdmType,
  VdmServiceMetadata
} from '../vdm-types';
import { getPropertyDescription, getNavPropertyDescription } from './typedoc';

interface Documented {
  commentLines: string[];
}

interface TemplateProperty extends Documented {
  name: string;
  type: string;
}

interface TemplateEntity extends Documented, VdmEntity {
  className: string;
  entitySetName: string;
  properties: (VdmProperty & TemplateProperty)[];
  navigationProperties: (VdmNavigationProperty & TemplateProperty)[];
}

export function instanceProperty(
  property: VdmProperty
): VdmProperty & TemplateProperty {
  return {
    ...property,
    name: property.instancePropertyName + (property.nullable ? '?' : '!'),
    type: property.isCollection ? `${property.jsType}[]` : property.jsType,
    commentLines: getPropertyDescription(property, {
      nullable: property.nullable,
      maxLength: property.maxLength
    })
  };
}

export function instanceNavigationProperty(
  navigationProperty: VdmNavigationProperty
): VdmNavigationProperty & TemplateProperty {
  return {
    ...navigationProperty,
    name: navigationProperty.instancePropertyName + '!',
    type:
      navigationProperty.toEntityClassName +
      (navigationProperty.isCollection ? '[]' : ''),
    commentLines: [getNavPropertyDescription(navigationProperty)]
  };
}

export function entityClass(entity: VdmEntity): TemplateEntity {
  return {
    ...entity,
    commentLines: [],
    properties: entity.properties.map(property => instanceProperty(property)),
    navigationProperties: entity.navigationProperties.map(property =>
      instanceNavigationProperty(property)
    )
  };
}

const potentialExternalImportDeclarations: Import[] = [
  { module: 'moment', imports: ['Moment', 'Duration'] },
  { module: 'bignumber.js', imports: ['BigNumber'] }
];

export interface Import {
  module: string;
  imports: string[];
}

export function entityImports(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): Import[] {
  const versionInCaps = caps(oDataVersion);
  return [
    {
      module: `./${entity.className}RequestBuilder`,
      imports: [`${entity.className}RequestBuilder`]
    },
    ...externalImportDeclarations(entity.properties),
    ...complexTypeImportDeclarations(entity.properties),
    ...enumTypeImportDeclarations(entity.properties),
    coreImportDeclaration(
      [
        ...corePropertyTypeImportNames(entity.properties),
        ...corePropertyFieldTypeImportNames(entity.properties),
        ...coreNavPropertyFieldTypeImportNames(
          entity.navigationProperties,
          oDataVersion
        ),
        'AllFields',
        `CustomField${versionInCaps}`,
        `Entity${versionInCaps}`,
        'EntityBuilderType',
        'Field'
      ].sort()
    )
  ];
}

export function externalImportDeclarations(
  properties: VdmMappedEdmType[]
): Import[] {
  return potentialExternalImportDeclarations
    .map(potentialImport => ({
      module: potentialImport.module,
      imports: potentialImport.imports.filter(importName =>
        properties.map(prop => prop.jsType).includes(importName)
      )
    }))
    .filter(potentialImport => potentialImport.imports?.length);
}

export function complexTypeImportDeclarations(
  properties: VdmProperty[]
): Import[] {
  return mergeImportDeclarations(
    properties
      .filter(prop => prop.isComplex)
      .map(prop => ({
        module: `./${prop.jsType}`,
        imports: [prop.jsType, ...(prop.isCollection ? [] : [prop.fieldType])]
      }))
  );
}

export function enumTypeImportDeclarations(
  properties: VdmProperty[]
): Import[] {
  return mergeImportDeclarations(
    properties
      .filter(prop => prop.isEnum)
      .map(prop => ({
        module: `./${prop.jsType}`,
        imports: [prop.jsType]
      }))
  );
}

export function coreImportDeclaration(imports: string[]): Import {
  return {
    module: '@sap-cloud-sdk/core',
    imports: unique(imports)
  };
}

export function corePropertyTypeImportNames(
  properties: VdmMappedEdmType[]
): string[] {
  return properties.map(prop => prop.jsType).includes('Time') ? ['Time'] : [];
}

export function corePropertyFieldTypeImportNames(
  properties: VdmProperty[]
): string[] {
  return unique(
    properties
      .filter(prop => !prop.isComplex || prop.isCollection)
      .map(prop => prop.fieldType)
  );
}

export function coreNavPropertyFieldTypeImportNames(
  navProperties: VdmNavigationProperty[],
  oDataVersion: ODataVersion
): string[] {
  return unique(navProperties.map(navProp => linkClass(navProp, oDataVersion)));
}

// Only supports named imports
export function mergeImportDeclarations(imports: Import[]) {
  return imports
    .reduce((mergedImports: Import[], i) => {
      const sameModule = mergedImports.find(
        declaration => declaration.module === i.module
      );
      if (sameModule) {
        sameModule.imports = [...sameModule.imports, ...i.imports];
        return mergedImports;
      }
      return [...mergedImports, i];
    }, [])
    .map(i => ({ ...i, imports: unique(i.imports) }))
    .filter(i => i.imports?.length);
}

export function otherEntityImports(
  service: VdmServiceMetadata,
  entity: VdmEntity
): Import[] {
  return Array.from(new Set(entity.navigationProperties.map(n => n.to)))
    .map(to => {
      const matchedEntity = service.entities.find(e => e.entitySetName === to);
      if (matchedEntity) {
        return matchedEntity.className;
      }
      throw Error(
        `Failed to find the entity from the service: ${JSON.stringify(
          service
        )} for entity ${entity}`
      );
    })
    .filter(name => name !== entity.className)
    .map(name => otherEntityImport(name));
}

function otherEntityImport(name: string): Import {
  return {
    imports: [name, `${name}Type`],
    module: `./${name}`
  };
}

export function allFieldTypes(
  service: VdmServiceMetadata,
  entity: VdmEntity
): string[] {
  return unique([
    ...entity.properties.map(
      p => `${p.fieldType}<${getGenericParameters(entity.className, p)}>`
    ),
    ...entity.navigationProperties.map(
      p =>
        `${linkClass(p, service.oDataVersion)}<${entity.className}, ${
          p.toEntityClassName
        }>`
    )
  ]);
}
