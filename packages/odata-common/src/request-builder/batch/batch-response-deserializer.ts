import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import {
  BatchResponse,
  ErrorResponse,
  ReadResponse,
  WriteResponse,
  WriteResponses
} from '../../batch-response';
import { DeSerializers } from '../../de-serializers';
import { EntityBase } from '../../entity-base';
import { EntityDeserializer } from '../../entity-deserializer';
import { ResponseDataAccessor } from '../../response-data-accessor';
import { EntityApi } from '../../entity-api';
import { ResponseData, isHttpSuccessCode } from './batch-response-parser';

const logger = createLogger({
  package: 'odata-common',
  messageContext: 'batch-response-transformer'
});

/**
 * Represents the state needed to deserialize a parsed batch response using OData version specific deserialization data access.
 * @internal
 */
export class BatchResponseDeserializer<DeSerializersT extends DeSerializers> {
  /**
   * Creates an instance of BatchResponseTransformer.
   * @param entityToApi - A map that holds the entity type to constructor mapping.
   * @param responseDataAccessor - Response data access module.
   * @param deserializer - Entity deserializer.
   */
  constructor(
    private readonly entityToApi: Record<
      string,
      EntityApi<EntityBase, DeSerializersT>
    >,
    private readonly responseDataAccessor: ResponseDataAccessor,
    private readonly deserializer: EntityDeserializer
  ) {}

  /**
   * Deserialize the parsed batch response.
   * @param parsedBatchResponse - Two dimensional list of parsed batch sub responses.
   * @returns An array of parsed sub responses of the batch response.
   */
  deserializeBatchResponse(
    parsedBatchResponse: (ResponseData[] | ResponseData)[]
  ): BatchResponse<DeSerializersT>[] {
    return parsedBatchResponse.map(responseData => {
      if (Array.isArray(responseData)) {
        return this.deserializeChangeSet(responseData);
      }
      return isHttpSuccessCode(responseData.httpCode)
        ? this.deserializeRetrieveResponse(responseData)
        : this.deserializeErrorResponse(responseData);
    });
  }

  private deserializeRetrieveResponse(
    responseData: ResponseData
  ): ReadResponse<DeSerializersT> {
    return {
      ...responseData,
      responseType: 'ReadResponse',
      type: this.getApi(responseData.body)!,
      as: asReadResponse(
        responseData.body,
        this.responseDataAccessor,
        this.deserializer
      ),
      isSuccess: () => true,
      isError: () => false,
      isReadResponse: () => true,
      isWriteResponses: () => false
    };
  }

  private deserializeErrorResponse(responseData: ResponseData): ErrorResponse {
    return {
      ...responseData,
      responseType: 'ErrorResponse',
      isSuccess: () => false,
      isError: () => true,
      isReadResponse: () => false,
      isWriteResponses: () => false
    };
  }

  private deserializeChangeSetSubResponse(
    responseData: ResponseData
  ): WriteResponse<DeSerializersT> {
    return {
      ...responseData,
      responseType: 'WriteResponse',
      type: this.getApi(responseData.body),
      as: asWriteResponse(
        responseData.body,
        this.responseDataAccessor,
        this.deserializer
      )
    };
  }

  private deserializeChangeSet(
    changesetData: ResponseData[]
  ): WriteResponses<DeSerializersT> {
    return {
      responses: changesetData.map(subResponseData =>
        this.deserializeChangeSetSubResponse(subResponseData)
      ),
      isSuccess: () => true,
      isError: () => false,
      isReadResponse: () => false,
      isWriteResponses: () => true
    };
  }

  /**
   * Retrieve the constructor for a specific single response body.
   * @param responseBody - The body of a single response as an object.
   * @returns The constructor if found in the mapping, `undefined` otherwise.
   */
  private getApi(
    responseBody: Record<string, any>
  ): EntityApi<EntityBase, DeSerializersT> | undefined {
    const entityJson = this.responseDataAccessor.isCollectionResult(
      responseBody
    )
      ? this.responseDataAccessor.getCollectionResult(responseBody)[0]
      : this.responseDataAccessor.getSingleResult(responseBody);

    const entityUri = entityJson?.__metadata?.uri;
    if (entityUri) {
      return this.entityToApi[parseEntityNameFromMetadataUri(entityUri)];
    }

    logger.warn('Could not parse constructor from response body.');
    return undefined;
  }
}

/**
 * Deserialize the parsed batch response.
 * @param parsedBatchResponse - Two dimensional list of parsed batch sub responses.
 * @param entityToApi - A map that holds the entity type to constructor mapping.
 * @param responseDataAccessor - Response data access module.
 * @param deserializer - Entity deserializer.
 * @returns An array of parsed sub responses of the batch response.
 * @internal
 */
export function deserializeBatchResponse<DeSerializersT extends DeSerializers>(
  parsedBatchResponse: (ResponseData[] | ResponseData)[],
  entityToApi: Record<string, EntityApi<EntityBase, DeSerializersT>>,
  responseDataAccessor: ResponseDataAccessor,
  deserializer: EntityDeserializer
): (
  | ErrorResponse
  | ReadResponse<DeSerializersT>
  | WriteResponses<DeSerializersT>
)[] {
  return new BatchResponseDeserializer(
    entityToApi,
    responseDataAccessor,
    deserializer
  ).deserializeBatchResponse(parsedBatchResponse);
}

/**
 * Create a function to transform the parsed response body to a list of entities of the given type or an error.
 * @param body - The parsed JSON response body.
 * @param responseDataAccessor - Response data access module.
 * @param deserializer - Entity deserializer.
 * @returns A function to be used for transformation of the read response.
 */
function asReadResponse(
  body: any,
  responseDataAccessor: ResponseDataAccessor,
  deserializer: EntityDeserializer
) {
  return <EntityT extends EntityBase, DeSerializersT extends DeSerializers>(
    // constructor: Constructable<EntityT>
    entityApi: EntityApi<EntityT, DeSerializersT>
  ): EntityT[] => {
    if (body.error) {
      throw new ErrorWithCause('Could not parse read response.', body.error);
    }
    if (responseDataAccessor.isCollectionResult(body)) {
      return responseDataAccessor
        .getCollectionResult(body)
        .map(r => deserializer.deserializeEntity(r, entityApi));
    }
    return [
      deserializer.deserializeEntity(
        responseDataAccessor.getSingleResult(body),
        entityApi
      )
    ];
  };
}

/**
 * Create a function to transform the parsed response body to an entity of the given type.
 * @param body - The parsed JSON response body.
 * @param responseDataAccessor - Response data access module.
 * @param deserializer - Entity deserializer.
 * @returns A function to be used for transformation of the write response.
 */
function asWriteResponse(
  body: any,
  responseDataAccessor: ResponseDataAccessor,
  deserializer: EntityDeserializer
) {
  return <EntityT extends EntityBase, DeSerializersT extends DeSerializers>(
    entityApi: EntityApi<EntityT, DeSerializersT>
  ) =>
    deserializer.deserializeEntity(
      responseDataAccessor.getSingleResult(body),
      entityApi
    );
}

/**
 * Parse the entity name from the metadata uri. This should be the `__metadata` property of a single entity in the response.
 * @param uri - The URI to parse the entity name from
 * @returns The entity name.
 * @internal
 */
export function parseEntityNameFromMetadataUri(uri: string): string {
  if (!uri) {
    throw new Error(
      `Could not retrieve entity name from metadata. URI was: '${uri}'.`
    );
  }
  const [pathBeforeQuery] = uri.split('?');
  const [pathBeforeKeys] = pathBeforeQuery.split('(');
  const uriParts = pathBeforeKeys.split('/');

  // Remove another part in case of a trailing slash
  const entityName = uriParts.pop() || uriParts.pop();
  if (!entityName) {
    throw Error(
      `Could not retrieve entity name from metadata. Unknown URI format. URI was: '${uri}'.`
    );
  }
  return entityName;
}
