/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  ODataCreateRequestConfig,
  ODataGetAllRequestConfig,
  ODataUpdateRequestConfig
} from '../../src/common/request-builder/request';
import { ODataRequest } from '../../src/v2/request-builder/request/odata-request';
import { Destination } from '../../src/scp-cf';
import * as uriConversion from '../../src/v2/request-builder/request/uri-conversion';
import { TestEntity } from './test-services/v2/test-service';

export function createUpdateRequest(
  dest: Destination
): ODataRequest<ODataUpdateRequestConfig<TestEntity>> {
  const requestConfig = new ODataUpdateRequestConfig(TestEntity, uriConversion);
  return new ODataRequest(requestConfig, dest);
}

export function createGetAllRequest(
  dest: Destination
): ODataRequest<ODataGetAllRequestConfig<TestEntity>> {
  const requestConfig = new ODataGetAllRequestConfig(TestEntity, uriConversion);
  return new ODataRequest(requestConfig, dest);
}

export function createCreateRequest(
  dest: Destination
): ODataRequest<ODataCreateRequestConfig<TestEntity>> {
  const requestConfig = new ODataCreateRequestConfig(TestEntity, uriConversion);
  return new ODataRequest(requestConfig, dest);
}
