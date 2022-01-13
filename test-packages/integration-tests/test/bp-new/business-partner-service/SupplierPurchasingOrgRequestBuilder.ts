/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { SupplierPurchasingOrg } from './SupplierPurchasingOrg';

/**
 * Request builder class for operations supported on the [[SupplierPurchasingOrg]] entity.
 */
export class SupplierPurchasingOrgRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<SupplierPurchasingOrg<T>, T> {
  /**
   * Returns a request builder for retrieving one `SupplierPurchasingOrg` entity based on its keys.
   * @param supplier Key property. See [[SupplierPurchasingOrg.supplier]].
   * @param purchasingOrganization Key property. See [[SupplierPurchasingOrg.purchasingOrganization]].
   * @returns A request builder for creating requests to retrieve one `SupplierPurchasingOrg` entity based on its keys.
   */
  getByKey(supplier: DeserializedType<T, 'Edm.String'>, purchasingOrganization: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<SupplierPurchasingOrg<T>, T> {
    return new GetByKeyRequestBuilder<SupplierPurchasingOrg<T>, T>(this.entityApi, {
      Supplier: supplier,
      PurchasingOrganization: purchasingOrganization
    });
  }

  /**
   * Returns a request builder for querying all `SupplierPurchasingOrg` entities.
   * @returns A request builder for creating requests to retrieve all `SupplierPurchasingOrg` entities.
   */
  getAll(): GetAllRequestBuilder<SupplierPurchasingOrg<T>, T> {
    return new GetAllRequestBuilder<SupplierPurchasingOrg<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `SupplierPurchasingOrg` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `SupplierPurchasingOrg`.
   */
  create(entity: SupplierPurchasingOrg<T>): CreateRequestBuilder<SupplierPurchasingOrg<T>, T> {
    return new CreateRequestBuilder<SupplierPurchasingOrg<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `SupplierPurchasingOrg`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `SupplierPurchasingOrg`.
   */
  update(entity: SupplierPurchasingOrg<T>): UpdateRequestBuilder<SupplierPurchasingOrg<T>, T> {
    return new UpdateRequestBuilder<SupplierPurchasingOrg<T>, T>(this.entityApi, entity);
  }
}
