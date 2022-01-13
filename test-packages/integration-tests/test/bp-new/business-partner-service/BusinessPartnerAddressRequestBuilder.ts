/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { BusinessPartnerAddress } from './BusinessPartnerAddress';

/**
 * Request builder class for operations supported on the [[BusinessPartnerAddress]] entity.
 */
export class BusinessPartnerAddressRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<BusinessPartnerAddress<T>, T> {
  /**
   * Returns a request builder for retrieving one `BusinessPartnerAddress` entity based on its keys.
   * @param businessPartner Key property. See [[BusinessPartnerAddress.businessPartner]].
   * @param addressId Key property. See [[BusinessPartnerAddress.addressId]].
   * @returns A request builder for creating requests to retrieve one `BusinessPartnerAddress` entity based on its keys.
   */
  getByKey(businessPartner: DeserializedType<T, 'Edm.String'>, addressId: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<BusinessPartnerAddress<T>, T> {
    return new GetByKeyRequestBuilder<BusinessPartnerAddress<T>, T>(this.entityApi, {
      BusinessPartner: businessPartner,
      AddressID: addressId
    });
  }

  /**
   * Returns a request builder for querying all `BusinessPartnerAddress` entities.
   * @returns A request builder for creating requests to retrieve all `BusinessPartnerAddress` entities.
   */
  getAll(): GetAllRequestBuilder<BusinessPartnerAddress<T>, T> {
    return new GetAllRequestBuilder<BusinessPartnerAddress<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `BusinessPartnerAddress` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `BusinessPartnerAddress`.
   */
  create(entity: BusinessPartnerAddress<T>): CreateRequestBuilder<BusinessPartnerAddress<T>, T> {
    return new CreateRequestBuilder<BusinessPartnerAddress<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `BusinessPartnerAddress`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `BusinessPartnerAddress`.
   */
  update(entity: BusinessPartnerAddress<T>): UpdateRequestBuilder<BusinessPartnerAddress<T>, T> {
    return new UpdateRequestBuilder<BusinessPartnerAddress<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `BusinessPartnerAddress`.
   * @param businessPartner Key property. See [[BusinessPartnerAddress.businessPartner]].
   * @param addressId Key property. See [[BusinessPartnerAddress.addressId]].
   * @returns A request builder for creating requests that delete an entity of type `BusinessPartnerAddress`.
   */
  delete(businessPartner: string, addressId: string): DeleteRequestBuilder<BusinessPartnerAddress<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `BusinessPartnerAddress`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `BusinessPartnerAddress` by taking the entity as a parameter.
   */
  delete(entity: BusinessPartnerAddress<T>): DeleteRequestBuilder<BusinessPartnerAddress<T>, T>;
  delete(businessPartnerOrEntity: any, addressId?: string): DeleteRequestBuilder<BusinessPartnerAddress<T>, T> {
    return new DeleteRequestBuilder<BusinessPartnerAddress<T>, T>(this.entityApi, businessPartnerOrEntity instanceof BusinessPartnerAddress ? businessPartnerOrEntity : {
      BusinessPartner: businessPartnerOrEntity!,
      AddressID: addressId!
    });
  }
}
