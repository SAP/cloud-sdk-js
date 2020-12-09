/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { DefaultApi } from './openapi/api';
import { TestEntity, SimpleTestEntity } from './openapi/model';

export const TestServiceApi = {
  getAllEntities: (args?: {
    stringParameter?: string,
    integerParameter?: number
  }) => new OpenApiRequestBuilder<DefaultApi, 'getAllEntities'>(
    DefaultApi,
    'getAllEntities',
    args?.stringParameter,
    args?.integerParameter
  ),
  createEntity: (args?: {
    testEntity?: TestEntity
  }) => new OpenApiRequestBuilder<DefaultApi, 'createEntity'>(
    DefaultApi,
    'createEntity',
    args?.testEntity
  ),
  getEntityByKey: (args: {
    entityId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getEntityByKey'>(
    DefaultApi,
    'getEntityByKey',
    args.entityId
  ),
  countEntities: () => new OpenApiRequestBuilder<DefaultApi, 'countEntities'>(
    DefaultApi,
    'countEntities'
  ),
  testCaseGetRequiredParameters: (args: {
    requiredPathItemQueryParam: string,
    requiredPathItemPathParam: string,
    requiredQueryParam: string,
    optionalQueryParam?: string,
    optionalPathItemQueryParam?: string,
    simpleTestEntity?: SimpleTestEntity
  }) => new OpenApiRequestBuilder<DefaultApi, 'testCaseGetRequiredParameters'>(
    DefaultApi,
    'testCaseGetRequiredParameters',
    args.requiredPathItemQueryParam,
    args.requiredPathItemPathParam,
    args.requiredQueryParam,
    args.optionalQueryParam,
    args.optionalPathItemQueryParam,
    args.simpleTestEntity
  ),
  testCasePostRequiredParameters: (args: {
    requiredPathItemQueryParam: string,
    requiredPathItemPathParam: string,
    requiredQueryParam: string,
    simpleTestEntity: SimpleTestEntity,
    optionalPathItemQueryParam?: string,
    optionalQueryParam?: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'testCasePostRequiredParameters'>(
    DefaultApi,
    'testCasePostRequiredParameters',
    args.requiredPathItemQueryParam,
    args.requiredPathItemPathParam,
    args.requiredQueryParam,
    args.simpleTestEntity,
    args.optionalPathItemQueryParam,
    args.optionalQueryParam
  )
};
