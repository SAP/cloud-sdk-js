import nock from 'nock';
import { basicHeader } from '../../../connectivity/src/scp-cf/authorization-header';
import { ServiceCredentials } from '../../../connectivity/src/scp-cf/environment-accessor-types';

export function mockClientCredentialsGrantCall(
  uri: string,
  response: any,
  responseCode: number,
  serviceCredentials: ServiceCredentials
) {
  return nock(uri, {
    reqheaders: xsuaaRequestHeaders()
  })
    .post('/oauth/token', {
      grant_type: 'client_credentials',
      client_id: serviceCredentials.clientid,
      client_secret: serviceCredentials.clientsecret,
      response_type: 'token'
    })
    .reply(responseCode, response);
}

export function mockClientCredentialsGrantWithCertCall(
  uri: string,
  response: any,
  responseCode: number,
  serviceCredentials: ServiceCredentials
) {
  return nock(uri, {
    reqheaders: xsuaaRequestHeaders()
  })
    .post('/oauth/token', {
      grant_type: 'client_credentials',
      client_id: serviceCredentials.clientid,
      response_type: 'token'
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
  response: any,
  responseCode: number,
  accessToken: string,
  clientId: string
) {
  return nock(uri, {
    reqheaders: xsuaaRequestHeaders({ authorization: `Bearer ${accessToken}` })
  })
    .post('/oauth/token', {
      client_id: clientId,
      grant_type: 'user_token',
      response_type: 'token'
    })
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
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    ...additionalHeaders
  };
}
