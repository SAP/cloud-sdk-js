import { DeSerializers } from './de-serializers';
import { EntityBase } from './entity-base';
import { EntityApi } from './entity-api';

/**
 * @internal
 */
export type BatchResponse<DeSerializersT extends DeSerializers> =
  | ErrorResponse
  | ReadResponse<DeSerializersT>
  | WriteResponses<DeSerializersT>;

interface BatchResponseTypeGuards<DeSerializersT extends DeSerializers> {
  isReadResponse: () => this is ReadResponse<DeSerializersT>;
  isSuccess: () => this is
    | ReadResponse<DeSerializersT>
    | WriteResponses<DeSerializersT>;
  isError: () => this is ErrorResponse;
  isWriteResponses: () => this is WriteResponses<DeSerializersT>;
}

/**
 * Represents the list of responses for a change set in a batch request.
 * @typeParam DeSerializersT - Type of the (de-)serializers.
 */
export interface WriteResponses<DeSerializersT extends DeSerializers>
  extends BatchResponseTypeGuards<DeSerializersT> {
  /**
   * List of responses for a change set in a batch request.
   */
  responses: WriteResponse<DeSerializersT>[];
}

/**
 * Represents an erroneous response to a retrieve or change set request within a batch request.
 */
export interface ErrorResponse extends BatchResponseTypeGuards<any> {
  /**
   * Tag for identifying the type of a batch response.
   */
  responseType: 'ErrorResponse';
  /**
   * HTTP response status code.
   */
  httpCode: number;
  /**
   * HTTP raw body.
   */
  body: Record<string, any>;
}

/**
 * Represents a response to a retrieve request within a batch request.
 * @typeParam DeSerializersT - Type of the (de-)serializers.
 */
export interface ReadResponse<DeSerializersT extends DeSerializers>
  extends BatchResponseTypeGuards<DeSerializersT> {
  /**
   * Tag for identifying the type of a batch response.
   */
  responseType: 'ReadResponse';
  /**
   * HTTP response status code.
   */
  httpCode: number;
  /**
   * HTTP raw body.
   */
  body: Record<string, any>;
  /**
   * EntityApi of the response data. Can be undefined for function/action imports or unmappable entities.
   */
  // TODO could be undefined for function/action imports of unknown if entity is not in the mapping.
  type: EntityApi<EntityBase, DeSerializersT>;
  /**
   * Transform the raw data into an instance of an entity represented by the given entity API.
   * Note, this method transforms the raw data to an array of entities, even if the original request was a GetByKeyRequestBuilder.
   */
  as: <EntityT extends EntityBase>(
    entityApi: EntityApi<EntityT, DeSerializersT>
  ) => EntityT[];
}

/**
 * Represents a single subresponse to a changeset request within a batch request.
 * @typeParam DeSerializersT - Type of the (de-)serializers.
 */
export interface WriteResponse<DeSerializersT extends DeSerializers> {
  /**
   * Tag for identifying the type of a batch response.
   */
  responseType: 'WriteResponse';
  /**
   * HTTP response status code.
   */
  httpCode: number;
  /**
   * HTTP raw body.
   */
  body?: Record<string, any>;
  /**
   * EntityApi of the response data. Can be undefined for function/action imports or unmappable entities.
   */
  type?: EntityApi<EntityBase, DeSerializersT>;
  /**
   * Transform the raw string body into an instance of the given constructor.
   * Note that the response may not exist, so you should only call this method if you know that there is data.
   */
  as?: <EntityT extends EntityBase>(
    entityApi: EntityApi<EntityT, DeSerializersT>
  ) => EntityT;
}
