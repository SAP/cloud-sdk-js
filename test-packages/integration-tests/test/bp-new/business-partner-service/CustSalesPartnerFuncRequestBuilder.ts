/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { CustSalesPartnerFunc } from './CustSalesPartnerFunc';

/**
 * Request builder class for operations supported on the [[CustSalesPartnerFunc]] entity.
 */
export class CustSalesPartnerFuncRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<CustSalesPartnerFunc<T>, T> {
  /**
   * Returns a request builder for retrieving one `CustSalesPartnerFunc` entity based on its keys.
   * @param customer Key property. See [[CustSalesPartnerFunc.customer]].
   * @param salesOrganization Key property. See [[CustSalesPartnerFunc.salesOrganization]].
   * @param distributionChannel Key property. See [[CustSalesPartnerFunc.distributionChannel]].
   * @param division Key property. See [[CustSalesPartnerFunc.division]].
   * @param partnerCounter Key property. See [[CustSalesPartnerFunc.partnerCounter]].
   * @param partnerFunction Key property. See [[CustSalesPartnerFunc.partnerFunction]].
   * @returns A request builder for creating requests to retrieve one `CustSalesPartnerFunc` entity based on its keys.
   */
  getByKey(customer: DeserializedType<T, 'Edm.String'>, salesOrganization: DeserializedType<T, 'Edm.String'>, distributionChannel: DeserializedType<T, 'Edm.String'>, division: DeserializedType<T, 'Edm.String'>, partnerCounter: DeserializedType<T, 'Edm.String'>, partnerFunction: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<CustSalesPartnerFunc<T>, T> {
    return new GetByKeyRequestBuilder<CustSalesPartnerFunc<T>, T>(this.entityApi, {
      Customer: customer,
      SalesOrganization: salesOrganization,
      DistributionChannel: distributionChannel,
      Division: division,
      PartnerCounter: partnerCounter,
      PartnerFunction: partnerFunction
    });
  }

  /**
   * Returns a request builder for querying all `CustSalesPartnerFunc` entities.
   * @returns A request builder for creating requests to retrieve all `CustSalesPartnerFunc` entities.
   */
  getAll(): GetAllRequestBuilder<CustSalesPartnerFunc<T>, T> {
    return new GetAllRequestBuilder<CustSalesPartnerFunc<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `CustSalesPartnerFunc` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `CustSalesPartnerFunc`.
   */
  create(entity: CustSalesPartnerFunc<T>): CreateRequestBuilder<CustSalesPartnerFunc<T>, T> {
    return new CreateRequestBuilder<CustSalesPartnerFunc<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `CustSalesPartnerFunc`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `CustSalesPartnerFunc`.
   */
  update(entity: CustSalesPartnerFunc<T>): UpdateRequestBuilder<CustSalesPartnerFunc<T>, T> {
    return new UpdateRequestBuilder<CustSalesPartnerFunc<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `CustSalesPartnerFunc`.
   * @param customer Key property. See [[CustSalesPartnerFunc.customer]].
   * @param salesOrganization Key property. See [[CustSalesPartnerFunc.salesOrganization]].
   * @param distributionChannel Key property. See [[CustSalesPartnerFunc.distributionChannel]].
   * @param division Key property. See [[CustSalesPartnerFunc.division]].
   * @param partnerCounter Key property. See [[CustSalesPartnerFunc.partnerCounter]].
   * @param partnerFunction Key property. See [[CustSalesPartnerFunc.partnerFunction]].
   * @returns A request builder for creating requests that delete an entity of type `CustSalesPartnerFunc`.
   */
  delete(customer: string, salesOrganization: string, distributionChannel: string, division: string, partnerCounter: string, partnerFunction: string): DeleteRequestBuilder<CustSalesPartnerFunc<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `CustSalesPartnerFunc`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `CustSalesPartnerFunc` by taking the entity as a parameter.
   */
  delete(entity: CustSalesPartnerFunc<T>): DeleteRequestBuilder<CustSalesPartnerFunc<T>, T>;
  delete(customerOrEntity: any, salesOrganization?: string, distributionChannel?: string, division?: string, partnerCounter?: string, partnerFunction?: string): DeleteRequestBuilder<CustSalesPartnerFunc<T>, T> {
    return new DeleteRequestBuilder<CustSalesPartnerFunc<T>, T>(this.entityApi, customerOrEntity instanceof CustSalesPartnerFunc ? customerOrEntity : {
      Customer: customerOrEntity!,
      SalesOrganization: salesOrganization!,
      DistributionChannel: distributionChannel!,
      Division: division!,
      PartnerCounter: partnerCounter!,
      PartnerFunction: partnerFunction!
    });
  }
}
