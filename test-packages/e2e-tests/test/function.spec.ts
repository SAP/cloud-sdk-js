import {
  returnSapCloudSdk,
  concatStrings, getByKey
} from '@sap-cloud-sdk/test-services-e2e/v4/test-service/function-imports';

const url = 'http://localhost:4004/';
const destination = { url };

describe('functions', () => {
  describe('without parameters', () => {
    const request = returnSapCloudSdk({});
    it('should serialize url', async () => {
      expect(await request.url(destination)).toBe(
        `${url}odata/test-service/returnSapCloudSdk()?$format=json`
      );
    });

    it('should execute request', async () => {
      expect(await request.execute(destination)).toBe('SapCloudSdk');
    });
  });

  describe('with parameters', () => {
    const request = concatStrings({
      str1: 'test',
      str2: 'string'
    });

    it('should serialize url', async () => {
      expect(await request.url(destination)).toBe(
        `${url}odata/test-service/concatStrings(Str1='test',Str2='string')?$format=json`
      );
    });

    it('should execute request', async () => {
      expect(await request.execute(destination)).toBe('teststring');
    });
  });

  // describe('entity type as response', () => {
  //   const request = getByKey({
  //     param: 123
  //   });
  //
  //   it('should execute request', async () => {
  //     expect((await request.execute(destination)).keyTestEntity).toBe(123);
  //   }, 60000);
  // });
});
