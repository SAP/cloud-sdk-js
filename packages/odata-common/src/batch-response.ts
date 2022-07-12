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
 * @typeparam  DeSerializersT - Type of the (de-)serializers.
 */
export interface WriteResponses<DeSerializersT extends DeSerializers>
  extends BatchResponseTypeGuards<DeSerializersT> {
  responses: WriteResponse<DeSerializersT>[];
}

/**
 * Represents an erroneous response to a retrieve or change set request within a batch request.
 */
export interface ErrorResponse extends BatchResponseTypeGuards<any> {
  responseType: 'ErrorResponse'; // to make ErrorResponse structurally different and make typeguards work as expected
  httpCode: number;
  body: Record<string, any>;
}

/**
 * Represents a response to a retrieve request within a batch request.
 * @typeparam DeSerializersT - Type of the (de-)serializers.
 */
export interface ReadResponse<DeSerializersT extends DeSerializers>
  extends BatchResponseTypeGuards<DeSerializersT> {
  responseType: 'ReadResponse'; // to make ReadResponse structurally different and make typeguards work as expected
  httpCode: number;
  body: Record<string, any>;
  type: EntityApi<EntityBase, DeSerializersT>;
  as: <EntityT extends EntityBase>(
    entityApi: EntityApi<EntityT, DeSerializersT>
  ) => EntityT[];
}

/**
 * Represents a single subresponse to a changeset request within a batch request.
 * @typeparam DeSerializersT - Type of the (de-)serializers.
 */
export interface WriteResponse<DeSerializersT extends DeSerializers> {
  responseType: 'WriteResponse'; // to make WriteResponse structurally different and make typeguards work as expected
  httpCode: number;
  body?: Record<string, any>;
  type?: EntityApi<EntityBase, DeSerializersT>;
  as?: <EntityT extends EntityBase>(
    entityApi: EntityApi<EntityT, DeSerializersT>
  ) => EntityT;
}
