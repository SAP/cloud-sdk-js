/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { SupplierCompanyText } from './SupplierCompanyText';

/**
 * Request builder class for operations supported on the [[SupplierCompanyText]] entity.
 */
export class SupplierCompanyTextRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<SupplierCompanyText<T>, T> {
  /**
   * Returns a request builder for retrieving one `SupplierCompanyText` entity based on its keys.
   * @param supplier Key property. See [[SupplierCompanyText.supplier]].
   * @param companyCode Key property. See [[SupplierCompanyText.companyCode]].
   * @param language Key property. See [[SupplierCompanyText.language]].
   * @param longTextId Key property. See [[SupplierCompanyText.longTextId]].
   * @returns A request builder for creating requests to retrieve one `SupplierCompanyText` entity based on its keys.
   */
  getByKey(supplier: DeserializedType<T, 'Edm.String'>, companyCode: DeserializedType<T, 'Edm.String'>, language: DeserializedType<T, 'Edm.String'>, longTextId: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<SupplierCompanyText<T>, T> {
    return new GetByKeyRequestBuilder<SupplierCompanyText<T>, T>(this.entityApi, {
      Supplier: supplier,
      CompanyCode: companyCode,
      Language: language,
      LongTextID: longTextId
    });
  }

  /**
   * Returns a request builder for querying all `SupplierCompanyText` entities.
   * @returns A request builder for creating requests to retrieve all `SupplierCompanyText` entities.
   */
  getAll(): GetAllRequestBuilder<SupplierCompanyText<T>, T> {
    return new GetAllRequestBuilder<SupplierCompanyText<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `SupplierCompanyText` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `SupplierCompanyText`.
   */
  create(entity: SupplierCompanyText<T>): CreateRequestBuilder<SupplierCompanyText<T>, T> {
    return new CreateRequestBuilder<SupplierCompanyText<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `SupplierCompanyText`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `SupplierCompanyText`.
   */
  update(entity: SupplierCompanyText<T>): UpdateRequestBuilder<SupplierCompanyText<T>, T> {
    return new UpdateRequestBuilder<SupplierCompanyText<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `SupplierCompanyText`.
   * @param supplier Key property. See [[SupplierCompanyText.supplier]].
   * @param companyCode Key property. See [[SupplierCompanyText.companyCode]].
   * @param language Key property. See [[SupplierCompanyText.language]].
   * @param longTextId Key property. See [[SupplierCompanyText.longTextId]].
   * @returns A request builder for creating requests that delete an entity of type `SupplierCompanyText`.
   */
  delete(supplier: string, companyCode: string, language: string, longTextId: string): DeleteRequestBuilder<SupplierCompanyText<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `SupplierCompanyText`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `SupplierCompanyText` by taking the entity as a parameter.
   */
  delete(entity: SupplierCompanyText<T>): DeleteRequestBuilder<SupplierCompanyText<T>, T>;
  delete(supplierOrEntity: any, companyCode?: string, language?: string, longTextId?: string): DeleteRequestBuilder<SupplierCompanyText<T>, T> {
    return new DeleteRequestBuilder<SupplierCompanyText<T>, T>(this.entityApi, supplierOrEntity instanceof SupplierCompanyText ? supplierOrEntity : {
      Supplier: supplierOrEntity!,
      CompanyCode: companyCode!,
      Language: language!,
      LongTextID: longTextId!
    });
  }
}
