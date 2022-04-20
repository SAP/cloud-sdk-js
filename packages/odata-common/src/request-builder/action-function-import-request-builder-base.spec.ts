import {
  FunctionImportRequestBuilder,
  defaultDeSerializers,
} from '@sap-cloud-sdk/odata-v2';
import { Destination } from '@sap-cloud-sdk/connectivity';
import { HttpResponse } from '@sap-cloud-sdk/http-client';

describe('execute', () => {
  const destination: Destination = {
    url: 'https://example.com',
    username: 'username',
    password: 'password',
    sapClient: '123',
    authTokens: [],
    originalProperties: {}
  };
  
  it('should resolve on the correct response when using data accessor', async () => {
    const requestBuilder = new FunctionImportRequestBuilder(
      'get',
      '/path',
      'functionImportName',
      data => data,
      {},
      defaultDeSerializers
    );

    const requestBuilderSpy = jest.spyOn(requestBuilder, 'executeRaw');

    const response = {
      data: {
        d: {
          Foo: {
            bar: {
              count: 10
            },
            baz: {}
          }
        }
      }
    } as HttpResponse;

    requestBuilderSpy.mockResolvedValue(response);

    const request = requestBuilder.execute(destination, data => data.d.Foo.bar);

    expect(requestBuilderSpy).toBeCalledTimes(1);
    await expect(request).resolves.toEqual({
      d: {
        count: 10
      }
    });
  });
});
