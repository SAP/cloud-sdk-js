import { createLogger } from '@sap-cloud-sdk/util';
import {
  ErrorResponse,
  ReadResponse,
  WriteResponse,
  WriteResponses
} from '../../batch-response';
import { Constructable, EntityBase } from '../../entity';
import { EntityDeserializer } from '../../entity-deserializer';
import { ResponseDataAccessor } from '../../response-data-accessor';
import { ResponseData, isHttpSuccessCode } from './batch-response-parser';

const logger = createLogger({
  package: 'core',
  messageContext: 'batch-response-transformer'
});

/**
 * Transforms a parsed batch response using OData version specific deserialization data access.
 */
class BatchResponseTransformer {
  /**
   * Creates an instance of BatchResponseTransformer.
   * @param entityToConstructorMap A map that holds the entity type to constructor mapping.
   * @param responseDataAccessor Response data access module.
   * @param deserializer Entity deserializer.
   */
  constructor(
    private readonly entityToConstructorMap: Record<
      string,
      Constructable<EntityBase>
    >,
    private readonly responseDataAccessor: ResponseDataAccessor,
    private readonly deserializer: EntityDeserializer
  ) {}

  /**
   * Transform the parsed batch response.
   * @param parsedBatchResponse Two dimensional list of parsed batch sub responses.
   * @returns An array of parsed sub responses of the batch response.
   */
  transformBatchResponse(
    parsedBatchResponse: (ResponseData[] | ResponseData)[]
  ): (ErrorResponse | ReadResponse | WriteResponses)[] {
    return parsedBatchResponse.map(responseData => {
      if (Array.isArray(responseData)) {
        return this.transformChangeSet(responseData);
      }
      return isHttpSuccessCode(responseData.httpCode)
        ? this.transformRetrieveResponse(responseData)
        : this.transformErrorResponse(responseData);
    });
  }

  private transformRetrieveResponse(responseData: ResponseData): ReadResponse {
    return {
      ...responseData,
      type: this.getConstructor(responseData.body)!,
      as: asReadResponse(
        responseData.body,
        this.responseDataAccessor,
        this.deserializer
      ),
      isSuccess: () => true
    };
  }

  private transformErrorResponse(responseData: ResponseData): ErrorResponse {
    return { ...responseData, isSuccess: () => false };
  }

  private transformChangeSetSubResponse(
    responseData: ResponseData
  ): WriteResponse {
    return {
      ...responseData,
      type: this.getConstructor(responseData.body),
      as: asWriteResponse(
        responseData.body,
        this.responseDataAccessor,
        this.deserializer
      )
    };
  }

  private transformChangeSet(changesetData: ResponseData[]): WriteResponses {
    return {
      responses: changesetData.map(subResponseData =>
        this.transformChangeSetSubResponse(subResponseData)
      ),
      isSuccess: () => true
    };
  }

  /**
   * Retrieve the constructor for a specific single response body.
   * @param responseBody The body of a single response as an object.
   * @param entityToConstructorMap Mapping between entity names and their respective constructors.
   * @param responseDataAccessor Response data access module.
   * @returns The constructor if found in the mapping, undefined otherwise.
   */
  private getConstructor(
    responseBody: Record<string, any>
  ): Constructable<EntityBase> | undefined {
    const entityJson = this.responseDataAccessor.isCollectionResult(
      responseBody
    )
      ? this.responseDataAccessor.getCollectionResult(responseBody)[0]
      : this.responseDataAccessor.getSingleResult(responseBody);

    const entityUri = entityJson?.__metadata?.uri;
    if (entityUri) {
      return this.entityToConstructorMap[
        parseEntityNameFromMetadataUri(entityUri)
      ];
    }

    logger.warn('Could not parse constructor from response body.');
  }
}

/**
 * Transform the parsed batch response.
 * @param parsedBatchResponse Two dimensional list of parsed batch sub responses.
 * @param entityToConstructorMap A map that holds the entity type to constructor mapping.
 * @param responseDataAccessor Response data access module.
 * @param deserializer Entity deserializer.
 * @returns An array of parsed sub responses of the batch response.
 */
export function transformBatchResponse(
  parsedBatchResponse: (ResponseData[] | ResponseData)[],
  entityToConstructorMap: Record<string, Constructable<EntityBase>>,
  responseDataAccessor: ResponseDataAccessor,
  deserializer: EntityDeserializer
): (ErrorResponse | ReadResponse | WriteResponses)[] {
  const transformer = new BatchResponseTransformer(
    entityToConstructorMap,
    responseDataAccessor,
    deserializer
  );
  return transformer.transformBatchResponse(parsedBatchResponse);
}

/**
 * Create a function to transform the parsed response body to a list of entities of the given type or an error.
 * @param body The parsed JSON reponse body.
 * @param responseDataAccessor Response data access module.
 * @param deserializer Entity deserializer.
 * @returns A function to be used for transformation of the read response.
 */
function asReadResponse(
  body: any,
  responseDataAccessor: ResponseDataAccessor,
  deserializer: EntityDeserializer
) {
  return <EntityT extends EntityBase>(
    constructor: Constructable<EntityT>
  ): Error | EntityT[] => {
    if (body.error) {
      return new Error(body.error);
    }
    if (responseDataAccessor.isCollectionResult(body)) {
      return responseDataAccessor
        .getCollectionResult(body)
        .map(r => deserializer.deserializeEntity(r, constructor));
    }
    return [
      deserializer.deserializeEntity(
        responseDataAccessor.getSingleResult(body),
        constructor
      )
    ];
  };
}

/**
 * Create a function to transform the parsed response body to an entity of the given type.
 * @param body The parsed JSON reponse body.
 * @param responseDataAccessor Response data access module.
 * @param deserializer Entity deserializer.
 * @returns A function to be used for transformation of the write response.
 */
function asWriteResponse(
  body: any,
  responseDataAccessor: ResponseDataAccessor,
  deserializer: EntityDeserializer
) {
  return <EntityT extends EntityBase>(constructor: Constructable<EntityT>) =>
    deserializer.deserializeEntity(
      responseDataAccessor.getSingleResult(body),
      constructor
    );
}

/**
 * Parse the entity name from the metadata uri. This should be the `__metadata` property of a single entity in the response.
 * @param uri The URI to parse the entity name from
 * @returns The entity name.
 */
function parseEntityNameFromMetadataUri(uri: string | undefined): string {
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
