/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { EntityApi } from './openapi';
import { TestEntity } from './openapi/model';

export const TestServiceEntityApi = {
  getAllEntities: (args?: {
    stringParameter?: string,
    integerParameter?: number,
    dollarParameter?: string,
    dotParameter?: string,
    enumStringParameter?: 'value1' | 'value2',
    enumInt32Parameter?: 1 | 2,
    enumDoubleParameter?: 1 | 2,
    enumBooleanParameter?: boolean
  }) => new OpenApiRequestBuilder<EntityApi, 'getAllEntities'>(
    EntityApi,
    'getAllEntities',
    args?.stringParameter,
    args?.integerParameter,
    args?.dollarParameter,
    args?.dotParameter,
    args?.enumStringParameter,
    args?.enumInt32Parameter,
    args?.enumDoubleParameter,
    args?.enumBooleanParameter
  ),
  updateEntityWithPut: (args?: {
    body?: TestEntity[]
  }) => new OpenApiRequestBuilder<EntityApi, 'updateEntityWithPut'>(
    EntityApi,
    'updateEntityWithPut',
    args?.body
  ),
  createEntity: (args?: {
    body?: TestEntity
  }) => new OpenApiRequestBuilder<EntityApi, 'createEntity'>(
    EntityApi,
    'createEntity',
    args?.body
  ),
  updateEntity: (args?: {
    body?: Record<string, any>
  }) => new OpenApiRequestBuilder<EntityApi, 'updateEntity'>(
    EntityApi,
    'updateEntity',
    args?.body
  ),
  deleteEntity: (args?: {
    body?: string[]
  }) => new OpenApiRequestBuilder<EntityApi, 'deleteEntity'>(
    EntityApi,
    'deleteEntity',
    args?.body
  ),
  getEntityByKey: (args: {
    entityId: string
  }) => new OpenApiRequestBuilder<EntityApi, 'getEntityByKey'>(
    EntityApi,
    'getEntityByKey',
    args.entityId
  ),
  countEntities: () => new OpenApiRequestBuilder<EntityApi, 'countEntities'>(
    EntityApi,
    'countEntities'
  )
};
