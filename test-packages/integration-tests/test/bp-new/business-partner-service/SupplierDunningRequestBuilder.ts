/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { SupplierDunning } from './SupplierDunning';

/**
 * Request builder class for operations supported on the [[SupplierDunning]] entity.
 */
export class SupplierDunningRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<SupplierDunning<T>, T> {
  /**
   * Returns a request builder for retrieving one `SupplierDunning` entity based on its keys.
   * @param supplier Key property. See [[SupplierDunning.supplier]].
   * @param companyCode Key property. See [[SupplierDunning.companyCode]].
   * @param dunningArea Key property. See [[SupplierDunning.dunningArea]].
   * @returns A request builder for creating requests to retrieve one `SupplierDunning` entity based on its keys.
   */
  getByKey(supplier: DeserializedType<T, 'Edm.String'>, companyCode: DeserializedType<T, 'Edm.String'>, dunningArea: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<SupplierDunning<T>, T> {
    return new GetByKeyRequestBuilder<SupplierDunning<T>, T>(this.entityApi, {
      Supplier: supplier,
      CompanyCode: companyCode,
      DunningArea: dunningArea
    });
  }

  /**
   * Returns a request builder for querying all `SupplierDunning` entities.
   * @returns A request builder for creating requests to retrieve all `SupplierDunning` entities.
   */
  getAll(): GetAllRequestBuilder<SupplierDunning<T>, T> {
    return new GetAllRequestBuilder<SupplierDunning<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `SupplierDunning` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `SupplierDunning`.
   */
  create(entity: SupplierDunning<T>): CreateRequestBuilder<SupplierDunning<T>, T> {
    return new CreateRequestBuilder<SupplierDunning<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `SupplierDunning`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `SupplierDunning`.
   */
  update(entity: SupplierDunning<T>): UpdateRequestBuilder<SupplierDunning<T>, T> {
    return new UpdateRequestBuilder<SupplierDunning<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `SupplierDunning`.
   * @param supplier Key property. See [[SupplierDunning.supplier]].
   * @param companyCode Key property. See [[SupplierDunning.companyCode]].
   * @param dunningArea Key property. See [[SupplierDunning.dunningArea]].
   * @returns A request builder for creating requests that delete an entity of type `SupplierDunning`.
   */
  delete(supplier: string, companyCode: string, dunningArea: string): DeleteRequestBuilder<SupplierDunning<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `SupplierDunning`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `SupplierDunning` by taking the entity as a parameter.
   */
  delete(entity: SupplierDunning<T>): DeleteRequestBuilder<SupplierDunning<T>, T>;
  delete(supplierOrEntity: any, companyCode?: string, dunningArea?: string): DeleteRequestBuilder<SupplierDunning<T>, T> {
    return new DeleteRequestBuilder<SupplierDunning<T>, T>(this.entityApi, supplierOrEntity instanceof SupplierDunning ? supplierOrEntity : {
      Supplier: supplierOrEntity!,
      CompanyCode: companyCode!,
      DunningArea: dunningArea!
    });
  }
}
