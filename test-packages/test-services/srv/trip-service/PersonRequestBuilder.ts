import { Person } from './Person';
import { RequestBuilder } from '@sap-cloud-sdk/core/src/odata/common/request-builder';
import { GetAllRequestBuilder } from '@sap-cloud-sdk/core/src/odata/v4/request-builder';

export class PersonRequestBuilder extends RequestBuilder<Person> {
  getAll(): GetAllRequestBuilder<Person> {
    return new GetAllRequestBuilder(Person);
  }
}
