import { DeSerializers } from './de-serializers';
import { Constructable, EntityApi, EntityBase } from './entity-base';
/**
 * @internal
 */
export type BatchResponse = ReadResponse | WriteResponses | ErrorResponse;

/**
 * @internal
 */
export interface WriteResponses {
  responses: WriteResponse[];
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
export interface ReadResponse {
  httpCode: number;
  body: Record<string, any>;
  type: Constructable<EntityBase>;
  as: <EntityT extends EntityBase, DeSerializersT extends DeSerializers>(entityApi: EntityApi<EntityT, DeSerializersT>) => EntityT[];
  isSuccess: () => boolean;
}

/**
 * @internal
 */
export interface WriteResponse {
  httpCode: number;
  body?: Record<string, any>;
  type?: Constructable<EntityBase>;
  as?: <EntityT extends EntityBase, DeSerializersT extends DeSerializers>(
    entityApi: EntityApi<EntityT, DeSerializersT>
  ) => EntityT;
}
