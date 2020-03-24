/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  ODataCreateRequestConfig,
  ODataGetAllRequestConfig,
  ODataUpdateRequestConfig
} from '../../src/request-builder/request';
import { ODataRequest } from '../../src/request-builder/request/odata-request';
import { Destination } from '../../src/scp-cf';
import { TestEntity } from './test-services/test-service';

export function createUpdateRequest(
  dest: Destination
): ODataRequest<ODataUpdateRequestConfig<TestEntity>> {
  const requestConfig = new ODataUpdateRequestConfig(TestEntity);
  return new ODataRequest(requestConfig, dest);
}

export function createGetAllRequest(
  dest: Destination
): ODataRequest<ODataGetAllRequestConfig<TestEntity>> {
  const requestConfig = new ODataGetAllRequestConfig(TestEntity);
  return new ODataRequest(requestConfig, dest);
}

export function createCreateRequest(
  dest: Destination
): ODataRequest<ODataCreateRequestConfig<TestEntity>> {
  const requestConfig = new ODataCreateRequestConfig(TestEntity);
  return new ODataRequest(requestConfig, dest);
}
