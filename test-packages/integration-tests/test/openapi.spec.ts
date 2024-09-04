import { TestCaseApi } from '@sap-cloud-sdk/test-services-openapi/test-service';
import nock from 'nock';

const destination = {
  url: 'https://example.com'
};

describe('response handling', () => {
  beforeEach(() => {
    nock(destination.url)
      .get('/test-cases/media-type/octet-stream')
      // base64 encoded 'test'
      .reply(200, 'dGVzdA==', { 'content-type': 'application/octet-stream' });
  });

  it('transforms response to Blob', async () => {
    const response = await TestCaseApi.mediaOctetStream().execute(destination);
    expect(response).toBeInstanceOf(Blob);
  });
});
