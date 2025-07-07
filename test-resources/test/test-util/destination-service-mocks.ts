import nock from 'nock';
import { destinationServiceUri as defaultDestinationServiceUri } from './environment-mocks';
import { providerServiceToken } from './mocked-access-tokens';
import { destinationSingleResponse } from './example-destination-service-responses';
import type {
  DestinationConfiguration,
  DestinationJson
} from '@sap-cloud-sdk/connectivity';

export function mockCertificateCall(
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
  response: any,
  responseCode: number,
  accessToken: string,
  uri: string = defaultDestinationServiceUri
) {
  return nock(uri, {
    reqheaders: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .get('/destination-configuration/v1/instanceDestinations')
    .reply(responseCode, response);
}

export function mockSubaccountDestinationsCall(
  response: any,
  responseCode: number,
  accessToken: string,
  uri: string = defaultDestinationServiceUri
) {
  return nock(uri, {
    reqheaders: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .get('/destination-configuration/v1/subaccountDestinations')
    .reply(responseCode, response);
}

type MockedDestinationConfiguration =
  | (DestinationJson & {
      owner: {
        SubaccountId: string | null;
        InstanceId: string | null;
      };
    })
  | DestinationConfiguration;

interface FindDestinationOptions {
  response?: any;
  responseCode?: number;
  headers?: Record<string, any>;
  destinationServiceUri?: string;
  serviceToken?: string;
  /**
   * Mock a destination call with $skipTokenRetrieval. Defaults to `true`.
   */
  mockWithoutTokenRetrievalCall?: boolean;

  /**
   * Mock a destination call that includes the auth flow. If set to `true`, the metadata configuration will be reused.
   * If a configuration is given, it overwrites the default.
   */
  mockWithTokenRetrievalCall?:
    | boolean
    | {
        response?: any;
        responseCode?: number;
        headers?: Record<string, any>;
      };
}

function parseFindDestinationOptions(
  options: FindDestinationOptions,
  destination?: MockedDestinationConfiguration
) {
  const {
    responseCode,
    destinationServiceUri,
    badheaders,
    serviceToken,
    mockWithoutTokenRetrievalCall: mockWithoutTokenRetrievalCall,
    response
  } = {
    response: destination,
    responseCode: 200,
    destinationServiceUri: defaultDestinationServiceUri,
    badheaders: ['x-tenant', 'x-user-token'], // X-tenant only allowed for OAuth2ClientCredentials flow
    serviceToken: providerServiceToken,
    mockWithoutTokenRetrievalCall: true,
    ...options
  };

  const headers = {
    ...(serviceToken && {
      authorization: `Bearer ${serviceToken}`
    }),
    ...options.headers
  };

  const defaultMockFetchDestinationWithTokenRetrieval:
    | Record<string, any>
    | false =
    typeof options.mockWithTokenRetrievalCall === 'object' ||
    options.mockWithTokenRetrievalCall === false
      ? options.mockWithTokenRetrievalCall
      : {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { authTokens, ...metadataRespose } = response;

  const mockWithTokenRetrievalCall =
    defaultMockFetchDestinationWithTokenRetrieval
      ? {
          response,
          responseCode,
          headers: {
            ...defaultMockFetchDestinationWithTokenRetrieval.headers,
            ...headers
          },
          badheaders: badheaders.filter(
            badheader =>
              !Object.keys({
                ...defaultMockFetchDestinationWithTokenRetrieval.headers,
                ...headers
              }).includes(badheader)
          ),
          ...defaultMockFetchDestinationWithTokenRetrieval
        }
      : (false as const);

  return {
    responseCode,
    destinationServiceUri,
    badheaders,
    serviceToken,
    mockWithoutTokenRetrievalCall,
    mockWithTokenRetrievalCall,
    headers,
    metadataRespose
  };
}

// This function is needed to identify destination configurations for destinations of type HTTP as well as MAIL.
function isDestinationConfiguration(
  destination: any
): destination is DestinationConfiguration {
  return 'Name' in destination;
}

function parseDestination(destination: MockedDestinationConfiguration) {
  return isDestinationConfiguration(destination)
    ? destinationSingleResponse([destination])
    : destination;
}

export function mockFetchDestinationCallsNotFound(
  destination: string,
  options: FindDestinationOptions = {}
) {
  return mockFetchDestinationCalls(destination, {
    response: {
      ErrorMessage: 'Configuration with the specified name was not found'
    },
    responseCode: 404,
    mockWithTokenRetrievalCall: false,
    ...options
  });
}

export function mockFetchDestinationCalls(
  destination: MockedDestinationConfiguration | string,
  options: FindDestinationOptions = {}
): nock.Scope[] {
  const parsedDestination =
    typeof destination === 'string'
      ? { destinationConfiguration: { Name: destination } }
      : parseDestination(destination);
  const destinationName = parsedDestination.destinationConfiguration.Name;

  const parsedOptions = parseFindDestinationOptions(options, parsedDestination);

  const nockScopes: nock.Scope[] = [];
  if (parsedOptions.mockWithoutTokenRetrievalCall) {
    nockScopes.push(
      nock(parsedOptions.destinationServiceUri, {
        reqheaders: parsedOptions.headers,
        badheaders: parsedOptions.badheaders
      })
        .get(`/destination-configuration/v1/destinations/${destinationName}`)
        .query({ $skipTokenRetrieval: true })
        .reply(parsedOptions.responseCode, parsedOptions.metadataRespose)
    );
  }
  if (parsedOptions.mockWithTokenRetrievalCall) {
    nockScopes.push(
      nock(parsedOptions.destinationServiceUri, {
        reqheaders: parsedOptions.mockWithTokenRetrievalCall.headers,
        badheaders: parsedOptions.mockWithTokenRetrievalCall.badheaders
      })
        .get(`/destination-configuration/v1/destinations/${destinationName}`)
        .reply(
          parsedOptions.mockWithTokenRetrievalCall.responseCode,
          parsedOptions.mockWithTokenRetrievalCall.response
        )
    );
  }
  return nockScopes;
}
