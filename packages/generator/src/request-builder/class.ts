import { codeBlock, documentationBlock, unixEOL } from '@sap-cloud-sdk/util';
import {
  getFunctionDoc,
  getRequestBuilderDescription
} from '../typedoc';
import { VdmEntity } from '../vdm-types';

/**
 * @internal
 */
export function requestBuilderClass(entity: VdmEntity): string {
  return (unixEOL +
    documentationBlock`${getRequestBuilderDescription(entity)}` + unixEOL +
    codeBlock`export class ${
      entity.className
    }RequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<${
      entity.className
    }<T>, T>{

    ${requestBuilderMethods(entity).join('\n\n')}

  }`
  );
}

function requestBuilderMethods(entity: VdmEntity): string[] {
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

function getByKeyRequestBuilder(entity: VdmEntity): string {
  return (
    documentationBlock`${getFunctionDoc(
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
    )}` + unixEOL +
    codeBlock`getByKey(${entity.keys
      .map(
        key =>
          `${key.propertyNameAsParam}: DeserializedType<T, '${key.edmType}'>`
      )
      .join(', ')}): GetByKeyRequestBuilder<${entity.className}<T>, T> {
        ${buildParametrizedStatements(entity, 'GetByKeyRequestBuilder')}
  }`
  );
}

function getAllRequestBuilder(entity: VdmEntity): string {
  return (
    documentationBlock`${getFunctionDoc(
      `Returns a request builder for querying all \`${entity.className}\` entities.`,
      {
        returns: {
          type: `GetAllRequestBuilder<${entity.className}>`,
          description: `A request builder for creating requests to retrieve all \`${entity.className}\` entities.`
        }
      }
    )}` + unixEOL +
    codeBlock`getAll(): GetAllRequestBuilder<${entity.className}<T>, T> {
    return new GetAllRequestBuilder<${entity.className}<T>, T>(this.entityApi);
  }`
  );
}

function createRequestBuilder(entity: VdmEntity): string {
  return (
    documentationBlock`${getFunctionDoc(
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
    )}` + unixEOL +
    codeBlock`create(entity: ${entity.className}<T>): CreateRequestBuilder<${entity.className}<T>, T>{
    return new CreateRequestBuilder<${entity.className}<T>, T>(this.entityApi, entity);
  }`
  );
}

function updateRequestBuilder(entity: VdmEntity): string {
  return (
    documentationBlock`${
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
      }` + unixEOL +
    codeBlock`update(entity: ${entity.className}<T>): UpdateRequestBuilder<${entity.className}<T>, T>{
    return new UpdateRequestBuilder<${entity.className}<T>, T>(this.entityApi, entity);
  }`
  );
}

function deleteRequestBuilder(entity: VdmEntity): string {
  const parameters = entity.keys.map(key => `${key.propertyNameAsParam}: ${key.jsType}`);

  return codeBlock`
    ${documentationBlock`${getFunctionDoc(
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
    )}`}
    delete(${parameters}): DeleteRequestBuilder<${entity.className}<T>, T>;
    ${documentationBlock`${getFunctionDoc(
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
      })}`}
    delete(entity: ${entity.className}<T>): DeleteRequestBuilder<${entity.className}<T>, T>;
    delete(
      ${deleteRequestBuilderParameters(entity).map(p => `${p.name}${p.hasQuestionToken ? '?' : ''}: ${p.type}`).join(', ')}
    ): DeleteRequestBuilder<${entity.className}<T>, T> {
      ${deleteRequestBuilderStatements(entity)}
    }`;
}

interface deleteRequestBuilderParameter {
  name: string;
  type: string;
  hasQuestionToken?: boolean;
}

function deleteRequestBuilderParameters(
  entity: VdmEntity
): deleteRequestBuilderParameter[] {
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

function deleteRequestBuilderStatements(entity: VdmEntity): string {
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
