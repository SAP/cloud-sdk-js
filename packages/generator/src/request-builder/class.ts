/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  ClassDeclarationStructure,
  MethodDeclarationOverloadStructure,
  MethodDeclarationStructure,
  OptionalKind,
  ParameterDeclarationStructure,
  StructureKind
} from 'ts-morph';
import { getFunctionDoc, getRequestBuilderDescription } from '../typedoc';
import { VdmEntity } from '../vdm-types';

export function requestBuilderClass(
  entity: VdmEntity
): ClassDeclarationStructure {
  return {
    kind: StructureKind.Class,
    name: `${entity.className}RequestBuilder`,
    isExported: true,
    extends: `RequestBuilder<${entity.className}>`,
    methods: requestBuilderMethods(entity),
    docs: [getRequestBuilderDescription(entity)]
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
      type: key.jsType
    })),
    returnType: `GetByKeyRequestBuilder<${entity.className}>`,
    statements: buildParametrizedStatements(entity, 'GetByKeyRequestBuilder'),
    docs: [
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
            description: `Key property. See [[${entity.className}.${key.instancePropertyName}]].`
          }))
        }
      )
    ]
  };
}

function getAllRequestBuilder(entity: VdmEntity): MethodDeclarationStructure {
  return {
    kind: StructureKind.Method,
    name: 'getAll',
    returnType: `GetAllRequestBuilder<${entity.className}>`,
    statements: `return new GetAllRequestBuilder(${entity.className});`,
    docs: [
      getFunctionDoc(
        `Returns a request builder for querying all \`${entity.className}\` entities.`,
        {
          returns: {
            type: `GetAllRequestBuilder<${entity.className}>`,
            description: `A request builder for creating requests to retrieve all \`${entity.className}\` entities.`
          }
        }
      )
    ]
  };
}

function createRequestBuilder(entity: VdmEntity): MethodDeclarationStructure {
  return {
    kind: StructureKind.Method,
    name: 'create',
    returnType: `CreateRequestBuilder<${entity.className}>`,
    parameters: [
      {
        name: 'entity',
        type: entity.className
      }
    ],
    statements: `return new CreateRequestBuilder(${entity.className}, entity);`,
    docs: [
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
    ]
  };
}

function updateRequestBuilder(entity: VdmEntity): MethodDeclarationStructure {
  return {
    kind: StructureKind.Method,
    name: 'update',
    returnType: `UpdateRequestBuilder<${entity.className}>`,
    parameters: [
      {
        name: 'entity',
        type: entity.className
      }
    ],
    statements: `return new UpdateRequestBuilder(${entity.className}, entity);`,
    docs: [
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
    ]
  };
}

function deleteRequestBuilder(entity: VdmEntity): MethodDeclarationStructure {
  return {
    kind: StructureKind.Method,
    name: 'delete',
    returnType: `DeleteRequestBuilder<${entity.className}>`,
    parameters: deleteRequestBuilderParameters(entity),
    statements: deleteRequestBuilderStatements(entity),
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
      } else {
        return {
          name: key.propertyNameAsParam,
          type: key.jsType,
          hasQuestionToken: true
        };
      }
    });
  } else {
    return [
      {
        name: 'entity',
        type: 'Entity'
      }
    ];
  }
}

function deleteRequestBuilderOverload(
  entity: VdmEntity
): MethodDeclarationOverloadStructure[] {
  return [
    {
      kind: StructureKind.MethodOverload,
      returnType: `DeleteRequestBuilder<${entity.className}>`,
      parameters: entity.keys.map(key => ({
        name: key.propertyNameAsParam,
        type: key.jsType
      })),
      docs: [
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
              description: `Key property. See [[${entity.className}.${key.instancePropertyName}]].`
            }))
          }
        )
      ]
    },
    {
      kind: StructureKind.MethodOverload,
      returnType: `DeleteRequestBuilder<${entity.className}>`,
      parameters: [
        {
          name: 'entity',
          type: entity.className
        }
      ],
      docs: [
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
    .join(',\n');
  return `return new DeleteRequestBuilder(${entity.className}, ${params[0]} instanceof ${entity.className} ? ${params[0]} : {${keys}});`;
}

function buildParametrizedStatements(
  entity: VdmEntity,
  requestBuilder: RequestBuilderName
) {
  const params = entity.keys
    .map(key => `${key.originalName}: ${key.propertyNameAsParam}`)
    .join(',\n');
  return `return new ${requestBuilder}(${entity.className}, {${params}});`;
}

type RequestBuilderName =
  | 'CreateRequestBuilder'
  | 'DeleteRequestBuilder'
  | 'GetAllRequestBuilder'
  | 'GetByKeyRequestBuilder'
  | 'UpdateRequestBuilder';
