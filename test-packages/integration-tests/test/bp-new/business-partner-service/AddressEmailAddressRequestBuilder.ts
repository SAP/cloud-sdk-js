/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { AddressEmailAddress } from './AddressEmailAddress';

/**
 * Request builder class for operations supported on the [[AddressEmailAddress]] entity.
 */
export class AddressEmailAddressRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<AddressEmailAddress<T>, T> {
  /**
   * Returns a request builder for retrieving one `AddressEmailAddress` entity based on its keys.
   * @param addressId Key property. See [[AddressEmailAddress.addressId]].
   * @param person Key property. See [[AddressEmailAddress.person]].
   * @param ordinalNumber Key property. See [[AddressEmailAddress.ordinalNumber]].
   * @returns A request builder for creating requests to retrieve one `AddressEmailAddress` entity based on its keys.
   */
  getByKey(addressId: DeserializedType<T, 'Edm.String'>, person: DeserializedType<T, 'Edm.String'>, ordinalNumber: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<AddressEmailAddress<T>, T> {
    return new GetByKeyRequestBuilder<AddressEmailAddress<T>, T>(this.entityApi, {
      AddressID: addressId,
      Person: person,
      OrdinalNumber: ordinalNumber
    });
  }

  /**
   * Returns a request builder for querying all `AddressEmailAddress` entities.
   * @returns A request builder for creating requests to retrieve all `AddressEmailAddress` entities.
   */
  getAll(): GetAllRequestBuilder<AddressEmailAddress<T>, T> {
    return new GetAllRequestBuilder<AddressEmailAddress<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `AddressEmailAddress` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `AddressEmailAddress`.
   */
  create(entity: AddressEmailAddress<T>): CreateRequestBuilder<AddressEmailAddress<T>, T> {
    return new CreateRequestBuilder<AddressEmailAddress<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `AddressEmailAddress`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `AddressEmailAddress`.
   */
  update(entity: AddressEmailAddress<T>): UpdateRequestBuilder<AddressEmailAddress<T>, T> {
    return new UpdateRequestBuilder<AddressEmailAddress<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `AddressEmailAddress`.
   * @param addressId Key property. See [[AddressEmailAddress.addressId]].
   * @param person Key property. See [[AddressEmailAddress.person]].
   * @param ordinalNumber Key property. See [[AddressEmailAddress.ordinalNumber]].
   * @returns A request builder for creating requests that delete an entity of type `AddressEmailAddress`.
   */
  delete(addressId: string, person: string, ordinalNumber: string): DeleteRequestBuilder<AddressEmailAddress<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `AddressEmailAddress`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `AddressEmailAddress` by taking the entity as a parameter.
   */
  delete(entity: AddressEmailAddress<T>): DeleteRequestBuilder<AddressEmailAddress<T>, T>;
  delete(addressIdOrEntity: any, person?: string, ordinalNumber?: string): DeleteRequestBuilder<AddressEmailAddress<T>, T> {
    return new DeleteRequestBuilder<AddressEmailAddress<T>, T>(this.entityApi, addressIdOrEntity instanceof AddressEmailAddress ? addressIdOrEntity : {
      AddressID: addressIdOrEntity!,
      Person: person!,
      OrdinalNumber: ordinalNumber!
    });
  }
}
