import { unixEOL } from '@sap-cloud-sdk/util';
import {
  ClassDeclarationStructure,
  MethodDeclarationOverloadStructure,
  MethodDeclarationStructure,
  OptionalKind,
  ParameterDeclarationStructure,
  StructureKind
} from 'ts-morph';
import {
  addLeadingNewline,
  getFunctionDoc,
  getRequestBuilderDescription
} from '../typedoc';
import { VdmEntity } from '../vdm-types';

/**
 * @internal
 */
export function requestBuilderClass(
  entity: VdmEntity
): ClassDeclarationStructure {
  return {
    kind: StructureKind.Class,
    name: `${entity.className}RequestBuilder<T extends DeSerializers = DefaultDeSerializers>`,
    isExported: true,
    extends: `RequestBuilder<${entity.className}<T>, T>`,
    methods: requestBuilderMethods(entity),
    docs: [addLeadingNewline(getRequestBuilderDescription(entity))]
  };
}

function requestBuilderMethods(
  entity: VdmEntity
): MethodDeclarationStructure[] {
  const methods = [
    getByKeyRequestBuilder(entity),
    getAllRequestBuilder(entity)
  ];
  if (entity.creatable) {
    methods.push(createRequestBuilder(entity));
  }

  if (entity.updatable) {
    methods.push(updateRequestBuilder(entity));
  }

  if (entity.deletable) {
    methods.push(deleteRequestBuilder(entity));
  }
  return methods;
}

function getByKeyRequestBuilder(entity: VdmEntity): MethodDeclarationStructure {
  return {
    kind: StructureKind.Method,
    name: 'getByKey',
    parameters: entity.keys.map(key => ({
      name: key.propertyNameAsParam,
      type: `DeserializedType<T, '${key.edmType}'>`
    })),
    returnType: `GetByKeyRequestBuilder<${entity.className}<T>, T>`,
    statements: buildParametrizedStatements(entity, 'GetByKeyRequestBuilder'),
    docs: [
      addLeadingNewline(
        getFunctionDoc(
          `Returns a request builder for retrieving one \`${entity.className}\` entity based on its keys.`,
          {
            returns: {
              type: `GetByKeyRequestBuilder<${entity.className}>`,
              description: `A request builder for creating requests to retrieve one \`${entity.className}\` entity based on its keys.`
            },
            params: entity.keys.map(key => ({
              name: key.propertyNameAsParam,
              type: key.jsType,
              description: `Key property. See {@link ${entity.className}.${key.instancePropertyName}}.`
            }))
          }
        )
      )
    ]
  };
}

function getAllRequestBuilder(entity: VdmEntity): MethodDeclarationStructure {
  return {
    kind: StructureKind.Method,
    name: 'getAll',
    returnType: `GetAllRequestBuilder<${entity.className}<T>, T>`,
    statements: `return new GetAllRequestBuilder<${entity.className}<T>, T>(this.entityApi);`,
    docs: [
      addLeadingNewline(
        getFunctionDoc(
          `Returns a request builder for querying all \`${entity.className}\` entities.`,
          {
            returns: {
              type: `GetAllRequestBuilder<${entity.className}>`,
              description: `A request builder for creating requests to retrieve all \`${entity.className}\` entities.`
            }
          }
        )
      )
    ]
  };
}

function createRequestBuilder(entity: VdmEntity): MethodDeclarationStructure {
  return {
    kind: StructureKind.Method,
    name: 'create',
    returnType: `CreateRequestBuilder<${entity.className}<T>, T>`,
    parameters: [
      {
        name: 'entity',
        type: `${entity.className}<T>`
      }
    ],
    statements: `return new CreateRequestBuilder<${entity.className}<T>, T>(this.entityApi, entity);`,
    docs: [
      addLeadingNewline(
        getFunctionDoc(
          `Returns a request builder for creating a \`${entity.className}\` entity.`,
          {
            returns: {
              type: `CreateRequestBuilder<${entity.className}>`,
              description: `A request builder for creating requests that create an entity of type \`${entity.className}\`.`
            },
            params: [
              {
                name: 'entity',
                type: entity.className,
                description: 'The entity to be created'
              }
            ]
          }
        )
      )
    ]
  };
}

function updateRequestBuilder(entity: VdmEntity): MethodDeclarationStructure {
  return {
    kind: StructureKind.Method,
    name: 'update',
    returnType: `UpdateRequestBuilder<${entity.className}<T>, T>`,
    parameters: [
      {
        name: 'entity',
        type: `${entity.className}<T>`
      }
    ],
    statements: `return new UpdateRequestBuilder<${entity.className}<T>, T>(this.entityApi, entity);`,
    docs: [
      addLeadingNewline(
        getFunctionDoc(
          `Returns a request builder for updating an entity of type \`${entity.className}\`.`,
          {
            returns: {
              type: `UpdateRequestBuilder<${entity.className}>`,
              description: `A request builder for creating requests that update an entity of type \`${entity.className}\`.`
            },
            params: [
              {
                name: 'entity',
                type: entity.className,
                description: 'The entity to be updated'
              }
            ]
          }
        )
      )
    ]
  };
}

function deleteRequestBuilder(entity: VdmEntity): MethodDeclarationStructure {
  return {
    kind: StructureKind.Method,
    name: 'delete',
    returnType: `DeleteRequestBuilder<${entity.className}<T>, T>`,
    // implementation parameters
    parameters: deleteRequestBuilderParameters(entity),
    // implementation
    statements: deleteRequestBuilderStatements(entity),
    // signature of overloads
    overloads: deleteRequestBuilderOverload(entity)
  };
}

function deleteRequestBuilderParameters(
  entity: VdmEntity
): OptionalKind<ParameterDeclarationStructure>[] {
  if (entity.keys.length) {
    return entity.keys.map((key, index) => {
      if (index === 0) {
        return {
          name: `${key.propertyNameAsParam}OrEntity`,
          type: 'any',
          hasQuestionToken: false
        };
      }
      return {
        name: key.propertyNameAsParam,
        type: key.jsType,
        hasQuestionToken: true
      };
    });
  }
  return [
    {
      name: 'entity',
      type: 'Entity'
    }
  ];
}

function deleteRequestBuilderOverload(
  entity: VdmEntity
): MethodDeclarationOverloadStructure[] {
  return [
    {
      kind: StructureKind.MethodOverload,
      returnType: `DeleteRequestBuilder<${entity.className}<T>, T>`,
      parameters: entity.keys.map(key => ({
        name: key.propertyNameAsParam,
        type: key.jsType
      })),
      docs: [
        addLeadingNewline(
          getFunctionDoc(
            `Returns a request builder for deleting an entity of type \`${entity.className}\`.`,
            {
              returns: {
                type: `DeleteRequestBuilder<${entity.className}>`,
                description: `A request builder for creating requests that delete an entity of type \`${entity.className}\`.`
              },
              params: entity.keys.map(key => ({
                name: key.propertyNameAsParam,
                type: key.jsType,
                description: `Key property. See {@link ${entity.className}.${key.instancePropertyName}}.`
              }))
            }
          )
        )
      ]
    },
    {
      kind: StructureKind.MethodOverload,
      returnType: `DeleteRequestBuilder<${entity.className}<T>, T>`,
      parameters: [
        {
          name: 'entity',
          type: `${entity.className}<T>`
        }
      ],
      docs: [
        addLeadingNewline(
          getFunctionDoc(
            `Returns a request builder for deleting an entity of type \`${entity.className}\`.`,
            {
              returns: {
                type: `DeleteRequestBuilder<${entity.className}>`,
                description: `A request builder for creating requests that delete an entity of type \`${entity.className}\` by taking the entity as a parameter.`
              },
              params: [
                {
                  name: 'entity',
                  type: entity.className,
                  description: 'Pass the entity to be deleted.'
                }
              ]
            }
          )
        )
      ]
    }
  ];
}

function deleteRequestBuilderStatements(entity: VdmEntity) {
  const params = deleteRequestBuilderParameters(entity).map(
    param => param.name
  );
  const keys = entity.keys
    .map((key, index) => `${key.originalName}: ${params[index]}!`)
    .join(`,${unixEOL}`);
  return `return new DeleteRequestBuilder<${entity.className}<T>, T>(this.entityApi, ${params[0]} instanceof ${entity.className} ? ${params[0]} : {${keys}});`;
}

function buildParametrizedStatements(
  entity: VdmEntity,
  requestBuilder: RequestBuilderName
) {
  const params = entity.keys
    .map(key => `${key.originalName}: ${key.propertyNameAsParam}`)
    .join(`,${unixEOL}`);
  return `return new ${requestBuilder}<${entity.className}<T>, T>(this.entityApi, {${params}});`;
}

type RequestBuilderName =
  | 'CreateRequestBuilder'
  | 'DeleteRequestBuilder'
  | 'GetAllRequestBuilder'
  | 'GetByKeyRequestBuilder'
  | 'UpdateRequestBuilder';
