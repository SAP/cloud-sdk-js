import { expectError, expectType } from 'tsd';
import {
  HttpResponse,
  executeHttpRequest,
  executeHttpRequestWithOrigin
} from '@sap-cloud-sdk/http-client';
import { ServiceBindingTransformFunction } from '@sap-cloud-sdk/connectivity';

expectType<Promise<HttpResponse>>(
  executeHttpRequest(
    { url: 'https://example.com', authentication: 'BasicAuthentication' },
    { method: 'get', url: '/test' }
  )
);

expectType<Promise<HttpResponse>>(
  executeHttpRequest(
    { destinationName: 'myDestinationName', jwt: 'testJwt' },
    { method: 'get', url: '/test' }
  )
);

const serviceBindingTransformFn: ServiceBindingTransformFunction =
  async serviceBinding => ({
    url: serviceBinding.credentials.sys
  });

expectType<Promise<HttpResponse>>(
  executeHttpRequest(
    { destinationName: 'myDestination', serviceBindingTransformFn },
    { method: 'get', url: '/test' }
  )
);

expectError<any>(
  executeHttpRequest(
    { url: 'https://example.com', destinationName: 'myDestinationName' },
    { method: 'get' }
  )
);

expectType<Promise<HttpResponse>>(
  executeHttpRequest(
    { destinationName: 'dest' },
    {
      method: 'get',
      url: '/test',
      headers: { authorization: 'customAuth' },
      params: { myParam: 'customParam' }
    }
  )
);

expectType<Promise<HttpResponse>>(
  executeHttpRequestWithOrigin(
    { destinationName: 'dest' },
    {
      method: 'get',
      url: '/test',
      headers: { requestConfig: { authorization: 'defaultAuth' } },
      params: { requestConfig: { myParam: 'defaultParam' } }
    }
  )
);

expectError<Promise<HttpResponse>>(
  executeHttpRequest({ destinationName: 'dest' }, { method: 'get' })
);
