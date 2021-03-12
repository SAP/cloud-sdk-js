/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { TestEntity } from './model';

export const TestServiceEntityApi = {
  getAllEntities: (queryParameters?: {'stringParameter'?: string,
  'integerParameter'?: number,
  '$dollarParameter'?: string,
  'dot.parameter'?: string,
  'enumStringParameter'?: 'value1' | 'value2',
  'enumInt32Parameter'?: 1 | 2,
  'enumDoubleParameter'?: 1 | 2,
  'enumBooleanParameter'?: boolean}) => new OpenApiRequestBuilder(
    'get',
    '/entities',
    {
          queryParameters
        }
  ),
  updateEntityWithPut: (body: TestEntity[], queryParameters?: {}) => new OpenApiRequestBuilder(
    'put',
    '/entities',
    {
          body
        }
  ),
  createEntity: (body: TestEntity, queryParameters?: {}) => new OpenApiRequestBuilder(
    'post',
    '/entities',
    {
          body
        }
  ),
  updateEntity: (body: Record<string, any>, queryParameters?: {}) => new OpenApiRequestBuilder(
    'patch',
    '/entities',
    {
          body
        }
  ),
  deleteEntity: (body: string[], queryParameters?: {}) => new OpenApiRequestBuilder(
    'delete',
    '/entities',
    {
          body
        }
  ),
  getEntityByKey: (entityId: string, queryParameters?: {}) => new OpenApiRequestBuilder(
    'get',
    '/entities/{entityId}',
    {
          pathParameters: [entityId]
        }
  ),
  countEntities: (queryParameters?: {}) => new OpenApiRequestBuilder(
    'get',
    '/entities/count',
    
  )
};
