/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';
import { CustSalesPartnerFunc, CustSalesPartnerFuncType } from './CustSalesPartnerFunc';
import { CustomerSalesAreaTax, CustomerSalesAreaTaxType } from './CustomerSalesAreaTax';
import { CustomerSalesAreaText, CustomerSalesAreaTextType } from './CustomerSalesAreaText';

/**
 * This class represents the entity "A_CustomerSalesArea" of service "API_BUSINESS_PARTNER".
 */
export class CustomerSalesArea<T extends DeSerializers = DefaultDeSerializers> extends Entity implements CustomerSalesAreaType<T> {
  /**
   * Technical entity name for CustomerSalesArea.
   */
  static _entityName = 'A_CustomerSalesArea';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_BUSINESS_PARTNER';
  /**
   * All key fields of the CustomerSalesArea entity
   */
  static _keys = ['Customer', 'SalesOrganization', 'DistributionChannel', 'Division'];
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
   * Shipper's (Our) Account Number at the Customer or Vendor.
   * This field contains the account number your company is listed under at the customer or vendor.
   * Maximum length: 12.
   * @nullable
   */
  accountByCustomer?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Authorization Group.
   * The authorization group enables you protect access to certain objects.
   * In order to carry out a specific activity, the user must have authorization for the combination of the activity and the authorization group.
   * Maximum length: 4.
   * @nullable
   */
  authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Billing block for customer (sales and distribution).
   * Indicates if further billing activities are blocked for the customer. The block applies throughout the specified sales area.
   * If you enter a blocking indicator, billing that is already underway is continued. However, you cannot process the document further.Enter one of the values predefined for your system. If you want to block billing for a customer throughout an entire sales organization, you must enter a blocking indicator for each sales area in which the sales organization is defined.You can block billing for a customer if, for example, there are credit-related or legal problems to be resolved.
   * Maximum length: 2.
   * @nullable
   */
  billingIsBlockedForCustomer?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Complete Delivery Defined for Each Sales Order?.
   * Indicates whether a sales order must be delivered completely in a single delivery or whether the order can be partially delivered and completed over a number of deliveries.
   * @nullable
   */
  completeDeliveryIsDefined?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Currency.
   * Customer's currency for a sales area. This currency will be used to settle the customer's charges for the given sales organization.
   * Maximum length: 5.
   * @nullable
   */
  currency?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Customer classification (ABC analysis).
   * Maximum length: 2.
   * @nullable
   */
  customerAbcClassification?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Account Assignment Group for this Customer.
   * The account assignment group to which the system automatically posts the sales document.
   * The system uses the account assignment group as one of the criteria during the automatic determination of revenue accounts.The system automatically proposes the account assignment group from the customer master record of the payer. You can change the default value in the sales document or the billing document.
   * Maximum length: 2.
   * @nullable
   */
  customerAccountAssignmentGroup?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Customer Group.
   * Identifies a particular group of customers (for example, wholesale or retail) for the purpose of pricing or generating statistics.
   * Maximum length: 2.
   * @nullable
   */
  customerGroup?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Terms of Payment Key.
   * Key for defining payment terms composed of cash discount percentages and payment periods.
   * It is used in sales orders, purchase orders, and invoices. Terms of payment provide information for:Cash managementDunning proceduresPayment transactionsData can be entered in the field for the terms of payment key in various ways as you enter a business transaction:In most business transactions, the system defaults the key specified in the master record of the customer/vendor in question.In some transactions (for example, credit memos), however, the system does not default the key from the master record. Despite this, you can use the key from the customer/vendor master record by entering "*" in the field.Regardless of whether or not a key is defaulted from the master record, you can manually enter a key during document entry at:item level in sales ordersheader level in purchase orders and invoicesMaster records have separate areas for Financial Accounting, Sales, and Purchasing. You can specify different terms of payment keys in each of these areas. When you then enter a business transaction, the application in question will use the key specified in its area of the master record.
   * Maximum length: 4.
   * @nullable
   */
  customerPaymentTerms?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Customer Price Group.
   * A grouping of customers who share the same pricing requirements.
   * You can define price groups according to the needs of your organization and create pricing records for each group. You can, for example, define a group of customers to whom you want to give the same kind of discount. You can assign a price group to an individual customer either in the customer master record or in the sales document.The system can propose the price group from the customer master record. You can change the proposed value manually in the sales document at both header and item level.
   * Maximum length: 2.
   * @nullable
   */
  customerPriceGroup?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Customer Classification for Pricing Procedure Determination.
   * Determines which pricing procedure the system should apply when you create a sales document for the customer.
   * You can define different pricing procedures for your system. A pricing procedure determines the type and sequence of conditions that the system uses for pricing in, for example, a sales order.
   * Maximum length: 2.
   * @nullable
   */
  customerPricingProcedure?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Customer delivery block (sales area).
   * Indicates if further delivery processing is blocked for the customer. The block applies throughout the specified sales area.
   * If you enter a blocking indicator, delivery processing that is already underway is continued. However, no new processing can take place.Enter one of the values predefined for your system. If you want to block delivery processing for a customer within a particular sales organization, you must enter a blocking indicator for each sales area in which the sales organization is defined.You can block delivery processing for a customer if, for example, there are credit-related or legal problems to be resolved.
   * Maximum length: 2.
   * @nullable
   */
  deliveryIsBlockedForCustomer?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Delivery Priority.
   * The delivery priority assigned to an item.
   * You can assign delivery priority to either a particular material or to a combination of customer and material. When you process deliveries collectively, you can use delivery priority as one of the selection criteria.
   * Maximum length: 2.
   * @nullable
   */
  deliveryPriority?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Incoterms (Part 1).
   * Commonly used trading terms that comply with the standards established by the International Chamber of Commerce (ICC).
   * Incoterms specify internationally recognized procedures that the shipper and the receiving party must follow for the shipping transaction to be completed successfully.If goods are shipped through a port of departure, the appropriate Incoterm might be: FOB ("Free On Board"). You can provide further details (for example, the name of the port) in the secondary Incoterm field: FOB Boston, for example.
   * Maximum length: 3.
   * @nullable
   */
  incotermsClassification?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Incoterms Location 2.
   * Provides additional information for the Incoterms. This field is only available for C-Clauses (if customized appropriately). Note the following for the incoterms versions below:
   * No Version:This field is disabledIncoterm Version 2000This field is disabled as part of standard delivery unless a customer decides to enable it by the way of Customizing for Sales and Distribution under Master Data -&gt; Business Partners -&gt; Customers -&gt; Billing Document -&gt; Incoterms -&gt; Map Incoterms to Versions.Incoterm Version 2010For this version, the field represents:Sea and inland waterway transport - Port of ShipmentAny mode of transport - Place of Delivery2010 Incoterms are divided as follows:Group 1: Rules for any mode or modes of transport (including by vessel)Incoterm Incoterm Description Location 2CPT Carriage Paid To Place of DeliveryCIP Carriage &amp; Insurance Paid To Place of DeliveryGroup 2: Rules for sea and inland waterwaysIncoterm Incoterm Description Location 2CFR Cost &amp; Freight Port of ShipmentCIF Cost Insurance &amp; Freight Port of Shipment.
   * Maximum length: 70.
   * @nullable
   */
  incotermsLocation2?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Incoterms Version.
   * An incoterms version is an edition containing a list of international terms for transportation that is defined by the International Chamber of Commerce (ICC).
   * Maximum length: 4.
   * @nullable
   */
  incotermsVersion?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Incoterms Location 1.
   * Provides additional information for the primary Incoterm. For Incoterms 2010, this field represents:
   * 1. For sea and inland waterway transport - Port of Shipment or Port of Destination2. For any mode of transport - Place of Delivery 2010 or Place of DestinationFor non-C clauses, both costs and risk are transferred from the seller to the buyer at location 1.For C clauses, the costs are transferred at location 1 and the risk is transferred at location 2.Incoterms are divided as follows:Group 1: Rules for any mode or modes of transport (including by vessel)Incoterm Incoterm Description  Location 1 EXW Ex Works  Place of DeliveryFCA Free Carrier  Place of DeliveryCPT Carriage Paid To  Place of DestinationCIP Carriage &amp; Insurance Paid To  Place of DestinationDAF Delivered at Frontier  Place of DeliveryDDP Delivered Duty Paid  Place of DestinationDDU Delivered Duty Unpaid  Place of DestinationGroup 2: Rules for sea and inland waterwaysIncoterm Incoterm Description Location 1 FAS Free Alongside Ship Port of ShipmentFOB Free On Board Port of ShipmentCFR Cost &amp; Freight Port of DestinationCIF Cost Insurance &amp; Freight Port of DestinationDEQ Delivered Eq Quay (Duty Paid) Port of DestinationDES Delivered Ex Ship Port of DestinationIf the primary incoterm is specified as FOB “Free on Board”, the second field provides details of the port from which the delivery leaves, such as FOB Boston.
   * Maximum length: 70.
   * @nullable
   */
  incotermsLocation1?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Deletion flag for customer (sales level).
   * Indicates that all data in the master record will be deleted for the specified sales area. Before the deletion is made, the system checks for dependent data that would prevent the deletion.
   * @nullable
   */
  deletionIndicator?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Incoterms (Part 2).
   * Additional information for the primary Incoterm.
   * If the primary Incoterm is, for example, FOB ("Free on Board"), then the second field provides details of the port from which the delivery leaves (for example, "FOB Boston").
   * Maximum length: 28.
   * @nullable
   */
  incotermsTransferLocation?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Invoice Dates (Calendar Identification).
   * Identifies the calendar that determines the schedule of billing dates for the customer.
   * If, for example, a customer wants to consolidate the invoices you send out, you can predefine the billing schedule in a calendar in the system. During billing, the system automatically proposes the appropriate billing date from the calendar.The system proposes the billing schedule from the customer master record of the payer. You can change the value manually in the sales document.
   * Maximum length: 2.
   * @nullable
   */
  invoiceDate?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Order Probability of the Item.
   * The probability (expressed as a percentage) of the customer confirming the inquiry or quotation item as part of a sales order.
   * The system combines the probability factors from the sales document type and from the customer master record of the sold-to party.If probability is 80% for the sales document type and 50% in the customer master record, the system combines the two values. In this case, the system takes 50% of 80% and proposes 40% for the item.The system proposes the probability. You can change the value manually for the item.You can generate requirements from quotations. Accordingly, the probability of quotation items affects how requirements are passed on. For example, a quotation for 100 pieces and a probability of 50% will generate requirements for 50 pieces.
   * Maximum length: 3.
   * @nullable
   */
  itemOrderProbabilityInPercent?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Order Combination Indicator.
   * Indicates whether you are allowed to combine orders during delivery processing.
   * The system proposes the indicator from the customer master record. You can change the value manually in the sales document at both header and item level.
   * @nullable
   */
  orderCombinationIsAllowed?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Customer order block (sales area).
   * Indicates if further sales order processing is blocked for the customer. The block applies throughout the specified sales area.
   * You can define blocks according to the needs of your organization. If you enter a blocking indicator, sales order processing that is already underway is continued. However, no new processing can occur.Enter one of the values predefined for your system. If you want to block sales order processing for a customer within a particular sales organization, you must enter a blocking indicator for each sales area in which the sale organization is defined.You can block sales order processing for a customer if, for example, there are credit-related or legal problems to be resolved.
   * Maximum length: 2.
   * @nullable
   */
  orderIsBlockedForCustomer?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Partial Delivery at Item Level.
   * Specifies whether the customer requires full or partial delivery for the item.
   * You use this field to control partial deliveries at the item level. If the customer allows partial delivery, you can choose from different partial delivery options. For example, you can specify whether the customer allows you to make one delivery attempt only on the requested delivery date or whether unlimited delivery attempts are possible.When partial delivery indicator 'D' is set, the order can never have status 'fully delivered'. You must complete each item by entering a reason for rejection. This could be applied to scheduling agreements, for example.You can enter a value in this field only if the customer allows partial deliveries for the entire sales document.
   * Maximum length: 1.
   * @nullable
   */
  partialDeliveryIsAllowed?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Price List Type.
   * Identifies a price list or other condition type (for example, a surcharge or discount).
   * You can define price list types according to the needs of your own organization. Price list types can be grouped according to:the kind of price list (for example, wholesale or retail)the currency in which the price appearsthe number of the price list typeYou can use price list types to apply conditions during pricing or to generate statistics.In the customer master record, enter one of the values predefined for your system. The system proposes the value automatically during sales order processing. You can change the value manually in the sales document header.
   * Maximum length: 2.
   * @nullable
   */
  priceListType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Sales Group.
   * A group of sales people who are responsible for processing sales of certain products or services.
   * By using sales groups you can designate different areas of responsibility within a sales office.  When you generate sales statistics, you can use the sales group as one of the selection criteria.If sales office personnel service both retail and wholesale markets, you can assign a sales group to each market.You assign each salesperson to a sales group in his or her user master record. You assign each customer to a particular sales group in the customer's master record.
   * Maximum length: 3.
   * @nullable
   */
  salesGroup?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Sales Office.
   * A physical location (for example, a branch office) that has responsibility for the sale of certain products or services within a given geographical area.
   * When you create sales statistics, you can use a sales office as one of the selection criteria. When you print out order confirmations, you can include the address of the sales office.You can assign each customer to a sales office in the customer master record.Within a sales office you can establish sales groups (for example, departments) with specific sales responsibilities. Each person who works in the sales office can be assigned to a sales group in his or her user master record. Each customer can also be assigned to a particular sales group in the customer master record.
   * Maximum length: 4.
   * @nullable
   */
  salesOffice?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Shipping Conditions.
   * General shipping strategy for the delivery of goods from the vendor to the customer.
   * You can define shipping conditions in your system which correspond to the requirements of your company. You can specify a shipping condition in the customer master and in the vendor master.Shipping point determination (outbound delivery):The loading group, the plant and the shipping condition determine the shipping point that will be proposed by the system.Route determination (outbound delivery):Apart from the country and the geographical region of the shipping point, the ship-to party and the transportation group, the shipping condition determines the route that the system proposes in the order for the delivery of the goods. In the delivery, the route proposal also takes the weight group into account.A particular customer always requires immediate delivery. You enter the appropriate shipping condition into the customer master record. This means that when you process orders for this customer, the system automatically proposes the express mail room as a shipping point and the quickest way to the airport as a route.If a shipping condition has been assigned to a sales document type in Customizing, this condition will be proposed by the system in the corresponding sales document. If there is no assignment, the system copies the relevant data from the corresponding customer master record of the sold-to party. You cannot change this value during delivery processing. The shipping condition will not be copied from the delivery into the shipment. The shipping condition is one of several criteria for selecting deliveries when you create a shipment. You can enter a shipping condition manually in the shipment where it only serves as a characteristic for grouping shipments.
   * Maximum length: 2.
   * @nullable
   */
  shippingCondition?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Delivering Plant (Own or External).
   * Plant from which the goods should be delivered to the customer.
   * This plant is automatically copied into the sales order item as the default value.If there is no default value when you process the sales order item, enter a delivering plant.The value proposed in the item is eitherfrom the customer master record of the goods recipient, orfrom the material master recordThe system checks whether it can propose a value (and for your own plants, whether the material has been created in the plant). If the system can propose a value, the plant is copied to the sales order item where you can change it as required.
   * Maximum length: 4.
   * @nullable
   */
  supplyingPlant?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Sales District.
   * A geographical sales district or region.
   * Each customer can be assigned to a sales district. You can use sales districts to apply pricing conditions. When you want to generate sales statistics, you can use sales districts as a selection criteria.The system can propose a value from the customer master record of the sold-to party. You can change the value manually in the document at the header or item level.
   * Maximum length: 6.
   * @nullable
   */
  salesDistrict?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Invoice List Schedule (calendar identification).
   * Identifies the customer's factory calendar that is used during the processing of invoice lists.
   * An invoice list is a list of invoices (single or collective) that you create for the customer either periodically or on predefined dates. The periods and dates are defined in the customer's factory calendar. Typically, the recipient of an invoice list takes on the responsibility for collecting payments from numerous individual customers and receives a factoring or del credere discount for the service.If you want to create invoice lists for the customer, you must enter an identifier for a predefined factory calendar.
   * Maximum length: 2.
   * @nullable
   */
  invoiceListSchedule?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Exchange Rate Type.
   * Key representing a type of exchange rate in the system.
   * You enter the exchange rate type to store different exchange rates.You can use the exchange rate type to define a buying rate, selling rate, or average rate for translating foreign currency amounts. You can use the average rate for the currency translation, and the bank buying and selling rates for valuation of foreign currency amounts.
   * Maximum length: 4.
   * @nullable
   */
  exchangeRateType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Customer Group 1.
   * Specifies a customer-defined group of customers.
   * You can define up to five different groups of customers, according to the needs of your organization. You specify the groups in the customer master record under "Additional data". If you assign a particular customer to one or more groups, the system automatically displays the groups in the header data of corresponding sales orders.You can define customer groups in Tables TVV1 through TVV5 and assign them to specific languages in Tables TVV1T through TVV5T.
   * Maximum length: 3.
   * @nullable
   */
  additionalCustomerGroup1?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Customer Group 2.
   * Specifies a customer-defined group of customers.
   * You can define up to five different groups of customers, according to the needs of your organization. You specify the groups in the customer master record under "Additional data". If you assign a particular customer to one or more groups, the system automatically displays the groups in the header data of corresponding sales orders.You can define customer groups in Tables TVV1 through TVV5 and assign them to specific languages in Tables TVV1T through TVV5T.
   * Maximum length: 3.
   * @nullable
   */
  additionalCustomerGroup2?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Customer Group 3.
   * Specifies a customer-defined group of customers.
   * You can define up to five different groups of customers, according to the needs of your organization. You specify the groups in the customer master record under "Additional data". If you assign a particular customer to one or more groups, the system automatically displays the groups in the header data of corresponding sales orders.You can define customer groups in Tables TVV1 through TVV5 and assign them to specific languages in Tables TVV1T through TVV5T.
   * Maximum length: 3.
   * @nullable
   */
  additionalCustomerGroup3?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Customer Group 4.
   * Specifies a customer-defined group of customers.
   * You can define up to five different groups of customers, according to the needs of your organization. You specify the groups in the customer master record under "Additional data". If you assign a particular customer to one or more groups, the system automatically displays the groups in the header data of corresponding sales orders.You can define customer groups in Tables TVV1 through TVV5 and assign them to specific languages in Tables TVV1T through TVV5T.
   * Maximum length: 3.
   * @nullable
   */
  additionalCustomerGroup4?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Customer Group 5.
   * Specifies a customer-defined group of customers.
   * You can define up to five different groups of customers, according to the needs of your organization. You specify the groups in the customer master record under "Additional data". If you assign a particular customer to one or more groups, the system automatically displays the groups in the header data of corresponding sales orders.You can define customer groups in Tables TVV1 through TVV5 and assign them to specific languages in Tables TVV1T through TVV5T.
   * Maximum length: 3.
   * @nullable
   */
  additionalCustomerGroup5?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Customer payment guarantee procedure.
   * This key identifies the customer payment guarantee procedure.
   * The customer payment guarantee procedure determines which payment guarantee procedure the system automatically uses when you create a sales document for the customer.In receivables risk management, the system determines the payment guarantee procedure taking into account:the key for the document payment guarantee procedure in the header for the sales document type.the customer payment guarantee procedure key in the customer master.You can define different payment guarantee procedures for your system. The payment guarantee procedure defines the type and sequence of forms of payment guarantee that the system assigns to the sales document items.
   * Maximum length: 4.
   * @nullable
   */
  paymentGuaranteeProcedure?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Customer Account Group.
   * The account group is a classifying feature within customer master records. The account group determines:
   * in which number range the customer account number should be;whether the number is assigned by the user or by the system;which specifications are necessary or possible in the master record.
   * Maximum length: 4.
   * @nullable
   */
  customerAccountGroup?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * One-to-many navigation property to the [[CustSalesPartnerFunc]] entity.
   */
  toPartnerFunction!: CustSalesPartnerFunc<T>[];
  /**
   * One-to-many navigation property to the [[CustomerSalesAreaTax]] entity.
   */
  toSalesAreaTax!: CustomerSalesAreaTax<T>[];
  /**
   * One-to-many navigation property to the [[CustomerSalesAreaText]] entity.
   */
  toSalesAreaText!: CustomerSalesAreaText<T>[];
}

export interface CustomerSalesAreaType<T extends DeSerializers = DefaultDeSerializers> {
  customer: DeserializedType<T, 'Edm.String'>;
  salesOrganization: DeserializedType<T, 'Edm.String'>;
  distributionChannel: DeserializedType<T, 'Edm.String'>;
  division: DeserializedType<T, 'Edm.String'>;
  accountByCustomer?: DeserializedType<T, 'Edm.String'> | null;
  authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
  billingIsBlockedForCustomer?: DeserializedType<T, 'Edm.String'> | null;
  completeDeliveryIsDefined?: DeserializedType<T, 'Edm.Boolean'> | null;
  currency?: DeserializedType<T, 'Edm.String'> | null;
  customerAbcClassification?: DeserializedType<T, 'Edm.String'> | null;
  customerAccountAssignmentGroup?: DeserializedType<T, 'Edm.String'> | null;
  customerGroup?: DeserializedType<T, 'Edm.String'> | null;
  customerPaymentTerms?: DeserializedType<T, 'Edm.String'> | null;
  customerPriceGroup?: DeserializedType<T, 'Edm.String'> | null;
  customerPricingProcedure?: DeserializedType<T, 'Edm.String'> | null;
  deliveryIsBlockedForCustomer?: DeserializedType<T, 'Edm.String'> | null;
  deliveryPriority?: DeserializedType<T, 'Edm.String'> | null;
  incotermsClassification?: DeserializedType<T, 'Edm.String'> | null;
  incotermsLocation2?: DeserializedType<T, 'Edm.String'> | null;
  incotermsVersion?: DeserializedType<T, 'Edm.String'> | null;
  incotermsLocation1?: DeserializedType<T, 'Edm.String'> | null;
  deletionIndicator?: DeserializedType<T, 'Edm.Boolean'> | null;
  incotermsTransferLocation?: DeserializedType<T, 'Edm.String'> | null;
  invoiceDate?: DeserializedType<T, 'Edm.String'> | null;
  itemOrderProbabilityInPercent?: DeserializedType<T, 'Edm.String'> | null;
  orderCombinationIsAllowed?: DeserializedType<T, 'Edm.Boolean'> | null;
  orderIsBlockedForCustomer?: DeserializedType<T, 'Edm.String'> | null;
  partialDeliveryIsAllowed?: DeserializedType<T, 'Edm.String'> | null;
  priceListType?: DeserializedType<T, 'Edm.String'> | null;
  salesGroup?: DeserializedType<T, 'Edm.String'> | null;
  salesOffice?: DeserializedType<T, 'Edm.String'> | null;
  shippingCondition?: DeserializedType<T, 'Edm.String'> | null;
  supplyingPlant?: DeserializedType<T, 'Edm.String'> | null;
  salesDistrict?: DeserializedType<T, 'Edm.String'> | null;
  invoiceListSchedule?: DeserializedType<T, 'Edm.String'> | null;
  exchangeRateType?: DeserializedType<T, 'Edm.String'> | null;
  additionalCustomerGroup1?: DeserializedType<T, 'Edm.String'> | null;
  additionalCustomerGroup2?: DeserializedType<T, 'Edm.String'> | null;
  additionalCustomerGroup3?: DeserializedType<T, 'Edm.String'> | null;
  additionalCustomerGroup4?: DeserializedType<T, 'Edm.String'> | null;
  additionalCustomerGroup5?: DeserializedType<T, 'Edm.String'> | null;
  paymentGuaranteeProcedure?: DeserializedType<T, 'Edm.String'> | null;
  customerAccountGroup?: DeserializedType<T, 'Edm.String'> | null;
  toPartnerFunction: CustSalesPartnerFuncType<T>[];
  toSalesAreaTax: CustomerSalesAreaTaxType<T>[];
  toSalesAreaText: CustomerSalesAreaTextType<T>[];
}
