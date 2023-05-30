import { breakfastEntity } from '../../../test/test-util/data-model';
import { requestBuilderImportDeclarations } from './imports';

describe('imports', () => {
  it('importDeclarations', () => {
    const actual = requestBuilderImportDeclarations(breakfastEntity, 'v2');
    expect(actual).toEqual([
      {
        moduleIdentifier: '@sap-cloud-sdk/odata-v2',
        names: [
          'Entity',
          'DefaultDeSerializers',
          'DeSerializers',
          'GetAllRequestBuilder',
          'GetByKeyRequestBuilder',
          'CreateRequestBuilder',
          'UpdateRequestBuilder',
          'DeserializedType',
          'RequestBuilder',
          'Time'
        ]
      },
      {
        names: ['Breakfast'],
        moduleIdentifier: './Breakfast'
      }
    ]);
  });
});
