/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '../../../../../src';
import { TestEntity } from './model';

export const EntityApi = {
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
  updateEntityWithPut: (body: TestEntity[]) => new OpenApiRequestBuilder(
    'put',
    '/entities',
    {
          body
        }
  ),
  createEntity: (body: TestEntity) => new OpenApiRequestBuilder(
    'post',
    '/entities',
    {
          body
        }
  ),
  updateEntity: (body: Record<string, any>) => new OpenApiRequestBuilder(
    'patch',
    '/entities',
    {
          body
        }
  ),
  deleteEntity: (body: string[]) => new OpenApiRequestBuilder(
    'delete',
    '/entities',
    {
          body
        }
  ),
  getEntityByKey: (entityId: string) => new OpenApiRequestBuilder(
    'get',
    '/entities/{entityId}',
    {
          pathParameters: [entityId]
        }
  ),
  countEntities: () => new OpenApiRequestBuilder(
    'get',
    '/entities/count',
    
  )
};
