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
 * @typeParam  DeSerializersT - Type of the (de-)serializers.
 */
export interface WriteResponses<DeSerializersT extends DeSerializers>
  extends BatchResponseTypeGuards<DeSerializersT> {
  /**
   * TODO-JSDOC.
   */
  responses: WriteResponse<DeSerializersT>[];
}

/**
 * Represents an erroneous response to a retrieve or change set request within a batch request.
 */
export interface ErrorResponse extends BatchResponseTypeGuards<any> {
  /**
   * TODO-JSDOC.
   */
  responseType: 'ErrorResponse'; // to make ErrorResponse structurally different and make typeguards work as expected
  /**
   * TODO-JSDOC.
   */
  httpCode: number;
  /**
   * TODO-JSDOC.
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
   * TODO-JSDOC.
   */
  responseType: 'ReadResponse'; // to make ReadResponse structurally different and make typeguards work as expected
  /**
   * TODO-JSDOC.
   */
  httpCode: number;
  /**
   * TODO-JSDOC.
   */
  body: Record<string, any>;
  /**
   * TODO-JSDOC.
   */
  type: EntityApi<EntityBase, DeSerializersT>;
  /**
   * TODO-JSDOC.
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
   * TODO-JSDOC.
   */
  responseType: 'WriteResponse'; // to make WriteResponse structurally different and make typeguards work as expected
  /**
   * TODO-JSDOC.
   */
  httpCode: number;
  /**
   * TODO-JSDOC.
   */
  body?: Record<string, any>;
  /**
   * TODO-JSDOC.
   */
  type?: EntityApi<EntityBase, DeSerializersT>;
  /**
   * TODO-JSDOC.
   */
  as?: <EntityT extends EntityBase>(
    entityApi: EntityApi<EntityT, DeSerializersT>
  ) => EntityT;
}
