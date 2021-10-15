import { Destination } from '@sap-cloud-sdk/connectivity';
import {
  ODataUpdateRequestConfig,
  ODataGetAllRequestConfig,
  ODataCreateRequestConfig,
  ODataRequest
} from '../../src/odata-common';
import { oDataUri } from '../../src';
import { TestEntity } from './test-services/v2/test-service';

export function createUpdateRequest(
  dest: Destination
): ODataRequest<ODataUpdateRequestConfig<TestEntity>> {
  const requestConfig = new ODataUpdateRequestConfig(TestEntity, oDataUri);
  return new ODataRequest(requestConfig, dest);
}

export function createGetAllRequest(
  dest: Destination
): ODataRequest<ODataGetAllRequestConfig<TestEntity>> {
  const requestConfig = new ODataGetAllRequestConfig(TestEntity, oDataUri);
  return new ODataRequest(requestConfig, dest);
}

export function createCreateRequest(
  dest: Destination
): ODataRequest<ODataCreateRequestConfig<TestEntity>> {
  const requestConfig = new ODataCreateRequestConfig(TestEntity, oDataUri);
  return new ODataRequest(requestConfig, dest);
}
