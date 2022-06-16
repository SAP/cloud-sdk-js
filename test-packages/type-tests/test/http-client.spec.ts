import {
  executeHttpRequest,
  executeHttpRequestWithOrigin
} from '@sap-cloud-sdk/http-client';

// $ExpectType Promise<HttpResponse>
executeHttpRequest(
  { url: 'https://example.com', authentication: 'BasicAuthentication' },
  { method: 'get' }
);

// $ExpectType Promise<HttpResponse>
executeHttpRequest(
  { destinationName: 'myDestinationName', jwt: 'testJwt' },
  { method: 'get' }
);

executeHttpRequest(
  // $ExpectError
  { url: 'https://example.com', destinationName: 'myDestinationName' },
  { method: 'get' }
);

// $ExpectType Promise<HttpResponse>
executeHttpRequest(
  { destinationName: 'dest' },
  {
    method: 'get',
    headers: { authorization: 'customAuth' },
    params: { myParam: 'customParam' }
  }
);

// $ExpectType Promise<HttpResponse>
executeHttpRequestWithOrigin(
  { destinationName: 'dest' },
  {
    method: 'get',
    headers: { requestConfig: { authorization: 'defaultAuth' } },
    params: { requestConfig: { myParam: 'defaultParam' } }
  }
);
