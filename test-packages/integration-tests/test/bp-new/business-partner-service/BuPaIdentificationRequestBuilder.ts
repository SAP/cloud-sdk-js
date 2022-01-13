/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { BuPaIdentification } from './BuPaIdentification';

/**
 * Request builder class for operations supported on the [[BuPaIdentification]] entity.
 */
export class BuPaIdentificationRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<BuPaIdentification<T>, T> {
  /**
   * Returns a request builder for retrieving one `BuPaIdentification` entity based on its keys.
   * @param businessPartner Key property. See [[BuPaIdentification.businessPartner]].
   * @param bpIdentificationType Key property. See [[BuPaIdentification.bpIdentificationType]].
   * @param bpIdentificationNumber Key property. See [[BuPaIdentification.bpIdentificationNumber]].
   * @returns A request builder for creating requests to retrieve one `BuPaIdentification` entity based on its keys.
   */
  getByKey(businessPartner: DeserializedType<T, 'Edm.String'>, bpIdentificationType: DeserializedType<T, 'Edm.String'>, bpIdentificationNumber: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<BuPaIdentification<T>, T> {
    return new GetByKeyRequestBuilder<BuPaIdentification<T>, T>(this.entityApi, {
      BusinessPartner: businessPartner,
      BPIdentificationType: bpIdentificationType,
      BPIdentificationNumber: bpIdentificationNumber
    });
  }

  /**
   * Returns a request builder for querying all `BuPaIdentification` entities.
   * @returns A request builder for creating requests to retrieve all `BuPaIdentification` entities.
   */
  getAll(): GetAllRequestBuilder<BuPaIdentification<T>, T> {
    return new GetAllRequestBuilder<BuPaIdentification<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `BuPaIdentification` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `BuPaIdentification`.
   */
  create(entity: BuPaIdentification<T>): CreateRequestBuilder<BuPaIdentification<T>, T> {
    return new CreateRequestBuilder<BuPaIdentification<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `BuPaIdentification`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `BuPaIdentification`.
   */
  update(entity: BuPaIdentification<T>): UpdateRequestBuilder<BuPaIdentification<T>, T> {
    return new UpdateRequestBuilder<BuPaIdentification<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `BuPaIdentification`.
   * @param businessPartner Key property. See [[BuPaIdentification.businessPartner]].
   * @param bpIdentificationType Key property. See [[BuPaIdentification.bpIdentificationType]].
   * @param bpIdentificationNumber Key property. See [[BuPaIdentification.bpIdentificationNumber]].
   * @returns A request builder for creating requests that delete an entity of type `BuPaIdentification`.
   */
  delete(businessPartner: string, bpIdentificationType: string, bpIdentificationNumber: string): DeleteRequestBuilder<BuPaIdentification<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `BuPaIdentification`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `BuPaIdentification` by taking the entity as a parameter.
   */
  delete(entity: BuPaIdentification<T>): DeleteRequestBuilder<BuPaIdentification<T>, T>;
  delete(businessPartnerOrEntity: any, bpIdentificationType?: string, bpIdentificationNumber?: string): DeleteRequestBuilder<BuPaIdentification<T>, T> {
    return new DeleteRequestBuilder<BuPaIdentification<T>, T>(this.entityApi, businessPartnerOrEntity instanceof BuPaIdentification ? businessPartnerOrEntity : {
      BusinessPartner: businessPartnerOrEntity!,
      BPIdentificationType: bpIdentificationType!,
      BPIdentificationNumber: bpIdentificationNumber!
    });
  }
}
