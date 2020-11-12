import {
  returnSapCloudSdk,
  returnSapCloudSdk2
} from '@sap-cloud-sdk/test-services-e2e/v4/test-service/function-imports';

const url = 'http://localhost:4004/';
const destination = { url };

describe('Request builder test', () => {
  it('should correctly use function import without params', async () => {
    const query = returnSapCloudSdk({});
    expect(await query.url(destination)).toBe(
      `${url}test-service/returnSapCloudSdk()?$format=json`
    );
    expect(await query.execute(destination)).toBe('SapCloudSdk');
  });

  it('should correctly use function import with params', async () => {
    const query = returnSapCloudSdk2({
      int: 3,
      str: 'test'
    });
    expect(await query.url(destination)).toBe(
      `${url}test-service/returnSapCloudSdk2(Str='test',Int=3)?$format=json`
    );
    expect(await query.execute(destination)).toBe('SapCloudSdk');
  });
});
