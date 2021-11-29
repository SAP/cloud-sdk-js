import { Constructable, EntityBase } from './entity-base';
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
  as: <T extends EntityBase>(constructor: Constructable<T>) => T[];
  isSuccess: () => boolean;
}
/**
 * @internal
 */
export interface WriteResponse {
  httpCode: number;
  body?: Record<string, any>;
  type?: Constructable<EntityBase>;
  as?: <T extends EntityBase>(constructor: Constructable<T>) => T;
}
