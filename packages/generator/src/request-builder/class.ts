import { unixEOL, ODataVersion, caps } from '@sap-cloud-sdk/util';
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

export function requestBuilderClass(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): ClassDeclarationStructure {
  return {
    kind: StructureKind.Class,
    name: `${entity.className}RequestBuilder`,
    isExported: true,
    extends: `RequestBuilder<${entity.className}>`,
    methods: requestBuilderMethods(entity, oDataVersion),
    docs: [addLeadingNewline(getRequestBuilderDescription(entity))]
  };
}

function requestBuilderMethods(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): MethodDeclarationStructure[] {
  const methods = [
    getByKeyRequestBuilder(entity, oDataVersion),
    getAllRequestBuilder(entity, oDataVersion)
  ];
  if (entity.creatable) {
    methods.push(createRequestBuilder(entity, oDataVersion));
  }

  if (entity.updatable) {
    methods.push(updateRequestBuilder(entity, oDataVersion));
  }

  if (entity.deletable) {
    methods.push(deleteRequestBuilder(entity, oDataVersion));
  }
  return methods;
}

function getByKeyRequestBuilder(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): MethodDeclarationStructure {
  return {
    kind: StructureKind.Method,
    name: 'getByKey',
    parameters: entity.keys.map(key => ({
      name: key.propertyNameAsParam,
      type: key.jsType
    })),
    returnType: `GetByKeyRequestBuilder${caps(oDataVersion)}<${
      entity.className
    }>`,
    statements: buildParametrizedStatements(
      entity,
      'GetByKeyRequestBuilder',
      oDataVersion
    ),
    docs: [
      addLeadingNewline(
        getFunctionDoc(
          `Returns a request builder for retrieving one \`${entity.className}\` entity based on its keys.`,
          {
            returns: {
              type: `GetByKeyRequestBuilder${caps(oDataVersion)}<${
                entity.className
              }>`,
              description: `A request builder for creating requests to retrieve one \`${entity.className}\` entity based on its keys.`
            },
            params: entity.keys.map(key => ({
              name: key.propertyNameAsParam,
              type: key.jsType,
              description: `Key property. See [[${entity.className}.${key.instancePropertyName}]].`
            }))
          }
        )
      )
    ]
  };
}

function getAllRequestBuilder(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): MethodDeclarationStructure {
  return {
    kind: StructureKind.Method,
    name: 'getAll',
    returnType: `GetAllRequestBuilder${caps(oDataVersion)}<${
      entity.className
    }>`,
    statements: `return new GetAllRequestBuilder${caps(oDataVersion)}(${
      entity.className
    });`,
    docs: [
      addLeadingNewline(
        getFunctionDoc(
          `Returns a request builder for querying all \`${entity.className}\` entities.`,
          {
            returns: {
              type: `GetAllRequestBuilder${caps(oDataVersion)}<${
                entity.className
              }>`,
              description: `A request builder for creating requests to retrieve all \`${entity.className}\` entities.`
            }
          }
        )
      )
    ]
  };
}

function createRequestBuilder(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): MethodDeclarationStructure {
  return {
    kind: StructureKind.Method,
    name: 'create',
    returnType: `CreateRequestBuilder${caps(oDataVersion)}<${
      entity.className
    }>`,
    parameters: [
      {
        name: 'entity',
        type: entity.className
      }
    ],
    statements: `return new CreateRequestBuilder${caps(oDataVersion)}(${
      entity.className
    }, entity);`,
    docs: [
      addLeadingNewline(
        getFunctionDoc(
          `Returns a request builder for creating a \`${entity.className}\` entity.`,
          {
            returns: {
              type: `CreateRequestBuilder${caps(oDataVersion)}<${
                entity.className
              }>`,
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

function updateRequestBuilder(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): MethodDeclarationStructure {
  return {
    kind: StructureKind.Method,
    name: 'update',
    returnType: `UpdateRequestBuilder${caps(oDataVersion)}<${
      entity.className
    }>`,
    parameters: [
      {
        name: 'entity',
        type: entity.className
      }
    ],
    statements: `return new UpdateRequestBuilder${caps(oDataVersion)}(${
      entity.className
    }, entity);`,
    docs: [
      addLeadingNewline(
        getFunctionDoc(
          `Returns a request builder for updating an entity of type \`${entity.className}\`.`,
          {
            returns: {
              type: `UpdateRequestBuilder${caps(oDataVersion)}<${
                entity.className
              }>`,
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

function deleteRequestBuilder(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): MethodDeclarationStructure {
  return {
    kind: StructureKind.Method,
    name: 'delete',
    returnType: `DeleteRequestBuilder${caps(oDataVersion)}<${
      entity.className
    }>`,
    parameters: deleteRequestBuilderParameters(entity),
    statements: deleteRequestBuilderStatements(entity, oDataVersion),
    overloads: deleteRequestBuilderOverload(entity, oDataVersion)
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
  entity: VdmEntity,
  oDataVersion: ODataVersion
): MethodDeclarationOverloadStructure[] {
  const versionInCaps = caps(oDataVersion);
  return [
    {
      kind: StructureKind.MethodOverload,
      returnType: `DeleteRequestBuilder${versionInCaps}<${entity.className}>`,
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
                type: `DeleteRequestBuilder${versionInCaps}<${entity.className}>`,
                description: `A request builder for creating requests that delete an entity of type \`${entity.className}\`.`
              },
              params: entity.keys.map(key => ({
                name: key.propertyNameAsParam,
                type: key.jsType,
                description: `Key property. See [[${entity.className}.${key.instancePropertyName}]].`
              }))
            }
          )
        )
      ]
    },
    {
      kind: StructureKind.MethodOverload,
      returnType: `DeleteRequestBuilder${caps(oDataVersion)}<${
        entity.className
      }>`,
      parameters: [
        {
          name: 'entity',
          type: entity.className
        }
      ],
      docs: [
        addLeadingNewline(
          getFunctionDoc(
            `Returns a request builder for deleting an entity of type \`${entity.className}\`.`,
            {
              returns: {
                type: `DeleteRequestBuilder${caps(oDataVersion)}<${
                  entity.className
                }>`,
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

function deleteRequestBuilderStatements(
  entity: VdmEntity,
  oDataVersion: ODataVersion
) {
  const params = deleteRequestBuilderParameters(entity).map(
    param => param.name
  );
  const keys = entity.keys
    .map((key, index) => `${key.originalName}: ${params[index]}!`)
    .join(`,${unixEOL}`);
  return `return new DeleteRequestBuilder${caps(oDataVersion)}(${
    entity.className
  }, ${params[0]} instanceof ${entity.className} ? ${params[0]} : {${keys}});`;
}

function buildParametrizedStatements(
  entity: VdmEntity,
  requestBuilder: RequestBuilderName,
  oDataVersion: ODataVersion
) {
  const params = entity.keys
    .map(key => `${key.originalName}: ${key.propertyNameAsParam}`)
    .join(`,${unixEOL}`);
  return `return new ${requestBuilder}${caps(oDataVersion)}(${
    entity.className
  }, {${params}});`;
}

type RequestBuilderName =
  | 'CreateRequestBuilder'
  | 'DeleteRequestBuilder'
  | 'GetAllRequestBuilder'
  | 'GetByKeyRequestBuilder'
  | 'UpdateRequestBuilder';
