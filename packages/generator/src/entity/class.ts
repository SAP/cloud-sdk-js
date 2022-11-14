import {
  ClassDeclarationStructure,
  MethodDeclarationStructure,
  PropertyDeclarationStructure,
  StructureKind
} from 'ts-morph';
import { prependPrefix } from '../internal-prefix';
import { operationFunctionBase } from '../operations';
import {
  addLeadingNewline,
  getEntityDescription,
  getNavPropertyDescription,
  getPropertyDescription
} from '../typedoc';
import {
  VdmEntity,
  VdmNavigationProperty,
  VdmOperation,
  VdmProperty,
  VdmServiceMetadata
} from '../vdm-types';

/**
 * @internal
 */
export function entityClass(
  entity: VdmEntity,
  service: VdmServiceMetadata
): ClassDeclarationStructure {
  return {
    kind: StructureKind.Class,
    name: `${entity.className}<T extends DeSerializers = DefaultDeSerializers>`,
    ctors: [
      {
        parameters: [
          {
            name: '_entityApi',
            type: `${entity.className}Api<T>`,
            isReadonly: true
          }
        ],
        statements: ['super(_entityApi);']
      }
    ],
    extends: 'Entity',
    implements: [`${entity.className}Type<T>`],
    properties: [
      ...staticProperties(entity, service),
      ...properties(entity),
      ...navProperties(entity, service)
    ],
    methods: [
      ...boundOperations(entity.functions, service),
      ...boundOperations(entity.actions, service)
    ],
    isExported: true,
    docs: [addLeadingNewline(getEntityDescription(entity, service))]
  };
}

function staticProperties(
  entity: VdmEntity,
  service: VdmServiceMetadata
): PropertyDeclarationStructure[] {
  return [entityName(entity), defaultServicePath(service), keys(entity)];
}

function entityName(entity: VdmEntity): PropertyDeclarationStructure {
  return {
    kind: StructureKind.Property,
    name: prependPrefix('entityName'),
    isStatic: true,
    initializer: `'${entity.entitySetName}'`,
    docs: [addLeadingNewline(`Technical entity name for ${entity.className}.`)]
  };
}

function defaultServicePath(
  service: VdmServiceMetadata
): PropertyDeclarationStructure {
  return {
    kind: StructureKind.Property,
    name: prependPrefix('defaultServicePath'),
    isStatic: true,
    initializer: `'${service.servicePath}'`,
    docs: [addLeadingNewline('Default url path for the according service.')]
  };
}

function keys(entity: VdmEntity): PropertyDeclarationStructure {
  return {
    kind: StructureKind.Property,
    name: prependPrefix('keys'),
    isStatic: true,
    initializer: `[${entity.keys
      .map(key => `'${key.originalName}'`)
      .join(',')}]`,
    docs: [
      addLeadingNewline(`All key fields of the ${entity.className} entity`)
    ]
  };
}

function properties(entity: VdmEntity): PropertyDeclarationStructure[] {
  return entity.properties.map(prop => property(prop));
}

function boundOperations(
  operations: VdmOperation[],
  service: VdmServiceMetadata
): MethodDeclarationStructure[] {
  return operations.map(operation => ({
    kind: StructureKind.Method,
    ...operationFunctionBase(operation, service)
  }));
}

function property(prop: VdmProperty): PropertyDeclarationStructure {
  return {
    kind: StructureKind.Property,
    name: prop.instancePropertyName + (prop.nullable ? '?' : '!'),
    type: getPropertyType(prop),
    docs: [
      addLeadingNewline(
        getPropertyDescription(prop, {
          nullable: prop.nullable,
          maxLength: prop.maxLength
        })
      )
    ]
  };
}

/**
 * @internal
 * @param prop - Property type in Vdm form.
 * @returns Property type as string.
 */
export function getPropertyType(prop: VdmProperty): string {
  if (prop.isCollection) {
    if (prop.isComplex) {
      return `${prop.jsType}<T>[]` + getNullableSuffix(prop);
    }
    if (prop.isEnum) {
      return `${prop.jsType}[]` + getNullableSuffix(prop);
    }
    return `DeserializedType<T, '${prop.edmType}'>[]` + getNullableSuffix(prop);
  }

  if (prop.isComplex) {
    return `${prop.jsType}<T>` + getNullableSuffix(prop);
  }

  if (prop.isEnum) {
    return `${prop.jsType}` + getNullableSuffix(prop);
  }

  return `DeserializedType<T, '${prop.edmType}'>` + getNullableSuffix(prop);
}

function getNullableSuffix(prop: VdmProperty) {
  return prop.nullable ? ' | null' : '';
}

function navProperties(
  entity: VdmEntity,
  service: VdmServiceMetadata
): PropertyDeclarationStructure[] {
  return entity.navigationProperties.map(navProp =>
    navProperty(navProp, service)
  );
}

function navProperty(
  navProp: VdmNavigationProperty,
  service: VdmServiceMetadata
): PropertyDeclarationStructure {
  const entity = service.entities.find(e => e.entitySetName === navProp.to);
  if (!entity) {
    throw Error(
      `Failed to find the entity from the service: ${JSON.stringify(
        service
      )} for nav property ${navProp}`
    );
  }
  return {
    kind: StructureKind.Property,
    name: navProp.instancePropertyName + (navProp.isCollection ? '!' : '?'),
    type: entity.className + '<T>' + (navProp.isCollection ? '[]' : ' | null'),
    docs: [addLeadingNewline(getNavPropertyDescription(navProp))]
  };
}
