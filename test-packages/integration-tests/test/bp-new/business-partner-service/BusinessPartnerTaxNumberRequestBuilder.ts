/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { BusinessPartnerTaxNumber } from './BusinessPartnerTaxNumber';

/**
 * Request builder class for operations supported on the [[BusinessPartnerTaxNumber]] entity.
 */
export class BusinessPartnerTaxNumberRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<BusinessPartnerTaxNumber<T>, T> {
  /**
   * Returns a request builder for retrieving one `BusinessPartnerTaxNumber` entity based on its keys.
   * @param businessPartner Key property. See [[BusinessPartnerTaxNumber.businessPartner]].
   * @param bpTaxType Key property. See [[BusinessPartnerTaxNumber.bpTaxType]].
   * @returns A request builder for creating requests to retrieve one `BusinessPartnerTaxNumber` entity based on its keys.
   */
  getByKey(businessPartner: DeserializedType<T, 'Edm.String'>, bpTaxType: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<BusinessPartnerTaxNumber<T>, T> {
    return new GetByKeyRequestBuilder<BusinessPartnerTaxNumber<T>, T>(this.entityApi, {
      BusinessPartner: businessPartner,
      BPTaxType: bpTaxType
    });
  }

  /**
   * Returns a request builder for querying all `BusinessPartnerTaxNumber` entities.
   * @returns A request builder for creating requests to retrieve all `BusinessPartnerTaxNumber` entities.
   */
  getAll(): GetAllRequestBuilder<BusinessPartnerTaxNumber<T>, T> {
    return new GetAllRequestBuilder<BusinessPartnerTaxNumber<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `BusinessPartnerTaxNumber` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `BusinessPartnerTaxNumber`.
   */
  create(entity: BusinessPartnerTaxNumber<T>): CreateRequestBuilder<BusinessPartnerTaxNumber<T>, T> {
    return new CreateRequestBuilder<BusinessPartnerTaxNumber<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `BusinessPartnerTaxNumber`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `BusinessPartnerTaxNumber`.
   */
  update(entity: BusinessPartnerTaxNumber<T>): UpdateRequestBuilder<BusinessPartnerTaxNumber<T>, T> {
    return new UpdateRequestBuilder<BusinessPartnerTaxNumber<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `BusinessPartnerTaxNumber`.
   * @param businessPartner Key property. See [[BusinessPartnerTaxNumber.businessPartner]].
   * @param bpTaxType Key property. See [[BusinessPartnerTaxNumber.bpTaxType]].
   * @returns A request builder for creating requests that delete an entity of type `BusinessPartnerTaxNumber`.
   */
  delete(businessPartner: string, bpTaxType: string): DeleteRequestBuilder<BusinessPartnerTaxNumber<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `BusinessPartnerTaxNumber`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `BusinessPartnerTaxNumber` by taking the entity as a parameter.
   */
  delete(entity: BusinessPartnerTaxNumber<T>): DeleteRequestBuilder<BusinessPartnerTaxNumber<T>, T>;
  delete(businessPartnerOrEntity: any, bpTaxType?: string): DeleteRequestBuilder<BusinessPartnerTaxNumber<T>, T> {
    return new DeleteRequestBuilder<BusinessPartnerTaxNumber<T>, T>(this.entityApi, businessPartnerOrEntity instanceof BusinessPartnerTaxNumber ? businessPartnerOrEntity : {
      BusinessPartner: businessPartnerOrEntity!,
      BPTaxType: bpTaxType!
    });
  }
}
