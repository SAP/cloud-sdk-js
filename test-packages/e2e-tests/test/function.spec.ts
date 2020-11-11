import { returnSapCloudSdk } from '@sap-cloud-sdk/test-services-e2e/v4/admin-service/function-imports';

const url = 'http://localhost:4004/';
const destination = { url };

fdescribe('Request builder test', () => {
  it('should correctly use function import without params', async () => {
    const generatedUrl = await returnSapCloudSdk({}).url(destination);
    expect(generatedUrl).toBe(`${url}/returnSapCloudSdk()?$format=json`);
    const response = await returnSapCloudSdk({}).execute(destination);
    expect(response).toBe('SapCloudSdk');
  });

  it('should correctly use function import with params', async () => {
    const generatedUrl = await returnSapCloudSdk({ Int: 3, Str: 'test' }).url(
      destination
    );
    expect(generatedUrl).toBe(
      `${url}/returnSapCloudSdk(Int=3,Str=test)?$format=json`
    );
    const response = await returnSapCloudSdk({}).execute(destination);
    expect(response).toBe('SapCloudSdk');
  });
});
