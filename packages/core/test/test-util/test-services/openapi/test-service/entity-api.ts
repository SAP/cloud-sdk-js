/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '../../../../../src';
import { TestEntity } from './schema';

export const EntityApi = {
  getAllEntities: (queryParameters?: {'stringParameter'?: string,
  'integerParameter'?: number,
  '$dollarParameter'?: string,
  'dot.parameter'?: string,
  'enumStringParameter'?: 'value1' | 'value2',
  'enumInt32Parameter'?: 1 | 2,
  'enumDoubleParameter'?: 1 | 2,
  'enumBooleanParameter'?: true | false}) => new OpenApiRequestBuilder<TestEntity[]>(
    'get',
    '/entities',
    {
          queryParameters
        }
  ),
  updateEntityWithPut: (body: TestEntity[] | undefined) => new OpenApiRequestBuilder<any>(
    'put',
    '/entities',
    {
          body
        }
  ),
  createEntity: (body: TestEntity | undefined) => new OpenApiRequestBuilder<any>(
    'post',
    '/entities',
    {
          body
        }
  ),
  updateEntity: (body: Record<string, any> | undefined) => new OpenApiRequestBuilder<any>(
    'patch',
    '/entities',
    {
          body
        }
  ),
  deleteEntity: (body: string[] | undefined) => new OpenApiRequestBuilder<any>(
    'delete',
    '/entities',
    {
          body
        }
  ),
  getEntityByKey: (entityId: string) => new OpenApiRequestBuilder<any>(
    'get',
    `/entities/${entityId}`
  ),
  countEntities: () => new OpenApiRequestBuilder<number>(
    'get',
    '/entities/count'
  )
};
