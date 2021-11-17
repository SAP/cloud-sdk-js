import { batch, changeset } from '@sap-cloud-sdk/test-services/v2/test-service';
import nock from 'nock';
import { Destination } from '@sap-cloud-sdk/connectivity';
import { basicHeader } from '@sap-cloud-sdk/connectivity/internal';
import { ErrorResponse } from '@sap-cloud-sdk/odata-common/dist/batch-response';
import {
  createAsChildOfRequest,
  createRequest,
  deleteRequest,
  getAllRequest,
  getByKeyRequest,
  patchRequest,
  putRequest
} from '../test-data/batch-sub-requests';
import {
  mixedBatchRequest,
  mixedErrorRequest,
  multiChangesetBatchRequest,
  multiRetrieveRequest
} from '../test-data/batch/requests';
import {
  mixedBatchResponse,
  mixedErrorResponse,
  multiChangesetBatchResponse,
  multiRetrieveResponse
} from '../test-data/batch/responses';

const basicHeaderCSRF = 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=';
const servicePath = '/sap/opu/odata/sap/API_TEST_SRV';
const csrfToken = 'CSRFTOKEN';

const destination: Destination = {
  url: 'https://example.com',
  username: 'username',
  password: 'password',
  sapClient: '123',
  authTokens: [],
  originalProperties: {}
};

function mockCsrfTokenRequest(host: string, sapClient: string) {
  nock(host, {
    reqheaders: {
      authorization: basicHeaderCSRF,
      'x-csrf-token': 'Fetch',
      'sap-client': sapClient
    }
  })
    .head(`${servicePath}/$batch`)
    .reply(200, '', {
      'x-csrf-token': csrfToken,
      'Set-Cookie': ['key1=val1', 'key2=val2', 'key3=val3']
    });
}

function mockBatchRequest(matchRequestPayload, responseData) {
  mockCsrfTokenRequest(destination.url, destination.sapClient!);

  nock(destination.url, {
    reqheaders: {
      authorization: basicHeader(destination.username!, destination.password!),
      accept: 'multipart/mixed',
      cookie: 'key1=val1;key2=val2;key3=val3'
    }
  })
    .matchHeader('content-type', /multipart\/mixed; boundary=batch_*/)
    .post(`${servicePath}/$batch`, new RegExp(matchRequestPayload))
    .reply(202, responseData, {
      'Content-Type': 'multipart/mixed; boundary=TEST-RESPONSE'
    });
}

describe('Batch', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should resolve for multiple retrieve requests', async () => {
    mockBatchRequest(multiRetrieveRequest(), multiRetrieveResponse());

    const request = batch(getAllRequest, getByKeyRequest).execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('should resolve for multiple changesets', async () => {
    mockBatchRequest(
      multiChangesetBatchRequest(),
      multiChangesetBatchResponse()
    );

    const request = batch(
      changeset(createRequest),
      changeset(createAsChildOfRequest, patchRequest, putRequest, deleteRequest)
    ).execute(destination);
    await expect(request).resolves.not.toThrow();
  });

  it('should resolve for mixed changesets and retrieve requests', async () => {
    mockBatchRequest(mixedBatchRequest(), mixedBatchResponse());

    const request = batch(getAllRequest, changeset(createRequest)).execute(
      destination
    );

    await expect(request).resolves.not.toThrow();
  });

  it('should resolve and return error for failing requests', async () => {
    mockBatchRequest(mixedErrorRequest(), mixedErrorResponse());

    const response = await batch(
      getAllRequest,
      getAllRequest,
      changeset(createRequest),
      changeset(createRequest)
    ).execute(destination);

    expect(response[0].isSuccess()).toBe(true);
    expect(response[1].isSuccess()).toBe(false);
    expect(response[2].isSuccess()).toBe(true);
    expect(response[3].isSuccess()).toBe(false);

    const retrieveErrorResponse = response[1] as ErrorResponse;
    const changesetErrorResponse = response[3] as ErrorResponse;

    expect(retrieveErrorResponse.httpCode).toBe(404);
    expect(changesetErrorResponse.httpCode).toBe(400);
  });
});
