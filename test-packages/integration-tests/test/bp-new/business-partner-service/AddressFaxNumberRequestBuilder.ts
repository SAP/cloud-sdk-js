/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { AddressFaxNumber } from './AddressFaxNumber';

/**
 * Request builder class for operations supported on the [[AddressFaxNumber]] entity.
 */
export class AddressFaxNumberRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<AddressFaxNumber<T>, T> {
  /**
   * Returns a request builder for retrieving one `AddressFaxNumber` entity based on its keys.
   * @param addressId Key property. See [[AddressFaxNumber.addressId]].
   * @param person Key property. See [[AddressFaxNumber.person]].
   * @param ordinalNumber Key property. See [[AddressFaxNumber.ordinalNumber]].
   * @returns A request builder for creating requests to retrieve one `AddressFaxNumber` entity based on its keys.
   */
  getByKey(addressId: DeserializedType<T, 'Edm.String'>, person: DeserializedType<T, 'Edm.String'>, ordinalNumber: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<AddressFaxNumber<T>, T> {
    return new GetByKeyRequestBuilder<AddressFaxNumber<T>, T>(this.entityApi, {
      AddressID: addressId,
      Person: person,
      OrdinalNumber: ordinalNumber
    });
  }

  /**
   * Returns a request builder for querying all `AddressFaxNumber` entities.
   * @returns A request builder for creating requests to retrieve all `AddressFaxNumber` entities.
   */
  getAll(): GetAllRequestBuilder<AddressFaxNumber<T>, T> {
    return new GetAllRequestBuilder<AddressFaxNumber<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `AddressFaxNumber` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `AddressFaxNumber`.
   */
  create(entity: AddressFaxNumber<T>): CreateRequestBuilder<AddressFaxNumber<T>, T> {
    return new CreateRequestBuilder<AddressFaxNumber<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `AddressFaxNumber`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `AddressFaxNumber`.
   */
  update(entity: AddressFaxNumber<T>): UpdateRequestBuilder<AddressFaxNumber<T>, T> {
    return new UpdateRequestBuilder<AddressFaxNumber<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `AddressFaxNumber`.
   * @param addressId Key property. See [[AddressFaxNumber.addressId]].
   * @param person Key property. See [[AddressFaxNumber.person]].
   * @param ordinalNumber Key property. See [[AddressFaxNumber.ordinalNumber]].
   * @returns A request builder for creating requests that delete an entity of type `AddressFaxNumber`.
   */
  delete(addressId: string, person: string, ordinalNumber: string): DeleteRequestBuilder<AddressFaxNumber<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `AddressFaxNumber`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `AddressFaxNumber` by taking the entity as a parameter.
   */
  delete(entity: AddressFaxNumber<T>): DeleteRequestBuilder<AddressFaxNumber<T>, T>;
  delete(addressIdOrEntity: any, person?: string, ordinalNumber?: string): DeleteRequestBuilder<AddressFaxNumber<T>, T> {
    return new DeleteRequestBuilder<AddressFaxNumber<T>, T>(this.entityApi, addressIdOrEntity instanceof AddressFaxNumber ? addressIdOrEntity : {
      AddressID: addressIdOrEntity!,
      Person: person!,
      OrdinalNumber: ordinalNumber!
    });
  }
}
