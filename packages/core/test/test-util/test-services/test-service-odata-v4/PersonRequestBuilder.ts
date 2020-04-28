import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder } from '../../../../src';
import { Person } from './Person';

export class PersonRequestBuilder extends RequestBuilder<Person> {

  getByKey(keyPropertyGuid: string, keyPropertyString: string): GetByKeyRequestBuilder<Person> {
    return new GetByKeyRequestBuilder(Person, {
      KeyPropertyGuid: keyPropertyGuid,
      KeyPropertyString: keyPropertyString
    });
  }

  getAll(): GetAllRequestBuilder<Person> {
    return new GetAllRequestBuilder(Person);
  }

  create(entity: Person): CreateRequestBuilder<Person> {
    return new CreateRequestBuilder(Person, entity);
  }

  update(entity: Person): UpdateRequestBuilder<Person> {
    return new UpdateRequestBuilder(Person, entity);
  }
}
