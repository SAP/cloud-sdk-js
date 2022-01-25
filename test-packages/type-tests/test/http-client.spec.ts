import { executeHttpRequest } from '@sap-cloud-sdk/http-client';

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

// $ExpectError
executeHttpRequest(
  { url: 'https://example.com', destinationName: 'myDestinationName' },
  { method: 'get' }
);
