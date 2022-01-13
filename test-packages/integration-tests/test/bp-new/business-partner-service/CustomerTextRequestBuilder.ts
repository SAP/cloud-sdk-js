/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { CustomerText } from './CustomerText';

/**
 * Request builder class for operations supported on the [[CustomerText]] entity.
 */
export class CustomerTextRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<CustomerText<T>, T> {
  /**
   * Returns a request builder for retrieving one `CustomerText` entity based on its keys.
   * @param customer Key property. See [[CustomerText.customer]].
   * @param language Key property. See [[CustomerText.language]].
   * @param longTextId Key property. See [[CustomerText.longTextId]].
   * @returns A request builder for creating requests to retrieve one `CustomerText` entity based on its keys.
   */
  getByKey(customer: DeserializedType<T, 'Edm.String'>, language: DeserializedType<T, 'Edm.String'>, longTextId: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<CustomerText<T>, T> {
    return new GetByKeyRequestBuilder<CustomerText<T>, T>(this.entityApi, {
      Customer: customer,
      Language: language,
      LongTextID: longTextId
    });
  }

  /**
   * Returns a request builder for querying all `CustomerText` entities.
   * @returns A request builder for creating requests to retrieve all `CustomerText` entities.
   */
  getAll(): GetAllRequestBuilder<CustomerText<T>, T> {
    return new GetAllRequestBuilder<CustomerText<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `CustomerText` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `CustomerText`.
   */
  create(entity: CustomerText<T>): CreateRequestBuilder<CustomerText<T>, T> {
    return new CreateRequestBuilder<CustomerText<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `CustomerText`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `CustomerText`.
   */
  update(entity: CustomerText<T>): UpdateRequestBuilder<CustomerText<T>, T> {
    return new UpdateRequestBuilder<CustomerText<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `CustomerText`.
   * @param customer Key property. See [[CustomerText.customer]].
   * @param language Key property. See [[CustomerText.language]].
   * @param longTextId Key property. See [[CustomerText.longTextId]].
   * @returns A request builder for creating requests that delete an entity of type `CustomerText`.
   */
  delete(customer: string, language: string, longTextId: string): DeleteRequestBuilder<CustomerText<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `CustomerText`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `CustomerText` by taking the entity as a parameter.
   */
  delete(entity: CustomerText<T>): DeleteRequestBuilder<CustomerText<T>, T>;
  delete(customerOrEntity: any, language?: string, longTextId?: string): DeleteRequestBuilder<CustomerText<T>, T> {
    return new DeleteRequestBuilder<CustomerText<T>, T>(this.entityApi, customerOrEntity instanceof CustomerText ? customerOrEntity : {
      Customer: customerOrEntity!,
      Language: language!,
      LongTextID: longTextId!
    });
  }
}
