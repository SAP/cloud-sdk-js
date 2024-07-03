import nock from 'nock';
import { basicHeader } from '@sap-cloud-sdk/connectivity/internal';
import { ServiceCredentials } from '@sap-cloud-sdk/connectivity';

export function mockClientCredentialsGrantCall(
  uri: string,
  response: any,
  responseCode: number,
  serviceCredentials: ServiceCredentials,
  zoneId?: string,
  delay = 0
) {
  return nock(uri, {
    reqheaders: xsuaaRequestHeaders(zoneId ? { 'x-zid': zoneId } : {}),
    badheaders: zoneId ? [] : ['x-zid']
  })
    .post('/oauth/token', {
      grant_type: 'client_credentials',
      client_id: serviceCredentials.clientid,
      client_secret: serviceCredentials.clientsecret
    })
    .delay(delay)
    .reply(responseCode, response);
}

export function mockClientCredentialsGrantWithCertCall(
  uri: string,
  response: any,
  responseCode: number,
  serviceCredentials: ServiceCredentials,
  zoneId?: string
) {
  return nock(uri, {
    reqheaders: xsuaaRequestHeaders(zoneId ? { zid: zoneId } : {})
  })
    .post('/oauth/token', {
      grant_type: 'client_credentials',
      client_id: serviceCredentials.clientid
    })
    .reply(responseCode, function () {
      const agentOptions = (this.req as any).options.agent.options;
      expect(agentOptions.cert).toEqual(serviceCredentials.certificate);
      expect(agentOptions.key).toEqual(serviceCredentials.key);
      return response;
    });
}

export function mockUserTokenGrantCall(
  uri: string,
  times: number,
  accessTokenResponse: string,
  accessTokenAssertion: string,
  creds: ServiceCredentials,
  responseCode = 200
) {
  return nock(uri)
    .post('/oauth/token', {
      client_id: creds.clientid,
      client_secret: creds.clientsecret,
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: accessTokenAssertion,
      response_type: 'token'
    })
    .times(times)
    .reply(responseCode, accessTokenResponse);
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
    reqheaders: xsuaaRequestHeaders({
      authorization: basicHeader(clientId, clientSecret)
    })
  })
    .post('/oauth/token', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
    .reply(responseCode, response);
}

function xsuaaRequestHeaders(additionalHeaders: Record<string, string> = {}) {
  return {
    Accept: 'application/json',
    ...additionalHeaders
  };
}
