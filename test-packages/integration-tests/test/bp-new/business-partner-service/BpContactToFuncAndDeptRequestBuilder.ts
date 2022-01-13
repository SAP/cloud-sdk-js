/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, UpdateRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { BpContactToFuncAndDept } from './BpContactToFuncAndDept';

/**
 * Request builder class for operations supported on the [[BpContactToFuncAndDept]] entity.
 */
export class BpContactToFuncAndDeptRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<BpContactToFuncAndDept<T>, T> {
  /**
   * Returns a request builder for retrieving one `BpContactToFuncAndDept` entity based on its keys.
   * @param relationshipNumber Key property. See [[BpContactToFuncAndDept.relationshipNumber]].
   * @param businessPartnerCompany Key property. See [[BpContactToFuncAndDept.businessPartnerCompany]].
   * @param businessPartnerPerson Key property. See [[BpContactToFuncAndDept.businessPartnerPerson]].
   * @param validityEndDate Key property. See [[BpContactToFuncAndDept.validityEndDate]].
   * @returns A request builder for creating requests to retrieve one `BpContactToFuncAndDept` entity based on its keys.
   */
  getByKey(relationshipNumber: DeserializedType<T, 'Edm.String'>, businessPartnerCompany: DeserializedType<T, 'Edm.String'>, businessPartnerPerson: DeserializedType<T, 'Edm.String'>, validityEndDate: DeserializedType<T, 'Edm.DateTime'>): GetByKeyRequestBuilder<BpContactToFuncAndDept<T>, T> {
    return new GetByKeyRequestBuilder<BpContactToFuncAndDept<T>, T>(this.entityApi, {
      RelationshipNumber: relationshipNumber,
      BusinessPartnerCompany: businessPartnerCompany,
      BusinessPartnerPerson: businessPartnerPerson,
      ValidityEndDate: validityEndDate
    });
  }

  /**
   * Returns a request builder for querying all `BpContactToFuncAndDept` entities.
   * @returns A request builder for creating requests to retrieve all `BpContactToFuncAndDept` entities.
   */
  getAll(): GetAllRequestBuilder<BpContactToFuncAndDept<T>, T> {
    return new GetAllRequestBuilder<BpContactToFuncAndDept<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for updating an entity of type `BpContactToFuncAndDept`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `BpContactToFuncAndDept`.
   */
  update(entity: BpContactToFuncAndDept<T>): UpdateRequestBuilder<BpContactToFuncAndDept<T>, T> {
    return new UpdateRequestBuilder<BpContactToFuncAndDept<T>, T>(this.entityApi, entity);
  }
}
