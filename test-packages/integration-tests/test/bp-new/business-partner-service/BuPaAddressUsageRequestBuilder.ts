/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Moment } from 'moment';
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { BuPaAddressUsage } from './BuPaAddressUsage';

/**
 * Request builder class for operations supported on the [[BuPaAddressUsage]] entity.
 */
export class BuPaAddressUsageRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<BuPaAddressUsage<T>, T> {
  /**
   * Returns a request builder for retrieving one `BuPaAddressUsage` entity based on its keys.
   * @param businessPartner Key property. See [[BuPaAddressUsage.businessPartner]].
   * @param validityEndDate Key property. See [[BuPaAddressUsage.validityEndDate]].
   * @param addressUsage Key property. See [[BuPaAddressUsage.addressUsage]].
   * @param addressId Key property. See [[BuPaAddressUsage.addressId]].
   * @returns A request builder for creating requests to retrieve one `BuPaAddressUsage` entity based on its keys.
   */
  getByKey(businessPartner: DeserializedType<T, 'Edm.String'>, validityEndDate: DeserializedType<T, 'Edm.DateTimeOffset'>, addressUsage: DeserializedType<T, 'Edm.String'>, addressId: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<BuPaAddressUsage<T>, T> {
    return new GetByKeyRequestBuilder<BuPaAddressUsage<T>, T>(this.entityApi, {
      BusinessPartner: businessPartner,
      ValidityEndDate: validityEndDate,
      AddressUsage: addressUsage,
      AddressID: addressId
    });
  }

  /**
   * Returns a request builder for querying all `BuPaAddressUsage` entities.
   * @returns A request builder for creating requests to retrieve all `BuPaAddressUsage` entities.
   */
  getAll(): GetAllRequestBuilder<BuPaAddressUsage<T>, T> {
    return new GetAllRequestBuilder<BuPaAddressUsage<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `BuPaAddressUsage` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `BuPaAddressUsage`.
   */
  create(entity: BuPaAddressUsage<T>): CreateRequestBuilder<BuPaAddressUsage<T>, T> {
    return new CreateRequestBuilder<BuPaAddressUsage<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `BuPaAddressUsage`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `BuPaAddressUsage`.
   */
  update(entity: BuPaAddressUsage<T>): UpdateRequestBuilder<BuPaAddressUsage<T>, T> {
    return new UpdateRequestBuilder<BuPaAddressUsage<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `BuPaAddressUsage`.
   * @param businessPartner Key property. See [[BuPaAddressUsage.businessPartner]].
   * @param validityEndDate Key property. See [[BuPaAddressUsage.validityEndDate]].
   * @param addressUsage Key property. See [[BuPaAddressUsage.addressUsage]].
   * @param addressId Key property. See [[BuPaAddressUsage.addressId]].
   * @returns A request builder for creating requests that delete an entity of type `BuPaAddressUsage`.
   */
  delete(businessPartner: string, validityEndDate: Moment, addressUsage: string, addressId: string): DeleteRequestBuilder<BuPaAddressUsage<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `BuPaAddressUsage`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `BuPaAddressUsage` by taking the entity as a parameter.
   */
  delete(entity: BuPaAddressUsage<T>): DeleteRequestBuilder<BuPaAddressUsage<T>, T>;
  delete(businessPartnerOrEntity: any, validityEndDate?: Moment, addressUsage?: string, addressId?: string): DeleteRequestBuilder<BuPaAddressUsage<T>, T> {
    return new DeleteRequestBuilder<BuPaAddressUsage<T>, T>(this.entityApi, businessPartnerOrEntity instanceof BuPaAddressUsage ? businessPartnerOrEntity : {
      BusinessPartner: businessPartnerOrEntity!,
      ValidityEndDate: validityEndDate!,
      AddressUsage: addressUsage!,
      AddressID: addressId!
    });
  }
}
