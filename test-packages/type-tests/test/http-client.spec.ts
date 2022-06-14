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

const serviceBindingTransformFn = async serviceBinding => ({
  url: serviceBinding.credentials.sys
});

// $ExpectType Promise<HttpResponse>
executeHttpRequest(
  { destinationName: 'myDestination', serviceBindingTransformFn },
  { method: 'get' }
);

executeHttpRequest(
  // $ExpectError
  { url: 'https://example.com', destinationName: 'myDestinationName' },
  { method: 'get' }
);
