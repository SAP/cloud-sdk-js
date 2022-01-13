/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { SupplierText } from './SupplierText';

/**
 * Request builder class for operations supported on the [[SupplierText]] entity.
 */
export class SupplierTextRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<SupplierText<T>, T> {
  /**
   * Returns a request builder for retrieving one `SupplierText` entity based on its keys.
   * @param supplier Key property. See [[SupplierText.supplier]].
   * @param language Key property. See [[SupplierText.language]].
   * @param longTextId Key property. See [[SupplierText.longTextId]].
   * @returns A request builder for creating requests to retrieve one `SupplierText` entity based on its keys.
   */
  getByKey(supplier: DeserializedType<T, 'Edm.String'>, language: DeserializedType<T, 'Edm.String'>, longTextId: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<SupplierText<T>, T> {
    return new GetByKeyRequestBuilder<SupplierText<T>, T>(this.entityApi, {
      Supplier: supplier,
      Language: language,
      LongTextID: longTextId
    });
  }

  /**
   * Returns a request builder for querying all `SupplierText` entities.
   * @returns A request builder for creating requests to retrieve all `SupplierText` entities.
   */
  getAll(): GetAllRequestBuilder<SupplierText<T>, T> {
    return new GetAllRequestBuilder<SupplierText<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `SupplierText` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `SupplierText`.
   */
  create(entity: SupplierText<T>): CreateRequestBuilder<SupplierText<T>, T> {
    return new CreateRequestBuilder<SupplierText<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `SupplierText`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `SupplierText`.
   */
  update(entity: SupplierText<T>): UpdateRequestBuilder<SupplierText<T>, T> {
    return new UpdateRequestBuilder<SupplierText<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `SupplierText`.
   * @param supplier Key property. See [[SupplierText.supplier]].
   * @param language Key property. See [[SupplierText.language]].
   * @param longTextId Key property. See [[SupplierText.longTextId]].
   * @returns A request builder for creating requests that delete an entity of type `SupplierText`.
   */
  delete(supplier: string, language: string, longTextId: string): DeleteRequestBuilder<SupplierText<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `SupplierText`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `SupplierText` by taking the entity as a parameter.
   */
  delete(entity: SupplierText<T>): DeleteRequestBuilder<SupplierText<T>, T>;
  delete(supplierOrEntity: any, language?: string, longTextId?: string): DeleteRequestBuilder<SupplierText<T>, T> {
    return new DeleteRequestBuilder<SupplierText<T>, T>(this.entityApi, supplierOrEntity instanceof SupplierText ? supplierOrEntity : {
      Supplier: supplierOrEntity!,
      Language: language!,
      LongTextID: longTextId!
    });
  }
}
