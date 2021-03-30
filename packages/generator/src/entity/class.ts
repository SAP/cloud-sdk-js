import {
  ClassDeclarationStructure,
  MethodDeclarationStructure,
  PropertyDeclarationStructure,
  StructureKind
} from 'ts-morph';
import { caps, ODataVersion } from '@sap-cloud-sdk/util';
import { prependPrefix } from '../internal-prefix';
import {
  getEntityDescription,
  getFunctionDoc,
  getNavPropertyDescription,
  getPropertyDescription,
  addLeadingNewline
} from '../typedoc';
import {
  VdmEntity,
  VdmNavigationProperty,
  VdmProperty,
  VdmServiceMetadata
} from '../vdm-types';
export function entityClass(
  entity: VdmEntity,
  service: VdmServiceMetadata
): ClassDeclarationStructure {
  return {
    kind: StructureKind.Class,
    name: entity.className,
    extends: `Entity${caps(service.oDataVersion)}`,
    implements: [`${entity.className}Type`],
    properties: [
      ...staticProperties(entity, service),
      ...properties(entity),
      ...navProperties(entity, service)
    ],
    methods: methods(entity, service.oDataVersion),
    isExported: true,
    docs: [addLeadingNewline(getEntityDescription(entity, service))]
  };
}

function staticProperties(
  entity: VdmEntity,
  service: VdmServiceMetadata
): PropertyDeclarationStructure[] {
  return [entityName(entity), defaultServicePath(service)];
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

function properties(entity: VdmEntity): PropertyDeclarationStructure[] {
  return entity.properties.map(prop => property(prop));
}

function property(prop: VdmProperty): PropertyDeclarationStructure {
  return {
    kind: StructureKind.Property,
    name: prop.instancePropertyName + (prop.nullable ? '?' : '!'),
    type: prop.isCollection ? `${prop.jsType}[]` : prop.jsType,
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
    type: entity.className + (navProp.isCollection ? '[]' : ' | null'),
    docs: [addLeadingNewline(getNavPropertyDescription(navProp))]
  };
}

function methods(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): MethodDeclarationStructure[] {
  return [
    builder(entity, oDataVersion),
    requestBuilder(entity),
    customField(entity, oDataVersion),
    toJSON()
  ];
}

function builder(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): MethodDeclarationStructure {
  return {
    kind: StructureKind.Method,
    isStatic: true,
    name: 'builder',
    statements: `return Entity${caps(oDataVersion)}.entityBuilder(${
      entity.className
    });`,
    returnType: `EntityBuilderType<${entity.className}, ${entity.className}Type>`,
    docs: [
      addLeadingNewline(
        getFunctionDoc(
          `Returns an entity builder to construct instances of \`${entity.className}\`.`,
          {
            returns: {
              type: `EntityBuilderType<${entity.className}, ${entity.className}Type>`,
              description: `A builder that constructs instances of entity type \`${entity.className}\`.`
            }
          }
        )
      )
    ]
  };
}

function requestBuilder(entity: VdmEntity): MethodDeclarationStructure {
  return {
    kind: StructureKind.Method,
    name: 'requestBuilder',
    isStatic: true,
    returnType: `${entity.className}RequestBuilder`,
    statements: `return new ${entity.className}RequestBuilder();`,
    docs: [
      addLeadingNewline(
        getFunctionDoc(
          `Returns a request builder to construct requests for operations on the \`${entity.className}\` entity type.`,
          {
            returns: {
              type: `${entity.className}RequestBuilder`,
              description: `A \`${entity.className}\` request builder.`
            }
          }
        )
      )
    ]
  };
}

function customField(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): MethodDeclarationStructure {
  return {
    kind: StructureKind.Method,
    name: 'customField',
    isStatic: true,
    parameters: [
      {
        name: 'fieldName',
        type: 'string'
      }
    ],
    statements: `return Entity${caps(
      oDataVersion
    )}.customFieldSelector(fieldName, ${entity.className});`,
    returnType: `CustomField${caps(oDataVersion)}<${entity.className}>`,
    docs: [
      addLeadingNewline(
        getFunctionDoc(
          `Returns a selectable object that allows the selection of custom field in a get request for the entity \`${entity.className}\`.`,
          {
            params: [
              {
                name: 'fieldName',
                description: 'Name of the custom field to select',
                type: 'string'
              }
            ],
            returns: {
              type: `CustomField${caps(oDataVersion)}<${entity.className}>`,
              description: `A builder that constructs instances of entity type \`${entity.className}\`.`
            }
          }
        )
      )
    ]
  };
}

function toJSON(): MethodDeclarationStructure {
  return {
    kind: StructureKind.Method,
    name: 'toJSON',
    isStatic: false,
    statements: 'return { ...this, ...this._customFields };',
    returnType: '{ [key: string]: any }',
    docs: [
      addLeadingNewline(
        getFunctionDoc(
          'Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.',
          {
            returns: {
              type: '{ [key: string]: any }',
              description:
                'An object containing all instance variables + custom fields.'
            }
          }
        )
      )
    ]
  };
}
