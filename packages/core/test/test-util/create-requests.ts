import { Destination } from '@sap-cloud-sdk/connectivity';
import {
  ODataUpdateRequestConfig,
  ODataGetAllRequestConfig,
  ODataCreateRequestConfig,
  ODataRequest
} from '@sap-cloud-sdk/odata-common';
import { TestEntity } from './test-services/v2/test-service';
import {oDataUri} from "@sap-cloud-sdk/odata-v2";

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
