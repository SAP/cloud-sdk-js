/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { BusinessPartner } from './BusinessPartner';

/**
 * Request builder class for operations supported on the [[BusinessPartner]] entity.
 */
export class BusinessPartnerRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<BusinessPartner<T>, T> {
  /**
   * Returns a request builder for retrieving one `BusinessPartner` entity based on its keys.
   * @param businessPartner Key property. See [[BusinessPartner.businessPartner]].
   * @returns A request builder for creating requests to retrieve one `BusinessPartner` entity based on its keys.
   */
  getByKey(businessPartner: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<BusinessPartner<T>, T> {
    return new GetByKeyRequestBuilder<BusinessPartner<T>, T>(this.entityApi, { BusinessPartner: businessPartner });
  }

  /**
   * Returns a request builder for querying all `BusinessPartner` entities.
   * @returns A request builder for creating requests to retrieve all `BusinessPartner` entities.
   */
  getAll(): GetAllRequestBuilder<BusinessPartner<T>, T> {
    return new GetAllRequestBuilder<BusinessPartner<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `BusinessPartner` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `BusinessPartner`.
   */
  create(entity: BusinessPartner<T>): CreateRequestBuilder<BusinessPartner<T>, T> {
    return new CreateRequestBuilder<BusinessPartner<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `BusinessPartner`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `BusinessPartner`.
   */
  update(entity: BusinessPartner<T>): UpdateRequestBuilder<BusinessPartner<T>, T> {
    return new UpdateRequestBuilder<BusinessPartner<T>, T>(this.entityApi, entity);
  }
}
