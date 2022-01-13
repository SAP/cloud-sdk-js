/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { BusinessPartnerRole } from './BusinessPartnerRole';

/**
 * Request builder class for operations supported on the [[BusinessPartnerRole]] entity.
 */
export class BusinessPartnerRoleRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<BusinessPartnerRole<T>, T> {
  /**
   * Returns a request builder for retrieving one `BusinessPartnerRole` entity based on its keys.
   * @param businessPartner Key property. See [[BusinessPartnerRole.businessPartner]].
   * @param businessPartnerRole Key property. See [[BusinessPartnerRole.businessPartnerRole]].
   * @returns A request builder for creating requests to retrieve one `BusinessPartnerRole` entity based on its keys.
   */
  getByKey(businessPartner: DeserializedType<T, 'Edm.String'>, businessPartnerRole: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<BusinessPartnerRole<T>, T> {
    return new GetByKeyRequestBuilder<BusinessPartnerRole<T>, T>(this.entityApi, {
      BusinessPartner: businessPartner,
      BusinessPartnerRole: businessPartnerRole
    });
  }

  /**
   * Returns a request builder for querying all `BusinessPartnerRole` entities.
   * @returns A request builder for creating requests to retrieve all `BusinessPartnerRole` entities.
   */
  getAll(): GetAllRequestBuilder<BusinessPartnerRole<T>, T> {
    return new GetAllRequestBuilder<BusinessPartnerRole<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `BusinessPartnerRole` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `BusinessPartnerRole`.
   */
  create(entity: BusinessPartnerRole<T>): CreateRequestBuilder<BusinessPartnerRole<T>, T> {
    return new CreateRequestBuilder<BusinessPartnerRole<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `BusinessPartnerRole`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `BusinessPartnerRole`.
   */
  update(entity: BusinessPartnerRole<T>): UpdateRequestBuilder<BusinessPartnerRole<T>, T> {
    return new UpdateRequestBuilder<BusinessPartnerRole<T>, T>(this.entityApi, entity);
  }
}
