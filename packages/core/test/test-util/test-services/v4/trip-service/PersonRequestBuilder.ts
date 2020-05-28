import { Person } from './Person';
import { RequestBuilder } from '../../../../../src/odata/common/request-builder';
import { GetAllRequestBuilder } from '../../../../../src/odata/v4/request-builder';

export class PersonRequestBuilder extends RequestBuilder<Person> {
  getAll(): GetAllRequestBuilder<Person> {
    return new GetAllRequestBuilder(Person);
  }
}
