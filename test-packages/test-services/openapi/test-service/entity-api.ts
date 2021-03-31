/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import type { TestEntity } from './schema';

/**
 * Representation of the 'EntityApi'.
 * This API is part of the 'TestService' service.
 */
export const EntityApi = {
  /**
   * Get all entities
   *
   * @param queryParameters Object containing the query parameters.
   * @returns TestEntity[]
   */
  getAllEntities: (queryParameters?: {
    stringParameter?: string;
    integerParameter?: number;
    $dollarParameter?: string;
    'dot.parameter'?: string;
    enumStringParameter?: 'value1' | 'value2';
    enumInt32Parameter?: 1 | 2;
    enumDoubleParameter?: 1 | 2;
    enumBooleanParameter?: true | false;
  }) =>
    new OpenApiRequestBuilder<TestEntity[]>('get', '/entities', {
      queryParameters
    }),
  /**
   * Makes a put request to the '/entities' endpoint and returns a 'any'
   *
   * @param body Request body
   * @returns any
   */
  updateEntityWithPut: (body: TestEntity[] | undefined) =>
    new OpenApiRequestBuilder<any>('put', '/entities', {
      body
    }),
  /**
   * Create entity
   *
   * @param body Entity to create
   * @returns any
   */
  createEntity: (body: TestEntity | undefined) =>
    new OpenApiRequestBuilder<any>('post', '/entities', {
      body
    }),
  /**
   * Makes a patch request to the '/entities' endpoint and returns a 'any'
   *
   * @param body Request body
   * @returns any
   */
  updateEntity: (body: Record<string, any> | undefined) =>
    new OpenApiRequestBuilder<any>('patch', '/entities', {
      body
    }),
  /**
   * Makes a delete request to the '/entities' endpoint and returns a 'any'
   *
   * @param body Request body
   * @returns any
   */
  deleteEntity: (body: string[] | undefined) =>
    new OpenApiRequestBuilder<any>('delete', '/entities', {
      body
    }),
  /**
   * Get entity by id
   *
   * @param entityId Key property of the entity
   * @returns any
   */
  getEntityByKey: (entityId: string) =>
    new OpenApiRequestBuilder<any>('get', '/entities/{entityId}', {
      pathParameters: { entityId }
    }),
  /**
   * Count entities
   *
   * @returns number
   */
  countEntities: () =>
    new OpenApiRequestBuilder<number>('get', '/entities/count')
};
