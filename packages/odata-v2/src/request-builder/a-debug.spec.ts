import { testService } from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import nock from 'nock';
import {
  ODataCreateRequestConfig,
  ODataRequest
} from '@sap-cloud-sdk/odata-common';
import { createODataUri as createODataUriV2 } from '@sap-cloud-sdk/odata-v2/internal';
import {
  defaultDestination,
  defaultHost
} from '../../../../test-resources/test/test-util';
import { CreateRequestBuilder } from './create-request-builder';

describe('debug', () => {
  const { testEntityApi } = testService();

  it('create', async () => {
    const requestConfig = new ODataCreateRequestConfig(
      testEntityApi,
      createODataUriV2(testEntityApi.deSerializers)
    );

    const request = new ODataRequest(requestConfig, defaultDestination);

    nock(defaultHost).head(`/${request.relativeServiceUrl()}`).reply(200);

    nock(defaultHost)
      .post(`/${request.relativeServiceUrl()}`)
      // .query({})
      // .delay(0)
      .reply(500, { d: undefined });

    const someEntity = testEntityApi.entityBuilder().stringProperty('').build();

    const createRequest = new CreateRequestBuilder(
      testEntityApi,
      someEntity
    ).execute(defaultDestination);

    await expect(createRequest).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Create request failed!"'
    );
  });
});
