/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Constructable } from '../common';
import { Entity } from './entity';

export type BatchResponse = ReadResponse | WriteResponses | ErrorResponse;

export interface WriteResponses {
  responses: WriteResponse[];
  isSuccess: () => boolean;
}

export interface ErrorResponse {
  httpCode: number;
  body: object;
  isSuccess: () => boolean;
}

export interface ReadResponse {
  httpCode: number;
  body: object;
  type: Constructable<Entity>;
  as: <T extends Entity>(constructor: Constructable<T>) => T[];
  isSuccess: () => boolean;
}

export interface WriteResponse {
  httpCode: number;
  body?: object;
  type?: Constructable<Entity>;
  as?: <T extends Entity>(constructor: Constructable<T>) => T;
}
