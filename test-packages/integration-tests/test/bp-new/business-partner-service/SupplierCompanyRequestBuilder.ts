/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { SupplierCompany } from './SupplierCompany';

/**
 * Request builder class for operations supported on the [[SupplierCompany]] entity.
 */
export class SupplierCompanyRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<SupplierCompany<T>, T> {
  /**
   * Returns a request builder for retrieving one `SupplierCompany` entity based on its keys.
   * @param supplier Key property. See [[SupplierCompany.supplier]].
   * @param companyCode Key property. See [[SupplierCompany.companyCode]].
   * @returns A request builder for creating requests to retrieve one `SupplierCompany` entity based on its keys.
   */
  getByKey(supplier: DeserializedType<T, 'Edm.String'>, companyCode: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<SupplierCompany<T>, T> {
    return new GetByKeyRequestBuilder<SupplierCompany<T>, T>(this.entityApi, {
      Supplier: supplier,
      CompanyCode: companyCode
    });
  }

  /**
   * Returns a request builder for querying all `SupplierCompany` entities.
   * @returns A request builder for creating requests to retrieve all `SupplierCompany` entities.
   */
  getAll(): GetAllRequestBuilder<SupplierCompany<T>, T> {
    return new GetAllRequestBuilder<SupplierCompany<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `SupplierCompany` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `SupplierCompany`.
   */
  create(entity: SupplierCompany<T>): CreateRequestBuilder<SupplierCompany<T>, T> {
    return new CreateRequestBuilder<SupplierCompany<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `SupplierCompany`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `SupplierCompany`.
   */
  update(entity: SupplierCompany<T>): UpdateRequestBuilder<SupplierCompany<T>, T> {
    return new UpdateRequestBuilder<SupplierCompany<T>, T>(this.entityApi, entity);
  }
}
