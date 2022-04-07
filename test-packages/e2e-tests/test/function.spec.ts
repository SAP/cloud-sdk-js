import {
  returnSapCloudSdk,
  concatStrings,
  getByKey,
  getAll,
  returnCollection
} from '@sap-cloud-sdk/test-services-e2e/v4/test-service/function-imports';

const url = 'http://localhost:4004/';
const destination = { url };

describe('functions', () => {
  describe('without parameters, returns string', () => {
    const request = returnSapCloudSdk({});
    it('should serialize url', async () => {
      expect(await request.url(destination)).toBe(
        `${url}odata/test-service/returnSapCloudSdk()`
      );
    });

    it('should execute request', async () => {
      expect(await request.execute(destination)).toBe('SapCloudSdk');
    });
  });

  describe('without parameters, returns array', () => {
    const request = getAll({});

    it('should execute request', async () => {
      expect((await request.execute(destination)).length).toBe(4);
    });
  });

  describe('string parameters, returns string', () => {
    const request = concatStrings({
      str1: 'test',
      str2: 'string'
    });

    it('should serialize url', async () => {
      expect(await request.url(destination)).toBe(
        `${url}odata/test-service/concatStrings(Str1='test',Str2='string')`
      );
    });

    it('should execute request', async () => {
      expect(await request.execute(destination)).toBe('teststring');
    });
  });

  describe('integer parameter, returns entity', () => {
    const request = getByKey({
      param: 101
    });

    it('should execute request', async () => {
      expect((await request.execute(destination)).keyTestEntity).toBe(101);
    });
  });

  describe('integer parameter, returns array', () => {
    const request = returnCollection({ param: 1 });

    it('should execute request', async () => {
      expect(await request.execute(destination)).toStrictEqual([1]);
    });
  });
});
