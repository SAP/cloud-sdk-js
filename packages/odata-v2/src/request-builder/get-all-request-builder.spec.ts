import {
  defaultDestination,
  mockGetRequest,
  unmockDestinationsEnv,
  createOriginalTestEntityData1,
  createOriginalTestEntityData2
} from '../../../../test-resources/test/test-util';
import { testEntityApi } from '../../test/test-util';
import { GetAllRequestBuilder } from './get-all-request-builder';
import type { DefaultDeSerializers } from '../de-serializers';
import type { TestEntity } from '@sap-cloud-sdk/test-services-odata-v2/test-service';

describe('GetAllRequestBuilder', () => {
  let requestBuilder: GetAllRequestBuilder<TestEntity, DefaultDeSerializers>;

  afterEach(() => {
    unmockDestinationsEnv();
  });

  beforeEach(() => {
    requestBuilder = new GetAllRequestBuilder(testEntityApi);
  });

  it('returns request and raw response', async () => {
    const entityData1 = createOriginalTestEntityData1();
    const entityData2 = createOriginalTestEntityData2();
    const rawResponse = { d: { results: [entityData1, entityData2] } };

    mockGetRequest(
      {
        responseBody: rawResponse,
        path: 'A_TestEntity'
      },
      testEntityApi
    );

    const actual = await requestBuilder.executeRaw(defaultDestination);
    expect(actual.data).toEqual(rawResponse);
    expect(actual.request.method).toBe('GET');
  });
});
