/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { CustomerCompany } from './CustomerCompany';

/**
 * Request builder class for operations supported on the [[CustomerCompany]] entity.
 */
export class CustomerCompanyRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<CustomerCompany<T>, T> {
  /**
   * Returns a request builder for retrieving one `CustomerCompany` entity based on its keys.
   * @param customer Key property. See [[CustomerCompany.customer]].
   * @param companyCode Key property. See [[CustomerCompany.companyCode]].
   * @returns A request builder for creating requests to retrieve one `CustomerCompany` entity based on its keys.
   */
  getByKey(customer: DeserializedType<T, 'Edm.String'>, companyCode: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<CustomerCompany<T>, T> {
    return new GetByKeyRequestBuilder<CustomerCompany<T>, T>(this.entityApi, {
      Customer: customer,
      CompanyCode: companyCode
    });
  }

  /**
   * Returns a request builder for querying all `CustomerCompany` entities.
   * @returns A request builder for creating requests to retrieve all `CustomerCompany` entities.
   */
  getAll(): GetAllRequestBuilder<CustomerCompany<T>, T> {
    return new GetAllRequestBuilder<CustomerCompany<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `CustomerCompany` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `CustomerCompany`.
   */
  create(entity: CustomerCompany<T>): CreateRequestBuilder<CustomerCompany<T>, T> {
    return new CreateRequestBuilder<CustomerCompany<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `CustomerCompany`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `CustomerCompany`.
   */
  update(entity: CustomerCompany<T>): UpdateRequestBuilder<CustomerCompany<T>, T> {
    return new UpdateRequestBuilder<CustomerCompany<T>, T>(this.entityApi, entity);
  }
}
