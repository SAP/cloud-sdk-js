import nock from 'nock';
import axios from 'axios';
import { unmockDestinationsEnv } from '../../../../test-resources/test/test-util';

describe('GetAllRequestBuilder', () => {
  afterEach(() => {
    unmockDestinationsEnv();
  });

  describe('executeRaw', () => {
    it('returns request and raw response', async () => {
      const entityData1 = {
        KeyPropertyGuid: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        KeyPropertyString: 'ABCDE',
        StringProperty: 'FGHIJ',
        BooleanProperty: false,
        Int16Property: 13
      };

      const entityData2 = {
        KeyPropertyGuid: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        KeyPropertyString: '12345',
        StringProperty: '6789',
        BooleanProperty: true,
        Int16Property: 42,
        EnumProperty: 'Enum1'
      };
      const rawResponse = { d: { results: [entityData1, entityData2] } };

      nock('http://example.com', undefined)
        .get('/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity', undefined)
        .query({})
        .delay(0)
        .reply(200, rawResponse, undefined);

      const actual = await axios.get(
        'http://example.com/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity'
      );

      expect(actual.data).toEqual(rawResponse);
      expect(actual.request.method).toBe('GET');
    });
  });
});
