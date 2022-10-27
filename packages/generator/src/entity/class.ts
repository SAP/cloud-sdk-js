import {
  ClassDeclarationStructure,
  MethodDeclarationStructure,
  ParameterDeclarationStructure,
  PropertyDeclarationStructure,
  StructureKind
} from 'ts-morph';
import { prependPrefix } from '../internal-prefix';
import {
  addLeadingNewline, getEntityDescription,
  getNavPropertyDescription,
  getPropertyDescription
} from '../typedoc';
import {
  VdmActionImport,
  VdmEntity,
  VdmFunctionImport,
  VdmNavigationProperty,
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
      ...boundFunctions(entity, service),
      ...boundActions(entity, service)
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

function boundFunctions(
  entity: VdmEntity,
  service: VdmServiceMetadata
): MethodDeclarationStructure[] {
  return entity.functions.map(fn => ({
    kind: StructureKind.Method,
    name: fn.name,
    returnType: `BoundFunctionRequestBuilder<${entity.className}<DeSerializersT>, DeSerializersT, any, ${fn.returnType.returnType} | null>`,
    typeParameters: [
      {
        name: 'DeSerializersT extends DeSerializers = DefaultDeSerializers'
      }
    ],
    parameters: boundFunctionsParameter(fn),
    statements: boundFunctionsStatements(fn, entity, service)
  }));
}

function boundActions(
  entity: VdmEntity,
  service: VdmServiceMetadata
): MethodDeclarationStructure[] {
  return entity.actions.map(a => ({
    kind: StructureKind.Method,
    name: a.name,
    returnType: `BoundActionRequestBuilder<${entity.className}<DeSerializersT>, DeSerializersT, any, ${a.returnType.returnType} | null>`,
    typeParameters: [
      {
        name: 'DeSerializersT extends DeSerializers = DefaultDeSerializers'
      }
    ],
    parameters: boundActionsParameter(a),
    statements: boundActionsStatements(a, entity, service)
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

function boundFunctionsParameter(
  fn: VdmFunctionImport
): ParameterDeclarationStructure[] {
  if (!fn.parameters) {
    return [];
  }
  return fn.parameters.map(p => ({
    name: p.parameterName,
    type: p.jsType,
    kind: StructureKind.Parameter
  }));
}

function boundFunctionsStatements(
  fn: VdmFunctionImport,
  entity: VdmEntity,
  service: VdmServiceMetadata
): string[] {
  const fnBodyStatements = [
    'const deSerializers = defaultDeSerializers as any;',
    'return new BoundFunctionRequestBuilder(',
    // fixme: do we need to do anything in the transformer function? take from unbound functions.
    `this._entityApi as any, this as any, '${service.namespaces[0]}.${fn.originalName}', (data) => data, params, deSerializers`,
    ') as any;'
  ];
  return [
    ...boundFunctionsParameterStatements(fn),
    ...fnBodyStatements
  ];
}

function boundFunctionsParameterStatements(fn: VdmFunctionImport): string[] {
  const pre = ['const params = {'];
  const params = fn.parameters?.map(
    p =>
      `${p.parameterName}: new FunctionImportParameter('${p.parameterName}', '${p.edmType}', ${p.parameterName}),`
  );
  const post = ['};'];

  return [...pre, ...params, ...post];
}

function boundActionsParameter(
  a: VdmActionImport
): ParameterDeclarationStructure[] {
  if (!a.parameters) {
    return [];
  }
  return a.parameters.map(p => ({
    name: p.parameterName,
    type: p.jsType,
    kind: StructureKind.Parameter
  }));
}

function boundActionsStatements(
  a: VdmActionImport,
  entity: VdmEntity,
  service: VdmServiceMetadata
): string[] {
  const actBodyStatements = [
    'const deSerializers = defaultDeSerializers as any;',
    'return new BoundActionRequestBuilder(',
      // fixme: do we need to do anything in the transformer function?
    `this._entityApi as any, this as any, '${service.namespaces[0]}.${a.originalName}', (data) => data, params, deSerializers`,
    ') as any;'
  ];
  return [
    ...boundActionsParameterStatements(a),
    ...actBodyStatements
  ];
}

function boundActionsParameterStatements(a: VdmActionImport): string[] {
  const pre = ['const params = {'];
  const params = a.parameters?.map(
    p =>
      `${p.parameterName}: new ActionImportParameter('${p.parameterName}', '${p.edmType}', ${p.parameterName}),`
  );
  const post = ['};'];

  return [...pre, ...params, ...post];
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
