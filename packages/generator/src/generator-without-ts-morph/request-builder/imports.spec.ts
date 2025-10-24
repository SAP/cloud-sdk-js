import { breakfastEntity } from '../../../test/test-util/data-model';
import { requestBuilderImportDeclarations } from './imports';

describe('imports', () => {
  it('importDeclarations', () => {
    const actual = requestBuilderImportDeclarations(breakfastEntity, 'v2');
    expect(actual).toEqual([
      {
        moduleIdentifier: '@sap-cloud-sdk/odata-v2',
        names: [
          'CreateRequestBuilder',
          'DeSerializers',
          'DefaultDeSerializers',
          'DeserializedType',
          'GetAllRequestBuilder',
          'GetByKeyRequestBuilder',
          'RequestBuilder',
          'Time',
          'UpdateRequestBuilder'
        ]
      },
      {
        names: ['Breakfast'],
        moduleIdentifier: './Breakfast'
      }
    ]);
  });

  it('importDeclarations with ESM', () => {
    const actual = requestBuilderImportDeclarations(breakfastEntity, 'v2', true);
    expect(actual).toEqual([
      {
        moduleIdentifier: '@sap-cloud-sdk/odata-v2',
        names: [
          'CreateRequestBuilder',
          'DeSerializers',
          'DefaultDeSerializers',
          'DeserializedType',
          'GetAllRequestBuilder',
          'GetByKeyRequestBuilder',
          'RequestBuilder',
          'Time',
          'UpdateRequestBuilder'
        ]
      },
      {
        names: ['Breakfast'],
        moduleIdentifier: './Breakfast.js'
      }
    ]);
  });
});
