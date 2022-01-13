/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { SupplierPartnerFunc } from './SupplierPartnerFunc';

/**
 * Request builder class for operations supported on the [[SupplierPartnerFunc]] entity.
 */
export class SupplierPartnerFuncRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<SupplierPartnerFunc<T>, T> {
  /**
   * Returns a request builder for retrieving one `SupplierPartnerFunc` entity based on its keys.
   * @param supplier Key property. See [[SupplierPartnerFunc.supplier]].
   * @param purchasingOrganization Key property. See [[SupplierPartnerFunc.purchasingOrganization]].
   * @param supplierSubrange Key property. See [[SupplierPartnerFunc.supplierSubrange]].
   * @param plant Key property. See [[SupplierPartnerFunc.plant]].
   * @param partnerFunction Key property. See [[SupplierPartnerFunc.partnerFunction]].
   * @param partnerCounter Key property. See [[SupplierPartnerFunc.partnerCounter]].
   * @returns A request builder for creating requests to retrieve one `SupplierPartnerFunc` entity based on its keys.
   */
  getByKey(supplier: DeserializedType<T, 'Edm.String'>, purchasingOrganization: DeserializedType<T, 'Edm.String'>, supplierSubrange: DeserializedType<T, 'Edm.String'>, plant: DeserializedType<T, 'Edm.String'>, partnerFunction: DeserializedType<T, 'Edm.String'>, partnerCounter: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<SupplierPartnerFunc<T>, T> {
    return new GetByKeyRequestBuilder<SupplierPartnerFunc<T>, T>(this.entityApi, {
      Supplier: supplier,
      PurchasingOrganization: purchasingOrganization,
      SupplierSubrange: supplierSubrange,
      Plant: plant,
      PartnerFunction: partnerFunction,
      PartnerCounter: partnerCounter
    });
  }

  /**
   * Returns a request builder for querying all `SupplierPartnerFunc` entities.
   * @returns A request builder for creating requests to retrieve all `SupplierPartnerFunc` entities.
   */
  getAll(): GetAllRequestBuilder<SupplierPartnerFunc<T>, T> {
    return new GetAllRequestBuilder<SupplierPartnerFunc<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `SupplierPartnerFunc` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `SupplierPartnerFunc`.
   */
  create(entity: SupplierPartnerFunc<T>): CreateRequestBuilder<SupplierPartnerFunc<T>, T> {
    return new CreateRequestBuilder<SupplierPartnerFunc<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `SupplierPartnerFunc`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `SupplierPartnerFunc`.
   */
  update(entity: SupplierPartnerFunc<T>): UpdateRequestBuilder<SupplierPartnerFunc<T>, T> {
    return new UpdateRequestBuilder<SupplierPartnerFunc<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `SupplierPartnerFunc`.
   * @param supplier Key property. See [[SupplierPartnerFunc.supplier]].
   * @param purchasingOrganization Key property. See [[SupplierPartnerFunc.purchasingOrganization]].
   * @param supplierSubrange Key property. See [[SupplierPartnerFunc.supplierSubrange]].
   * @param plant Key property. See [[SupplierPartnerFunc.plant]].
   * @param partnerFunction Key property. See [[SupplierPartnerFunc.partnerFunction]].
   * @param partnerCounter Key property. See [[SupplierPartnerFunc.partnerCounter]].
   * @returns A request builder for creating requests that delete an entity of type `SupplierPartnerFunc`.
   */
  delete(supplier: string, purchasingOrganization: string, supplierSubrange: string, plant: string, partnerFunction: string, partnerCounter: string): DeleteRequestBuilder<SupplierPartnerFunc<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `SupplierPartnerFunc`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `SupplierPartnerFunc` by taking the entity as a parameter.
   */
  delete(entity: SupplierPartnerFunc<T>): DeleteRequestBuilder<SupplierPartnerFunc<T>, T>;
  delete(supplierOrEntity: any, purchasingOrganization?: string, supplierSubrange?: string, plant?: string, partnerFunction?: string, partnerCounter?: string): DeleteRequestBuilder<SupplierPartnerFunc<T>, T> {
    return new DeleteRequestBuilder<SupplierPartnerFunc<T>, T>(this.entityApi, supplierOrEntity instanceof SupplierPartnerFunc ? supplierOrEntity : {
      Supplier: supplierOrEntity!,
      PurchasingOrganization: purchasingOrganization!,
      SupplierSubrange: supplierSubrange!,
      Plant: plant!,
      PartnerFunction: partnerFunction!,
      PartnerCounter: partnerCounter!
    });
  }
}
