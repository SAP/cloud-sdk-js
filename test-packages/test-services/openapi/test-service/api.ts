/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { DefaultApi } from './openapi/api';
import { TestEntity } from './openapi/model';

export const TestServiceApi = {
  getAllEntities: (stringParameter?: string, integerParameter?: number, dollarParameter?: string, docParameter?: string) => new OpenApiRequestBuilder<DefaultApi, 'getAllEntities'>(
    DefaultApi,
    'getAllEntities',
    stringParameter,
    integerParameter,
    dollarParameter,
    docParameter
  ),
  createEntity: (testEntity?: TestEntity) => new OpenApiRequestBuilder<DefaultApi, 'createEntity'>(
    DefaultApi,
    'createEntity',
    testEntity
  ),
  getEntityByKey: (entityId: string) => new OpenApiRequestBuilder<DefaultApi, 'getEntityByKey'>(
    DefaultApi,
    'getEntityByKey',
    entityId
  ),
  countEntities: () => new OpenApiRequestBuilder<DefaultApi, 'countEntities'>(
    DefaultApi,
    'countEntities'
  )
};
