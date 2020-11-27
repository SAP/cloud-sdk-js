/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RestRequestBuilder } from '@sap-cloud-sdk/core';
import { TestServiceApi } from './open-api/api';
import { TestEntity } from './open-api/model';
export const TestServiceApiRequestBuilder = {
  getAllEntities: () => new RestRequestBuilder<TestServiceApi, 'getAllEntities'>(
    TestServiceApi,
    'getAllEntities'
  ),
  createEntity: (testEntity: TestEntity) => new RestRequestBuilder<TestServiceApi, 'createEntity'>(
    TestServiceApi,
    'createEntity',
    testEntity
  ),
  getEntityByKey: (entityId: string) => new RestRequestBuilder<TestServiceApi, 'getEntityByKey'>(
    TestServiceApi,
    'getEntityByKey',
    entityId
  ),
  countEntities: () => new RestRequestBuilder<TestServiceApi, 'countEntities'>(
    TestServiceApi,
    'countEntities'
  )
};
