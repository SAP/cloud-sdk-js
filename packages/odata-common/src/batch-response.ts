import { DeSerializers } from './de-serializers';
import { EntityApi, EntityBase } from './entity-base';
/**
 * @internal
 */
export type BatchResponse<DeSerializersT extends DeSerializers> =
  | ReadResponse<DeSerializersT>
  | WriteResponses<DeSerializersT>
  | ErrorResponse;

/**
 * @internal
 */
export interface WriteResponses<DeSerializersT extends DeSerializers> {
  responses: WriteResponse<DeSerializersT>[];
  isSuccess: () => boolean;
}
/**
 * @internal
 */
export interface ErrorResponse {
  httpCode: number;
  body: Record<string, any>;
  isSuccess: () => boolean;
}
/**
 * @internal
 */
export interface ReadResponse<DeSerializersT extends DeSerializers> {
  httpCode: number;
  body: Record<string, any>;
  type: EntityApi<EntityBase, DeSerializersT>;
  as: <EntityT extends EntityBase>(
    entityApi: EntityApi<EntityT, DeSerializersT>
  ) => EntityT[];
  isSuccess: () => boolean;
}

/**
 * @internal
 */
export interface WriteResponse<DeSerializersT extends DeSerializers> {
  httpCode: number;
  body?: Record<string, any>;
  type?: EntityApi<EntityBase, DeSerializersT>;
  as?: <EntityT extends EntityBase>(
    entityApi: EntityApi<EntityT, DeSerializersT>
  ) => EntityT;
}
