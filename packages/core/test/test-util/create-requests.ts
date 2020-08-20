/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ODataUpdateRequestConfig } from '../../src/odata/common/request/odata-update-request-config';
import { ODataGetAllRequestConfig } from '../../src/odata/common/request/odata-get-all-request-config';
import { ODataCreateRequestConfig } from '../../src/odata/common/request/odata-create-request-config';
import { ODataRequest } from '../../src/odata/common/request/odata-request';
import { Destination } from '../../src/scp-cf';
import { odataUriV2 } from '../../src';
import { TestEntity } from './test-services/v2/test-service';

export function createUpdateRequest(
  dest: Destination
): ODataRequest<ODataUpdateRequestConfig<TestEntity>> {
  const requestConfig = new ODataUpdateRequestConfig(TestEntity, odataUriV2);
  return new ODataRequest(requestConfig, dest);
}

export function createGetAllRequest(
  dest: Destination
): ODataRequest<ODataGetAllRequestConfig<TestEntity>> {
  const requestConfig = new ODataGetAllRequestConfig(TestEntity, odataUriV2);
  return new ODataRequest(requestConfig, dest);
}

export function createCreateRequest(
  dest: Destination
): ODataRequest<ODataCreateRequestConfig<TestEntity>> {
  const requestConfig = new ODataCreateRequestConfig(TestEntity, odataUriV2);
  return new ODataRequest(requestConfig, dest);
}
