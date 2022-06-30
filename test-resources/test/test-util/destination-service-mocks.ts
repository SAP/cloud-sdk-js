import nock from 'nock';
import * as sdkJwt from '@sap-cloud-sdk/connectivity/src/scp-cf/jwt';
import { destinationServiceUri } from './environment-mocks';

type nockFunction = (a: string, b: nock.Options) => nock.Scope;

export function mockCertificateCall(
  nockREf: nockFunction,
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

  return nock(destinationServiceUri, {
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
  uri: string = destinationServiceUri
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
  uri: string = destinationServiceUri
) {
  return nockRef(uri, {
    reqheaders: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .get('/destination-configuration/v1/subaccountDestinations')
    .reply(responseCode, response);
}

export function mockSingleDestinationCall(
  nockRef: nockFunction,
  response: any,
  responseCode: number,
  destName: string,
  headers: Record<string, any>,
  options?: { uri?: string; badheaders?: string[] }
) {
  return nockRef(options?.uri || destinationServiceUri, {
    reqheaders: headers,
    badheaders: options?.badheaders || ['X-tenant', 'X-user-token'] // X-tenant only allowed for OAuth2ClientCredentials flow
  })
    .get(`/destination-configuration/v1/destinations/${destName}`)
    .reply(responseCode, response);
}

export function mockVerifyJwt() {
  return jest
    .spyOn(sdkJwt, 'verifyJwt')
    .mockImplementation(token => Promise.resolve(sdkJwt.decodeJwt(token)));
}
