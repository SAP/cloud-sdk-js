import {
  ODataUpdateRequestConfig,
  ODataGetAllRequestConfig,
  ODataCreateRequestConfig,
  ODataRequest
} from '../../src/odata-common';
import { Destination } from '../../src/connectivity/scp-cf';
import { oDataUriV2 } from '../../src';
import { TestEntity } from './test-services/v2/test-service';

export function createUpdateRequest(
  dest: Destination
): ODataRequest<ODataUpdateRequestConfig<TestEntity>> {
  const requestConfig = new ODataUpdateRequestConfig(TestEntity, oDataUriV2);
  return new ODataRequest(requestConfig, dest);
}

export function createGetAllRequest(
  dest: Destination
): ODataRequest<ODataGetAllRequestConfig<TestEntity>> {
  const requestConfig = new ODataGetAllRequestConfig(TestEntity, oDataUriV2);
  return new ODataRequest(requestConfig, dest);
}

export function createCreateRequest(
  dest: Destination
): ODataRequest<ODataCreateRequestConfig<TestEntity>> {
  const requestConfig = new ODataCreateRequestConfig(TestEntity, oDataUriV2);
  return new ODataRequest(requestConfig, dest);
}
