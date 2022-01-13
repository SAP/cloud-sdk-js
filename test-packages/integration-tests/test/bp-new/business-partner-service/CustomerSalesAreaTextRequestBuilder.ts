/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { CustomerSalesAreaText } from './CustomerSalesAreaText';

/**
 * Request builder class for operations supported on the [[CustomerSalesAreaText]] entity.
 */
export class CustomerSalesAreaTextRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<CustomerSalesAreaText<T>, T> {
  /**
   * Returns a request builder for retrieving one `CustomerSalesAreaText` entity based on its keys.
   * @param customer Key property. See [[CustomerSalesAreaText.customer]].
   * @param salesOrganization Key property. See [[CustomerSalesAreaText.salesOrganization]].
   * @param distributionChannel Key property. See [[CustomerSalesAreaText.distributionChannel]].
   * @param division Key property. See [[CustomerSalesAreaText.division]].
   * @param language Key property. See [[CustomerSalesAreaText.language]].
   * @param longTextId Key property. See [[CustomerSalesAreaText.longTextId]].
   * @returns A request builder for creating requests to retrieve one `CustomerSalesAreaText` entity based on its keys.
   */
  getByKey(customer: DeserializedType<T, 'Edm.String'>, salesOrganization: DeserializedType<T, 'Edm.String'>, distributionChannel: DeserializedType<T, 'Edm.String'>, division: DeserializedType<T, 'Edm.String'>, language: DeserializedType<T, 'Edm.String'>, longTextId: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<CustomerSalesAreaText<T>, T> {
    return new GetByKeyRequestBuilder<CustomerSalesAreaText<T>, T>(this.entityApi, {
      Customer: customer,
      SalesOrganization: salesOrganization,
      DistributionChannel: distributionChannel,
      Division: division,
      Language: language,
      LongTextID: longTextId
    });
  }

  /**
   * Returns a request builder for querying all `CustomerSalesAreaText` entities.
   * @returns A request builder for creating requests to retrieve all `CustomerSalesAreaText` entities.
   */
  getAll(): GetAllRequestBuilder<CustomerSalesAreaText<T>, T> {
    return new GetAllRequestBuilder<CustomerSalesAreaText<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `CustomerSalesAreaText` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `CustomerSalesAreaText`.
   */
  create(entity: CustomerSalesAreaText<T>): CreateRequestBuilder<CustomerSalesAreaText<T>, T> {
    return new CreateRequestBuilder<CustomerSalesAreaText<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `CustomerSalesAreaText`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `CustomerSalesAreaText`.
   */
  update(entity: CustomerSalesAreaText<T>): UpdateRequestBuilder<CustomerSalesAreaText<T>, T> {
    return new UpdateRequestBuilder<CustomerSalesAreaText<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `CustomerSalesAreaText`.
   * @param customer Key property. See [[CustomerSalesAreaText.customer]].
   * @param salesOrganization Key property. See [[CustomerSalesAreaText.salesOrganization]].
   * @param distributionChannel Key property. See [[CustomerSalesAreaText.distributionChannel]].
   * @param division Key property. See [[CustomerSalesAreaText.division]].
   * @param language Key property. See [[CustomerSalesAreaText.language]].
   * @param longTextId Key property. See [[CustomerSalesAreaText.longTextId]].
   * @returns A request builder for creating requests that delete an entity of type `CustomerSalesAreaText`.
   */
  delete(customer: string, salesOrganization: string, distributionChannel: string, division: string, language: string, longTextId: string): DeleteRequestBuilder<CustomerSalesAreaText<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `CustomerSalesAreaText`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `CustomerSalesAreaText` by taking the entity as a parameter.
   */
  delete(entity: CustomerSalesAreaText<T>): DeleteRequestBuilder<CustomerSalesAreaText<T>, T>;
  delete(customerOrEntity: any, salesOrganization?: string, distributionChannel?: string, division?: string, language?: string, longTextId?: string): DeleteRequestBuilder<CustomerSalesAreaText<T>, T> {
    return new DeleteRequestBuilder<CustomerSalesAreaText<T>, T>(this.entityApi, customerOrEntity instanceof CustomerSalesAreaText ? customerOrEntity : {
      Customer: customerOrEntity!,
      SalesOrganization: salesOrganization!,
      DistributionChannel: distributionChannel!,
      Division: division!,
      Language: language!,
      LongTextID: longTextId!
    });
  }
}
