import { Destination } from '@sap-cloud-sdk/connectivity';
import {
  ODataCreateRequestConfig,
  ODataRequest
} from '@sap-cloud-sdk/odata-common';
import { oDataUri } from '@sap-cloud-sdk/odata-v2';
import { TestEntity } from '@sap-cloud-sdk/test-services/v2/test-service';

export function createCreateRequest(
  dest: Destination
): ODataRequest<ODataCreateRequestConfig<TestEntity>> {
  const requestConfig = new ODataCreateRequestConfig(TestEntity, oDataUri);
  return new ODataRequest(requestConfig, dest);
}
