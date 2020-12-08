/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { DefaultApi } from './openapi/api';
import { TestEntity, SimpleTestEntity } from './openapi/model';

export const TestServiceApi = {
  getAllEntities: (stringParameter?: string, integerParameter?: number) => new OpenApiRequestBuilder<DefaultApi, 'getAllEntities'>(
    DefaultApi,
    'getAllEntities',
    stringParameter,
    integerParameter
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
  ),
  testCaseGetRequiredParameters: (requiredPathItemQueryParam: string, requiredPathItemPathParam: string, requiredQueryParam: string, optionalQueryParam?: string, optionalPathItemQueryParam?: string, simpleTestEntity?: SimpleTestEntity) => new OpenApiRequestBuilder<DefaultApi, 'testCaseGetRequiredParameters'>(
    DefaultApi,
    'testCaseGetRequiredParameters',
    requiredPathItemQueryParam,
    requiredPathItemPathParam,
    requiredQueryParam,
    optionalQueryParam,
    optionalPathItemQueryParam,
    simpleTestEntity
  ),
  testCasePostRequiredParameters: (requiredPathItemQueryParam: string, requiredPathItemPathParam: string, requiredQueryParam: string, simpleTestEntity: SimpleTestEntity, optionalPathItemQueryParam?: string, optionalQueryParam?: string) => new OpenApiRequestBuilder<DefaultApi, 'testCasePostRequiredParameters'>(
    DefaultApi,
    'testCasePostRequiredParameters',
    requiredPathItemQueryParam,
    requiredPathItemPathParam,
    requiredQueryParam,
    simpleTestEntity,
    optionalPathItemQueryParam,
    optionalQueryParam
  )
};
