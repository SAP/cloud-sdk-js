import nock from 'nock';
import { basicHeader } from '../../src/request-builder/header-builder/authorization-header';

export function mockClientCredentialsGrantCall(uri: string, response: any, responseCode: number, clientId: string, clientSecret: string) {
  return nock(uri, {
    reqheaders: xsuaaRequestHeaders(basicHeader(clientId, clientSecret))
  })
    .post('/oauth/token', 'grant_type=client_credentials')
    .reply(responseCode, response);
}

export function mockUserTokenGrantCall(uri: string, response: any, responseCode: number, accessToken: string, clientId: string) {
  return nock(uri, {
    reqheaders: xsuaaRequestHeaders(`Bearer ${accessToken}`)
  })
    .post('/oauth/token', `client_id=${clientId}&grant_type=user_token&response_type=token`)
    .reply(responseCode, response);
}

export function mockRefreshTokenGrantCall(
  uri: string,
  response: any,
  responseCode: number,
  refreshToken: string,
  clientId: string,
  clientSecret: string
) {
  return nock(uri, {
    reqheaders: xsuaaRequestHeaders(basicHeader(clientId, clientSecret))
  })
    .post('/oauth/token', `grant_type=refresh_token&refresh_token=${refreshToken}`)
    .reply(responseCode, response);
}

function xsuaaRequestHeaders(authHeader: string) {
  return {
    Authorization: authHeader,
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json'
  };
}
