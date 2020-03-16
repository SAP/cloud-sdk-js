/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { unique } from '@sap-cloud-sdk/util';
import { NamespaceDeclarationStructure, StructureKind, VariableDeclarationKind, VariableStatementStructure } from 'ts-morph';
import { linkClass } from '../generator-utils';
import { prependPrefix } from '../internal-prefix';
import { getStaticNavPropertyDescription, getStaticPropertyDescription } from '../typedoc';
import { VdmEntity, VdmNavigationProperty, VdmProperty, VdmServiceMetadata } from '../vdm-types';

export function entityNamespace(entity: VdmEntity, service: VdmServiceMetadata): NamespaceDeclarationStructure {
  return {
    kind: StructureKind.Namespace,
    name: entity.className,
    isExported: true,
    statements: [
      ...properties(entity),
      ...navigationProperties(entity, service),
      allFields(entity),
      allFieldSelector(entity),
      keyFields(entity),
      keys(entity)
    ]
  };
}

function properties(entity: VdmEntity): VariableStatementStructure[] {
  return entity.properties.map(prop => property(prop, entity));
}

function property(prop: VdmProperty, entity: VdmEntity): VariableStatementStructure {
  const type = `'${prop.edmType.startsWith('Edm') ? prop.edmType : prop.edmType.split('.').pop()}'`;
  const initializer = prop.isComplex
    ? `new ${prop.fieldType}('${prop.originalName}', ${entity.className})`
    : `new ${prop.fieldType}('${prop.originalName}', ${entity.className}, ${type})`;
  return {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: prop.staticPropertyName,
        type: `${prop.fieldType}<${entity.className}>`,
        initializer
      }
    ],
    docs: [getStaticPropertyDescription(prop)],
    isExported: true
  };
}

function navigationProperties(entity: VdmEntity, service: VdmServiceMetadata): VariableStatementStructure[] {
  return entity.navigationProperties.map(navProp => navigationProperty(navProp, entity, service));
}

function navigationProperty(navProp: VdmNavigationProperty, entity: VdmEntity, service: VdmServiceMetadata): VariableStatementStructure {
  const matchedEntity = service.entities.find(e => e.entitySetName === navProp.to);
  if (!matchedEntity) {
    throw Error(`Failed to find the entity from the service: ${JSON.stringify(service)} for nav property ${navProp}`);
  }

  const toEntity = matchedEntity.className;

  return {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: navProp.staticPropertyName,
        type: `${linkClass(navProp)}<${entity.className},${toEntity}>`,
        initializer: `new ${linkClass(navProp)}('${navProp.originalName}', ${entity.className}, ${toEntity})`
      }
    ],
    docs: [getStaticNavPropertyDescription(navProp)],
    isExported: true
  };
}

function allFields(entity: VdmEntity): VariableStatementStructure {
  const fieldTypes = unique([
    ...entity.properties.map(p => `${p.fieldType}<${entity.className}>`),
    ...entity.navigationProperties.map(p => `${linkClass(p)}<${entity.className},${p.toEntityClassName}>`)
  ]);
  return {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: prependPrefix('allFields'),
        type: `Array<${fieldTypes.join(' | ')}>`,
        initializer: `[
          ${entity.properties
            .map(prop => prop.staticPropertyName)
            .concat(entity.navigationProperties.map(navProp => navProp.staticPropertyName))
            .map(name => `${entity.className}.${name}`)
            .join(', \n')}
          ]`
      }
    ],
    docs: [`All fields of the ${entity.className} entity.`],
    isExported: true
  };
}

function allFieldSelector(entity: VdmEntity): VariableStatementStructure {
  return {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'ALL_FIELDS',
        type: `AllFields<${entity.className}>`,
        initializer: `new AllFields('*', ${entity.className})`
      }
    ],
    docs: ['All fields selector.'],
    isExported: true
  };
}

function keyFields(entity: VdmEntity): VariableStatementStructure {
  return {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: prependPrefix('keyFields'),
        type: `Array<Selectable<${entity.className}>>`,
        initializer: '[' + entity.keys.map(key => `${entity.className}.${key.staticPropertyName}`).join(', ') + ']'
      }
    ],
    docs: [`All key fields of the ${entity.className} entity.`],
    isExported: true
  };
}

function keys(entity: VdmEntity): VariableStatementStructure {
  return {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: prependPrefix('keys'),
        type: `{[keys: string]: Selectable<${entity.className}>}`,
        initializer: `${entity.className}.${prependPrefix('keyFields')}.reduce((acc: {[keys: string]: Selectable<${
          entity.className
        }>}, field: Selectable<${entity.className}>) => {
          acc[field._fieldName] = field;
          return acc;
        }, {})`
      }
    ],
    docs: [`Mapping of all key field names to the respective static field property ${entity.className}.`],
    isExported: true
  };
}
