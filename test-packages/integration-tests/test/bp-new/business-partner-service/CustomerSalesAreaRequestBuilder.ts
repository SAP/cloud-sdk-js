/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { CustomerSalesArea } from './CustomerSalesArea';

/**
 * Request builder class for operations supported on the [[CustomerSalesArea]] entity.
 */
export class CustomerSalesAreaRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<CustomerSalesArea<T>, T> {
  /**
   * Returns a request builder for retrieving one `CustomerSalesArea` entity based on its keys.
   * @param customer Key property. See [[CustomerSalesArea.customer]].
   * @param salesOrganization Key property. See [[CustomerSalesArea.salesOrganization]].
   * @param distributionChannel Key property. See [[CustomerSalesArea.distributionChannel]].
   * @param division Key property. See [[CustomerSalesArea.division]].
   * @returns A request builder for creating requests to retrieve one `CustomerSalesArea` entity based on its keys.
   */
  getByKey(customer: DeserializedType<T, 'Edm.String'>, salesOrganization: DeserializedType<T, 'Edm.String'>, distributionChannel: DeserializedType<T, 'Edm.String'>, division: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<CustomerSalesArea<T>, T> {
    return new GetByKeyRequestBuilder<CustomerSalesArea<T>, T>(this.entityApi, {
      Customer: customer,
      SalesOrganization: salesOrganization,
      DistributionChannel: distributionChannel,
      Division: division
    });
  }

  /**
   * Returns a request builder for querying all `CustomerSalesArea` entities.
   * @returns A request builder for creating requests to retrieve all `CustomerSalesArea` entities.
   */
  getAll(): GetAllRequestBuilder<CustomerSalesArea<T>, T> {
    return new GetAllRequestBuilder<CustomerSalesArea<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `CustomerSalesArea` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `CustomerSalesArea`.
   */
  create(entity: CustomerSalesArea<T>): CreateRequestBuilder<CustomerSalesArea<T>, T> {
    return new CreateRequestBuilder<CustomerSalesArea<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `CustomerSalesArea`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `CustomerSalesArea`.
   */
  update(entity: CustomerSalesArea<T>): UpdateRequestBuilder<CustomerSalesArea<T>, T> {
    return new UpdateRequestBuilder<CustomerSalesArea<T>, T>(this.entityApi, entity);
  }
}
