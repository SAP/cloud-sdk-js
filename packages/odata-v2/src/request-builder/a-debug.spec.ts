import { testService } from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import nock from 'nock';
import { defaultDestination } from '../../../../test-resources/test/test-util';
import { CreateRequestBuilder } from './create-request-builder';

describe('debug', () => {
  const { testEntityApi } = testService();

  it('create', async () => {
    nock('http://example.com')
      .head('/sap/opu/odata/sap/API_TEST_SRV')
      .reply(200);

    nock('http://example.com')
      .post('/sap/opu/odata/sap/API_TEST_SRV')
      .query({})
      .delay(0)
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
