import nock from 'nock';
import * as sdkJwt from '@sap-cloud-sdk/connectivity/src/scp-cf/jwt';
import {
  DestinationConfiguration,
  DestinationJson
} from '@sap-cloud-sdk/connectivity';
import { isDestinationConfiguration } from '@sap-cloud-sdk/connectivity/internal';
import { destinationServiceUri as defaultDestinationServiceUri } from './environment-mocks';
import { providerServiceToken } from './mocked-access-tokens';
import { destinationSingleResponse } from './example-destination-service-responses';

type nockFunction = (a: string, b: nock.Options) => nock.Scope;

export function mockCertificateCall(
  nockRef: nockFunction,
  certificateName: string,
  token: string,
  type: 'subaccount' | 'instance'
) {
  const response = {
    Type: 'CERTIFICATE',
    Name: certificateName,
    Content:
      'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNPRENDQWFFQ0ZHMWhzbll2NzV5UTZYVVNXQ1dlckYzaUZMaDRNQTBHQ1NxR1NJYjNEUUVCQ3dVQU1Gc3gKQ3pBSkJnTlZCQVlUQWtSRk1Rc3dDUVlEVlFRSURBSkVSVEVQTUEwR0ExVUVCd3dHUW1WeWJHbHVNUXd3Q2dZRApWUVFLREFOVFFWQXhEREFLQmdOVkJBc01BMU5CVURFU01CQUdBMVVFQXd3SmJHOWpZV3hvYjNOME1CNFhEVEl5Ck1EUXlNakUwTVRreU1sb1hEVEl5TURVeU1qRTBNVGt5TWxvd1d6RUxNQWtHQTFVRUJoTUNSRVV4Q3pBSkJnTlYKQkFnTUFrUkZNUTh3RFFZRFZRUUhEQVpDWlhKc2FXNHhEREFLQmdOVkJBb01BMU5CVURFTU1Bb0dBMVVFQ3d3RApVMEZRTVJJd0VBWURWUVFEREFsc2IyTmhiR2h2YzNRd2daOHdEUVlKS29aSWh2Y05BUUVCQlFBRGdZMEFNSUdKCkFvR0JBTFNhVS9IRU1YbEozSFpsZ3MyNGs5dVdTbnR4clVsZktybXNlaG01ZUM4ZlNHZzFaa1N3ajdOSCtQUGwKNTJleTk1V0N2cVBaU0cyZkFrc0FRamJnUy9qa2RhdUIyMjlmVGV4WVNub00vVHdoN0ZhVVRnQjhJd0JuS0pZTgphY1pUUklnZkZWWENxZEx6d0ZHWWYyWGprOWtETkRCanRTMy9STHlMbVY3b3dXK25BZ01CQUFFd0RRWUpLb1pJCmh2Y05BUUVMQlFBRGdZRUFYK0lUK0JsT2ZvbVc0NGlpb3ZpeXdkelMzeVdGbGdRazh3Q2VCWmltb3BNNEF2ZTEKaUJLbTlOZmpkam03allWcXhKOGU4cWl6SGxONy9qVEY2RzV3bnl3RmUzSGZGVHFoQTVPelY1THlxcngxV2RNcwpUNTNUdFFtK29RZFVOYW52SnVrOVZBTkVZKzVPYkc0OGdwL2JobXNrZ24vUkFQekRna25GMGFyOFFVVT0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='
  };

  return nock(defaultDestinationServiceUri, {
    reqheaders: {
      authorization: `Bearer ${token}`
    }
  })
    .get(`/destination-configuration/v1/${type}Certificates/${certificateName}`)
    .reply(200, response);
}

export function mockInstanceDestinationsCall(
  nockRef: nockFunction,
  response: any,
  responseCode: number,
  accessToken: string,
  uri: string = defaultDestinationServiceUri
) {
  return nockRef(uri, {
    reqheaders: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .get('/destination-configuration/v1/instanceDestinations')
    .reply(responseCode, response);
}

export function mockSubaccountDestinationsCall(
  nockRef: nockFunction,
  response: any,
  responseCode: number,
  accessToken: string,
  uri: string = defaultDestinationServiceUri
) {
  return nockRef(uri, {
    reqheaders: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .get('/destination-configuration/v1/subaccountDestinations')
    .reply(responseCode, response);
}
export function mockFindDestinationCalls(
  destination:
    | (DestinationJson & {
        owner: {
          SubaccountId: string | null;
          InstanceId: string | null;
        };
      })
    | DestinationConfiguration,
  options: {
    responseCode?: number;
    headers?: Record<string, any>;
    destinationServiceUri?: string;
    serviceToken?: string;
    badheaders?: string[];
    /**
     * Mock a destination call with $skipTokenRetrieval. Defaults to `true`.
     */
    mockMetadataCall?: boolean;

    /**
     * Mock a destination call that includes the auth flow. If set to `true`, the metadata configuration will be reused.
     * If a configuration is given, it overwrites the default.
     */
    mockAuthCall?:
      | boolean
      | {
          response?: any;
          responseCode?: number;
          headers?: Record<string, any>;
          badheaders?: string[];
        };
  } = {}
): nock.Scope[] {
  const {
    responseCode,
    destinationServiceUri,
    badheaders,
    serviceToken,
    mockMetadataCall
  } = {
    responseCode: 200,
    destinationServiceUri: defaultDestinationServiceUri,
    badheaders: ['X-tenant', 'X-user-token'], // X-tenant only allowed for OAuth2ClientCredentials flow
    serviceToken: providerServiceToken,
    mockMetadataCall: true,
    ...options
  };

  const headers = {
    ...(serviceToken && {
      authorization: `Bearer ${serviceToken}`
    }),
    ...options.headers
  };

  const mockAuthCall: Record<string, any> | false =
    typeof options.mockAuthCall === 'object' || options.mockAuthCall === false
      ? options.mockAuthCall
      : {};

  const response = isDestinationConfiguration(destination)
    ? destinationSingleResponse([destination])
    : destination;
  const destinationName = response.destinationConfiguration.Name;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { authTokens, ...metadataRespose } = response;

  const nockScopes: nock.Scope[] = [];
  if (mockMetadataCall) {
    nockScopes.push(
      nock(destinationServiceUri, {
        reqheaders: headers,
        badheaders
      })
        .get(`/destination-configuration/v1/destinations/${destinationName}`)
        .query({ $skipTokenRetrieval: true })
        .reply(responseCode, metadataRespose)
    );
  }
  if (mockAuthCall) {
    const mockAuthCallOptions = {
      response,
      responseCode,
      headers: { ...headers, ...mockAuthCall.headers },
      badheaders,
      ...mockAuthCall
    };
    nockScopes.push(
      nock(destinationServiceUri, {
        reqheaders: mockAuthCallOptions.headers,
        badheaders: mockAuthCallOptions.badheaders
      })
        .get(`/destination-configuration/v1/destinations/${destinationName}`)
        .reply(mockAuthCallOptions.responseCode, mockAuthCallOptions.response)
    );
  }
  return nockScopes;
}

export function mockSingleDestinationCall(
  nockRef: nockFunction,
  response: any,
  responseCode: number,
  destName: string,
  headers: Record<string, any> = {},
  options?: {
    uri?: string;
    badheaders?: string[];
    skipTokenRetrieval?: boolean;
  }
) {
  const { uri, badheaders, skipTokenRetrieval } = {
    uri: defaultDestinationServiceUri,
    badheaders: ['X-tenant', 'X-user-token'],
    skipTokenRetrieval: false,
    ...options
  };
  return nockRef(uri || defaultDestinationServiceUri, {
    reqheaders: headers,
    badheaders: badheaders || ['X-tenant', 'X-user-token'] // X-tenant only allowed for OAuth2ClientCredentials flow
  })
    .get(`/destination-configuration/v1/destinations/${destName}`)
    .query({
      ...(skipTokenRetrieval && { $skipTokenRetrieval: skipTokenRetrieval })
    })
    .reply(responseCode, response);
}

export function mockVerifyJwt() {
  return jest
    .spyOn(sdkJwt, 'verifyJwt')
    .mockImplementation(token => Promise.resolve(sdkJwt.decodeJwt(token)));
}
