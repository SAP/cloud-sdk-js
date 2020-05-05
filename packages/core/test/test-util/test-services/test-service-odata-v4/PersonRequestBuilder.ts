import {
  RequestBuilder,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  RequestBuilderODataV4, GetByKeyRequestBuilderODataV4, GetAllRequestBuilderODataV4
} from '../../../../src';
import { Person } from './Person';

export class PersonRequestBuilder extends RequestBuilderODataV4<Person> {

  getByKey(keyPropertyGuid: string, keyPropertyString: string): GetByKeyRequestBuilderODataV4<Person> {
    return new GetByKeyRequestBuilderODataV4(Person, {
      KeyPropertyGuid: keyPropertyGuid,
      KeyPropertyString: keyPropertyString
    });
  }

  getAll(): GetAllRequestBuilderODataV4<Person> {
    return new GetAllRequestBuilderODataV4(Person);
  }
}
