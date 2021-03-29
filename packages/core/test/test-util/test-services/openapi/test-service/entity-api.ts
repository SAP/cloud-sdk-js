/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '../../../../../src';
import type { TestEntity } from './schema';

/**
 * Representation of the EntityApi API.
 * This API is part of the TestService service.
 * 
 * This API client has been created automatically using the SAP Cloud SDK - do not edit manually.
*/
export const EntityApi = {
  /**
   * Get all entities
   * 
   * @param queryParameters Optional object containing the query parameters.
   * @returns TestEntity[]
  */
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
  /**
   * Makes a put request to the '/entities' endpoint and returns a 'any'
   * 
   * @param body Optional object containing the request body of type 'TestEntity[]'
   * @returns any
  */
  updateEntityWithPut: (body: TestEntity[] | undefined) => new OpenApiRequestBuilder<any>(
    'put',
    '/entities',
    {
          body
        }
  ),
  /**
   * Create entity
   * 
   * @param body Optional object containing the request body of type 'TestEntity'
   * @returns any
  */
  createEntity: (body: TestEntity | undefined) => new OpenApiRequestBuilder<any>(
    'post',
    '/entities',
    {
          body
        }
  ),
  /**
   * Makes a patch request to the '/entities' endpoint and returns a 'any'
   * 
   * @param body Optional object containing the request body of type 'Record<string, any>'
   * @returns any
  */
  updateEntity: (body: Record<string, any> | undefined) => new OpenApiRequestBuilder<any>(
    'patch',
    '/entities',
    {
          body
        }
  ),
  /**
   * Makes a delete request to the '/entities' endpoint and returns a 'any'
   * 
   * @param body Optional object containing the request body of type 'string[]'
   * @returns any
  */
  deleteEntity: (body: string[] | undefined) => new OpenApiRequestBuilder<any>(
    'delete',
    '/entities',
    {
          body
        }
  ),
  /**
   * Get entity by id
   * 
   * @param entityId Key property of the entity
   * @returns any
  */
  getEntityByKey: (entityId: string) => new OpenApiRequestBuilder<any>(
    'get',
    '/entities/{entityId}',
    {
          pathParameters: { entityId }
        }
  ),
  /**
   * Count entities
   * 
   * @returns number
  */
  countEntities: () => new OpenApiRequestBuilder<number>(
    'get',
    '/entities/count'
  )
};
