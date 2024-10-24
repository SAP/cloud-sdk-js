import nock from 'nock';
import axios from 'axios';
import {
  unmockDestinationsEnv,
  createOriginalTestEntityData1,
  createOriginalTestEntityData2
} from '../../../../test-resources/test/test-util';
describe('GetAllRequestBuilder', () => {
  afterEach(() => {
    unmockDestinationsEnv();
  });

  describe('executeRaw', () => {
    it('returns request and raw response', async () => {
      const entityData1 = createOriginalTestEntityData1();
      const entityData2 = createOriginalTestEntityData2();
      const rawResponse = { d: { results: [entityData1, entityData2] } };
      // ///

      nock('http://example.com', undefined)
        .get('/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity', undefined)
        .query({})
        .delay(0)
        .reply(200, rawResponse, undefined);

      // ///

      const actual = await axios.get(
        'http://example.com/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity'
      );

      // const actual = await requestBuilder.executeRaw(defaultDestination);
      expect(actual.data).toEqual(rawResponse);
      expect(actual.request.method).toBe('GET');
    });
  });
});
