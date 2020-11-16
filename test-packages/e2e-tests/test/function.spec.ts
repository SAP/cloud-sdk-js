import {
  returnSapCloudSdk,
  concatStrings
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
    const query = concatStrings({
      str1: 'test',
      str2: 'string'
    });
    expect(await query.url(destination)).toBe(
      `${url}test-service/concatStrings(Str1='test',Str2='string')?$format=json`
    );
    expect(await query.execute(destination)).toBe('teststring');
  });
});
