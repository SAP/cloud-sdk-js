import {
  executeHttpRequest,
  executeHttpRequestReturnAxiosResponse
} from '@sap-cloud-sdk/core';

// $ExpectType Promise<HttpResponse>
executeHttpRequest({ url: 'https://example.com' }, { method: 'get' });

// $ExpectType Promise<AxiosResponse>
executeHttpRequestReturnAxiosResponse({ url: 'https://example.com' }, { method: 'get' });
