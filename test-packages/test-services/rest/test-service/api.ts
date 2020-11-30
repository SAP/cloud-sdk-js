/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RestRequestBuilder } from '@sap-cloud-sdk/core';
import { DefaultApi } from './openapi/api';
import { TestEntity } from './openapi/model';

export const TestServiceApi = {
  getAllEntities: (stringParameter: string, integerParameter: number) => new RestRequestBuilder<DefaultApi, 'getAllEntities'>(
    DefaultApi,
    'getAllEntities',
    stringParameter,
    integerParameter
  ),
  createEntity: () => new RestRequestBuilder<DefaultApi, 'createEntity'>(
    DefaultApi,
    'createEntity'
  ),
  getEntityByKey: (entityId: string) => new RestRequestBuilder<DefaultApi, 'getEntityByKey'>(
    DefaultApi,
    'getEntityByKey',
    entityId
  ),
  countEntities: () => new RestRequestBuilder<DefaultApi, 'countEntities'>(
    DefaultApi,
    'countEntities'
  )
};
