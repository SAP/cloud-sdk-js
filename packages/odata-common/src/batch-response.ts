import { DeSerializers } from './de-serializers';
import { EntityApi, EntityBase } from './entity-base';
/**
 * @internal
 */
export type BatchResponse<
  DeSerializersT extends DeSerializers
> =
  | ErrorResponse
  | ReadResponse<DeSerializersT>
  | WriteResponses<DeSerializersT>;

interface SuccessTypeGuard<DeSerializersT extends DeSerializers>{
  isSuccess: () => this is  ReadResponse<DeSerializersT>|WriteResponses<DeSerializersT> ;
}

interface  ReadRespneTypeGuard<DeSerializersT extends DeSerializers>{
  isReadResponse: () => this is  ReadResponse<DeSerializersT>;
}

/**
 * @internal
 */
export interface WriteResponses<
  DeSerializersT extends DeSerializers
> extends SuccessTypeGuard<DeSerializersT>, ReadRespneTypeGuard<DeSerializersT> {
  responses: WriteResponse<DeSerializersT>[];
}
/**
 * @internal
 */
export interface ErrorResponse extends SuccessTypeGuard<any>{
  responseType: 'ErrorResponse'; // to make ErrorResponse structurally different and make typeguards work as expected
  httpCode: number;
  body: Record<string, any>;
}
/**
 * @internal
 */
export interface ReadResponse<
  DeSerializersT extends DeSerializers
> extends SuccessTypeGuard<DeSerializersT>, ReadRespneTypeGuard<DeSerializersT>{
  responseType: 'ReadResponse'; // to make ReadResponse structurally different and make typeguards work as expected
  httpCode: number;
  body: Record<string, any>;
  type: EntityApi<EntityBase, DeSerializersT>;
  as: <EntityT extends EntityBase>(
    entityApi: EntityApi<EntityT, DeSerializersT>
  ) => EntityT[];
}

/**
 * @internal
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
