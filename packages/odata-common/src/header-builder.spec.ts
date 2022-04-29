import { CommonEntityApi } from '@sap-cloud-sdk/test-services-odata-common/common-entity';
import {
  getAllRequestConfig,
  updateRequestConfig
} from '@sap-cloud-sdk/test-services-odata-common/common-request-config';
import {
  defaultDestination,
  mockHeaderRequest
} from '../../../test-resources/test/test-util/request-mocker';
import { ODataRequest } from './request';
import { buildHeaders } from './header-builder';

describe('Header-Builder', () => {
  it('customHeaders are not overwritten', async () => {
    const authString = 'initial';
    const request = new ODataRequest(getAllRequestConfig(), defaultDestination);
    request.config.customHeaders = { authorization: authString };

    const headers = await buildHeaders(request);
    expect(headers.custom!.authorization).toBe(authString);
  });

  const commonEntity = new CommonEntityApi().entityBuilder().build();
  describe('update request header with ETag', () => {
    it('if-match should not be set when no ETag is specified', async () => {
      const request = new ODataRequest(
        updateRequestConfig({ payload: commonEntity }),
        defaultDestination
      );

      mockHeaderRequest({ request });

      const actual = await buildHeaders(request);
      expect(actual['if-match']).toBeUndefined();
    });

    it('if-match should be set when ETag is specified in header-builder', async () => {
      const request = new ODataRequest(
        updateRequestConfig({ payload: commonEntity }),
        defaultDestination
      );
      request.config.eTag = 'W//';

      mockHeaderRequest({ request });

      const actual = await buildHeaders(request);
      expect(actual.requestConfig!['if-match']).toBe('W//');
    });

    it('if-match should be set to * when version identifier is ignored', async () => {
      const request = new ODataRequest(
        updateRequestConfig({ payload: commonEntity }),
        defaultDestination
      );
      request.config.eTag = 'W//';
      // Set by ignoreVersionIdentifier()
      request.config.versionIdentifierIgnored = true;

      mockHeaderRequest({ request });

      const actual = await buildHeaders(request);
      expect(actual.requestConfig!['if-match']).toBe('*');
    });
  });
});
