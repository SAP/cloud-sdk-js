import { returnSapCloudSdk } from '@sap-cloud-sdk/test-services-e2e/v4/admin-service/function-imports';

const url = 'http://localhost:4004/';
const destination = { url };

describe('Request builder test', () => {
  xit('should', async () => {
    const generatedUrl = await returnSapCloudSdk({}).url(destination);
    const response = await returnSapCloudSdk({}).execute(destination);
    expect(response).toBe('SapCloudSdk');
  });
});
