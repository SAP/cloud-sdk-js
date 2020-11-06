import { Constructable, EntityBase } from './entity';

export type BatchResponse = ReadResponse | WriteResponses | ErrorResponse;

export interface WriteResponses {
  responses: WriteResponse[];
  isSuccess: () => boolean;
}

export interface ErrorResponse {
  httpCode: number;
  body: Record<string, any>;
  isSuccess: () => boolean;
}

export interface ReadResponse {
  httpCode: number;
  body: Record<string, any>;
  type: Constructable<EntityBase>;
  as: <T extends EntityBase>(constructor: Constructable<T>) => Error | T[];
  isSuccess: () => boolean;
}

export interface WriteResponse {
  httpCode: number;
  body?: Record<string, any>;
  type?: Constructable<EntityBase>;
  as?: <T extends EntityBase>(constructor: Constructable<T>) => T;
}
