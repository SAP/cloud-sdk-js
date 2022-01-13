/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';

/**
 * This class represents the entity "A_CustSalesPartnerFunc" of service "API_BUSINESS_PARTNER".
 */
export class CustSalesPartnerFunc<T extends DeSerializers = DefaultDeSerializers> extends Entity implements CustSalesPartnerFuncType<T> {
  /**
   * Technical entity name for CustSalesPartnerFunc.
   */
  static _entityName = 'A_CustSalesPartnerFunc';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_BUSINESS_PARTNER';
  /**
   * All key fields of the CustSalesPartnerFunc entity
   */
  static _keys = ['Customer', 'SalesOrganization', 'DistributionChannel', 'Division', 'PartnerCounter', 'PartnerFunction'];
  /**
   * Customer Number.
   * Gives an alphanumeric key, which clearly identifies the customer or vendor in the SAP system.
   * Maximum length: 10.
   */
  customer!: DeserializedType<T, 'Edm.String'>;
  /**
   * Sales Organization.
   * An organizational unit responsible for the sale of certain products or services. The responsibility of a sales organization may include legal liability for products and customer claims.
   * You can assign any number of distribution channels and divisions to a sales organization. A particular combination of sales organization, distribution channel, and division is known as a sales area.
   * Maximum length: 4.
   */
  salesOrganization!: DeserializedType<T, 'Edm.String'>;
  /**
   * Distribution Channel.
   * The way in which products or services reach the customer. Typical examples of distribution channels are wholesale, retail, or direct sales.
   * You can maintain information about customers and materials by sales organization and distribution channel. Within a sales organization you can deliver goods to a given customer through more than one distribution channel.You can assign a distribution channel to one or more sales organizations. If, for example, you have numerous sales organizations, each sales organization may use the "Wholesale" distribution channel.For each combination of sales organization and distribution channel, you can further assign one or more of the divisions that are defined for the sales organization. You can, for example, assign "Food" and "Non-food" divisions to the "Wholesale" distribution channel. A particular combination of sales organization, distribution channel, and division is known as a sales area.
   * Maximum length: 2.
   */
  distributionChannel!: DeserializedType<T, 'Edm.String'>;
  /**
   * Division.
   * A way of grouping materials, products, or services. The system uses divisions to determine the sales areas and the business areas for a material, product, or service.
   * A product or service is always assigned to just one division. From the point of view of sales and distribution, the use of divisions lets you organize your sales structure around groups of similar products or product lines. This allows the people in a division who process orders and service customers to specialize within a manageable area of expertise.If a sales organization sells food and non-food products through both retail and wholesaledistribution channels each distribution channel could then be further split into food and non-food divisions.
   * Maximum length: 2.
   */
  division!: DeserializedType<T, 'Edm.String'>;
  /**
   * Partner counter.
   * The sequential number that the system applies when there is more than one partner for a particular partner function.
   * When you create a sales order for a particular customer, there may be more than one ship-to party defined. The different ship-to parties are numbered sequentially.
   * Maximum length: 3.
   */
  partnerCounter!: DeserializedType<T, 'Edm.String'>;
  /**
   * Partner Function.
   * The abbreviated form of the name that identifies the partner function.
   * Maximum length: 2.
   */
  partnerFunction!: DeserializedType<T, 'Edm.String'>;
  /**
   * Customer number of business partner.
   * Maximum length: 10.
   * @nullable
   */
  bpCustomerNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Cust.-Specif. Descr. of Business Partner (Plant, Stor. Loc.).
   * Sold-to party number sent in by the customer in delivery schedules.
   * The system uses this number to automatically determine the ship-to party.
   * Maximum length: 30.
   * @nullable
   */
  customerPartnerDescription?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Default Partner.
   * Specifies a partner as the default for a particular partner function.
   * When you enter more than one partner for a particular partner function (for example, you define three different ship-to parties), you can select one partner as the default. During sales or purchasing processing, if you have defined multiple partners for a partner function, the system prompts you to choose just one partner. The system presents the default partner as the first choice in the pop-up window.
   * @nullable
   */
  defaultPartner?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Account Number of Supplier.
   * Specifies an alphanumeric key that uniquely identifies the supplier in the SAP system.
   * Maximum length: 10.
   * @nullable
   */
  supplier?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Personnel Number.
   * The personnel number is the only feature within a client which is unique to an employee. You have to enter a personnel number before you can display and maintain an employee's master data and time data.
   * Maximum length: 8.
   * @nullable
   */
  personnelNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Number of Contact Person.
   * The number that uniquely identifies the contact person.
   * Maximum length: 10.
   * @nullable
   */
  contactPerson?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Authorization Group.
   * The authorization group allows extended authorization protection for particular objects. The authorization groups are freely definable. The authorization groups usually occur in authorization objects together with an activity.
   * Maximum length: 4.
   * @nullable
   */
  authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
}

export interface CustSalesPartnerFuncType<T extends DeSerializers = DefaultDeSerializers> {
  customer: DeserializedType<T, 'Edm.String'>;
  salesOrganization: DeserializedType<T, 'Edm.String'>;
  distributionChannel: DeserializedType<T, 'Edm.String'>;
  division: DeserializedType<T, 'Edm.String'>;
  partnerCounter: DeserializedType<T, 'Edm.String'>;
  partnerFunction: DeserializedType<T, 'Edm.String'>;
  bpCustomerNumber?: DeserializedType<T, 'Edm.String'> | null;
  customerPartnerDescription?: DeserializedType<T, 'Edm.String'> | null;
  defaultPartner?: DeserializedType<T, 'Edm.Boolean'> | null;
  supplier?: DeserializedType<T, 'Edm.String'> | null;
  personnelNumber?: DeserializedType<T, 'Edm.String'> | null;
  contactPerson?: DeserializedType<T, 'Edm.String'> | null;
  authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
}
