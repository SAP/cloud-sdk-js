/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';

/**
 * This class represents the entity "A_CustomerSalesAreaTax" of service "API_BUSINESS_PARTNER".
 */
export class CustomerSalesAreaTax<T extends DeSerializers = DefaultDeSerializers> extends Entity implements CustomerSalesAreaTaxType<T> {
  /**
   * Technical entity name for CustomerSalesAreaTax.
   */
  static _entityName = 'A_CustomerSalesAreaTax';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_BUSINESS_PARTNER';
  /**
   * All key fields of the CustomerSalesAreaTax entity
   */
  static _keys = ['Customer', 'SalesOrganization', 'DistributionChannel', 'Division', 'DepartureCountry', 'CustomerTaxCategory'];
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
   * Reference distrib.channel for cust.and material masters.
   * Specifies a distribution channel that you want to use as a reference for customer and material master data for other distribution channels.
   * You can specify one distribution channel as the source of customer and material master data for other distribution channels. You need then only to maintain the data in one place.Distrib.channel Ref.distrib.channel01 0102 0103 0104 04In this example, only distribution channels 01 and 04 have customer and material master data defined. Distribution channels 01, 02, and 03 share the master data that you defined for distribution channel 01. Distribution channel 04 has its own master data. When you create a sales order in distribution channel 03, the system checks the customer and material master data against the data defined for distribution channel 01.
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
   * Departure Country/Region (from which the goods are sent).
   * Identifies the country or region in which the delivery originates.
   * You can define the country/region key in a table. As a rule, it is a good idea to use the existing international standards for identifying vehicles from different countries or regions (for example: USA = United States, I = Italy, and so on). The system uses the key to do the following:Help determine the relevant taxes during pricingDetermine important country or region-specific standards (the length of postal codes and bank account numbers, for example).
   * Maximum length: 3.
   */
  departureCountry!: DeserializedType<T, 'Edm.String'>;
  /**
   * Tax category (sales tax, federal sales tax,...).
   * Identifies the condition that the system uses to automatically determine country-specific taxes during pricing.
   * You can define one or more tax categories for each country. During sales order processing, the system applies the tax category according tothe geographical location of your delivering plant and the location of the customer receiving the goodstax classifications in the customer master record and the material master record.In the USA, for example, you can define tax categories for Federal Sales Tax and Federal Excise Tax. In the U.K., you can define a tax category for Value Added Tax (VAT).
   * Maximum length: 4.
   */
  customerTaxCategory!: DeserializedType<T, 'Edm.String'>;
  /**
   * Tax classification for customer.
   * Specifies the tax liability of the customer, based on the tax structure of the customer's country.
   * You can use the tax classification to specify, for example, whether a customer is liable for sales taxes, such as VAT or state sales taxes.During sales order processing, the system copies the tax classification from the tax information stored in thecustomer master record of the payer, if the payer is different from the sold-to party and the sales tax identification number is maintained for the payer.ship to party, if the sales tax identification number of the ship-to party is maintained.sold-to party, if none of the criteria for the payer or the ship-to party are met.During pricing, the system calculates any relevant taxes by taking the following factors into account:The tax classification of the customer and the materialThe country keys of the customer and the delivering plant.
   * Maximum length: 1.
   * @nullable
   */
  customerTaxClassification?: DeserializedType<T, 'Edm.String'> | null;
}

export interface CustomerSalesAreaTaxType<T extends DeSerializers = DefaultDeSerializers> {
  customer: DeserializedType<T, 'Edm.String'>;
  salesOrganization: DeserializedType<T, 'Edm.String'>;
  distributionChannel: DeserializedType<T, 'Edm.String'>;
  division: DeserializedType<T, 'Edm.String'>;
  departureCountry: DeserializedType<T, 'Edm.String'>;
  customerTaxCategory: DeserializedType<T, 'Edm.String'>;
  customerTaxClassification?: DeserializedType<T, 'Edm.String'> | null;
}
