import nock from 'nock';
import { basicCredentials } from './destination-encoder';

export function mockCsrfTokenRequest(host: string, sapClient: string, servicePath: string = '/sap/opu/odata/sap/API_TEST_SRV', username: string = 'username', password: string = 'password', csrfToken: string= 'CSRFTOKEN') {
  nock(host, {
    reqheaders: {
      authorization: basicCredentials({ username, password }),
      'x-csrf-token': 'Fetch',
      'sap-client': sapClient
    }
  })
    .get(servicePath)
    .reply(200, '', {
      'x-csrf-token': csrfToken,
      'Set-Cookie': ['key1=val1', 'key2=val2', 'key3=val3']
    });
}
