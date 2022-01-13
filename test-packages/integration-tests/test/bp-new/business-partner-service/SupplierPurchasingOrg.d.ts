import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';
import { SupplierPartnerFunc, SupplierPartnerFuncType } from './SupplierPartnerFunc';
import { SupplierPurchasingOrgText, SupplierPurchasingOrgTextType } from './SupplierPurchasingOrgText';
/**
 * This class represents the entity "A_SupplierPurchasingOrg" of service "API_BUSINESS_PARTNER".
 */
export declare class SupplierPurchasingOrg<T extends DeSerializers = DefaultDeSerializers> extends Entity implements SupplierPurchasingOrgType<T> {
    /**
     * Technical entity name for SupplierPurchasingOrg.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * All key fields of the SupplierPurchasingOrg entity
     */
    static _keys: string[];
    /**
     * Account Number of the Vendor.
     * Alphanumeric key uniquely identifying the document.
     * With the supplier number, information from the supplier master record (such as the supplier's address and bank details) is copied into a purchasing document (such as a request for quotation or a purchase order).You can use the supplier number to keep track of requests for quotation, purchase orders and outline agreements.
     * Maximum length: 10.
     */
    supplier: DeserializedType<T, 'Edm.String'>;
    /**
     * Purchasing Organization.
     * Denotes the purchasing organization.
     * Maximum length: 4.
     */
    purchasingOrganization: DeserializedType<T, 'Edm.String'>;
    /**
     * Group for Calculation Schema (Supplier).
     * Determines which calculation schema (pricing procedure) is to be used in purchasing documents containing this supplier number.
     * You can use the schema group to specify the calculation schema per purchasing organization or supplier. The relevant calculation schema is determined by reference to the schema group.The effect of this is that the conditions to be maintained in a purchasing document can differ depending on the relevant purchasing organization or supplier.If a calculation schema is only to be valid for certain purchasing organizations or suppliers, proceed as follows:Define the schema group for the purchasing organization or the supplier using the relevant function in the menu "Calculation schema -&gt; Schema groups".Assign the schema group to the calculation schema via "Calculation schema -&gt; Determine schema".Enter the schema group for the supplier in the supplier master records to which the calculation schema is to be assigned. Assign the schema group of the purchasing organization to the relevant purchasing organization using "Calculation schema -&gt; Schema group -&gt; Assign to purch. org.".
     * Maximum length: 2.
     * @nullable
     */
    calculationSchemaGroupCode?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Deletion Indicator for Supplier at Purchasing Level.
     * Indicates whether or not the supplier master record is earmarked for deletion.
     * @nullable
     */
    deletionIndicator?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * Incoterms (Part 1).
     * Commonly used trading terms that comply with the standards established by the International Chamber of Commerce (ICC).
     * Incoterms specify internationally recognized procedures that the shipper and the receiving party must follow for the shipping transaction to be completed successfully.If goods are shipped through a port of departure, the appropriate Incoterm might be: FOB ("Free On Board"). You can provide further details (for example, the name of the port) in the secondary Incoterm field: FOB Boston, for example.
     * Maximum length: 3.
     * @nullable
     */
    incotermsClassification?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Incoterms (Part 2).
     * Additional information for the primary Incoterm.
     * If the primary Incoterm is, for example, FOB ("Free on Board"), then the second field provides details of the port from which the delivery leaves (for example, "FOB Boston").
     * Maximum length: 28.
     * @nullable
     */
    incotermsTransferLocation?: DeserializedType<T, 'Edm.String'> | null;
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
     * Incoterms Location 2.
     * Provides additional information for the Incoterms. This field is only available for C-Clauses (if customized appropriately). Note the following for the incoterms versions below:
     * No Version:This field is disabledIncoterm Version 2000This field is disabled as part of standard delivery unless a customer decides to enable it by the way of Customizing for Sales and Distribution under Master Data -&gt; Business Partners -&gt; Customers -&gt; Billing Document -&gt; Incoterms -&gt; Map Incoterms to Versions.Incoterm Version 2010For this version, the field represents:Sea and inland waterway transport - Port of ShipmentAny mode of transport - Place of Delivery2010 Incoterms are divided as follows:Group 1: Rules for any mode or modes of transport (including by vessel)Incoterm Incoterm Description Location 2CPT Carriage Paid To Place of DeliveryCIP Carriage &amp; Insurance Paid To Place of DeliveryGroup 2: Rules for sea and inland waterwaysIncoterm Incoterm Description Location 2CFR Cost &amp; Freight Port of ShipmentCIF Cost Insurance &amp; Freight Port of Shipment.
     * Maximum length: 70.
     * @nullable
     */
    incotermsLocation2?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Indicator: GR-Based Invoice Verification.
     * Indicator specifying that provision has been made for goods-receipt-based invoice verification for a purchase order item or invoice item.
     * @nullable
     */
    invoiceIsGoodsReceiptBased?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * Planned Delivery Time in Days.
     * Number of calendar days needed to obtain the material or service if it is procured externally.
     * If you have different vendors for a material, you must specify an average value. The same applies if you order the material from a fixed vendor that has varying delivery times.If you use the SAP Retail System, the planned delivery time can be suggested from the vendor sub-range in the vendor master record.
     * @nullable
     */
    materialPlannedDeliveryDurn?: DeserializedType<T, 'Edm.Decimal'> | null;
    /**
     * Minimum order value.
     * Minimum value specified for purchase orders issued to the relevant supplier.
     * @nullable
     */
    minimumOrderAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
    /**
     * Terms of Payment Key.
     * Key for defining payment terms composed of cash discount percentages and payment periods.
     * It is used in sales orders, purchase orders, and invoices. Terms of payment provide information for:Cash managementDunning proceduresPayment transactionsData can be entered in the field for the terms of payment key in various ways as you enter a business transaction:In most business transactions, the system defaults the key specified in the master record of the customer/vendor in question.In some transactions (for example, credit memos), however, the system does not default the key from the master record. Despite this, you can use the key from the customer/vendor master record by entering "*" in the field.Regardless of whether or not a key is defaulted from the master record, you can manually enter a key during document entry at:item level in sales ordersheader level in purchase orders and invoicesMaster records have separate areas for Financial Accounting, Sales, and Purchasing. You can specify different terms of payment keys in each of these areas. When you then enter a business transaction, the application in question will use the key specified in its area of the master record.
     * Maximum length: 4.
     * @nullable
     */
    paymentTerms?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Price Determination (Pricing) Date Control.
     * Determines which date is to be used for price determination (pricing) purposes.
     * Enter the key for the desired date.Available keys are maintained in the info record of an item (in the pricing date category field). Keys available are:1  Purchase Order Date (the price determination date = date of purchase order creation)2  Delivery Date (the price determination date = delivery date)3  Current Date (the price determination date = the date of entry in the system)4  Manual (the price determination date = manually entered date)5  GR/Post. Date (the price determination date is the posting date of the goods receipt)6  GR/Doc. Date (the price determination date is the document date. When booking the goods receipt the price determination date can be influenced/controlled with the price determination date control type 6.)If you choose the date of goods receipt, for example, a new price will be determined upon the arrival of the goods, causing the item to be revaluated at this time.NoteIf you have chosen the delivery date as the date for price determination and an item contains several delivery dates (for example, because ofa delivery schedule valid for this item), the first delivery date(the delivery date specified in the first schedule line) is taken.
     * Maximum length: 1.
     * @nullable
     */
    pricingDateControl?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Automatic Generation of Purchase Order Allowed.
     * Allows you to automatically generate purchase orders from purchase requisitions if the requisition has been assigned to a supplier (source of supply).
     * If you want to use automatic conversion, note the following additional conditions:In the case of purchase requisitions for materials, you should also select the indicator Autom.purch.ord. in the Purchasing view in the material master record.In the case of purchase requisitions for services, you should also select the indicator Automatic creation of POs for service PReqs in Customizing for Services by choosing:IMG -&gt; MM -&gt; External Services Management -&gt; Source Determination and Default Values- for Client or- for Purchasing Organization.
     * @nullable
     */
    purOrdAutoGenerationIsAllowed?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * Purchase order currency.
     * Key for the currency on which an order placed with a supplier is based.
     * Maximum length: 5.
     * @nullable
     */
    purchaseOrderCurrency?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Purchasing Group.
     * Key for a buyer or a group of buyers, who is/are responsible for certain purchasing activities.
     * Internally, the purchasing group is responsible for the procurement of a material or a class of materials.Externally, it is the medium through which contacts with the vendor are maintained.
     * Maximum length: 3.
     * @nullable
     */
    purchasingGroup?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Purchasing block at purchasing organization level.
     * Indicates whether or not the supplier master record is blocked for the purchasing organization for posting purposes.
     * @nullable
     */
    purchasingIsBlockedForSupplier?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * Shipping Conditions.
     * General shipping strategy for the delivery of goods from the vendor to the customer.
     * You can define shipping conditions in your system which correspond to the requirements of your company. You can specify a shipping condition in the customer master and in the vendor master.Shipping point determination (outbound delivery):The loading group, the plant and the shipping condition determine the shipping point that will be proposed by the system.Route determination (outbound delivery):Apart from the country and the geographical region of the shipping point, the ship-to party and the transportation group, the shipping condition determines the route that the system proposes in the order for the delivery of the goods. In the delivery, the route proposal also takes the weight group into account.A particular customer always requires immediate delivery. You enter the appropriate shipping condition into the customer master record. This means that when you process orders for this customer, the system automatically proposes the express mail room as a shipping point and the quickest way to the airport as a route.If a shipping condition has been assigned to a sales document type in Customizing, this condition will be proposed by the system in the corresponding sales document. If there is no assignment, the system copies the relevant data from the corresponding customer master record of the sold-to party. You cannot change this value during delivery processing. The shipping condition will not be copied from the delivery into the shipment. The shipping condition is one of several criteria for selecting deliveries when you create a shipment. You can enter a shipping condition manually in the shipment where it only serves as a characteristic for grouping shipments.
     * Maximum length: 2.
     * @nullable
     */
    shippingCondition?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * ABC indicator.
     * Means of classifying suppliers according to their significance to your company.
     * The indicator serves to assign the supplier to one of the categories A, B or C, in accordance with ABC analysis.'A' category suppliers, for instance, are those accounting for the greatest share of the company's total annual spend (in value terms).
     * Maximum length: 1.
     * @nullable
     */
    supplierAbcClassificationCode?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Supplier's Telephone Number.
     * This telephone number is maintained in the supplier master record and adopted in the purchasing document.
     * Maximum length: 16.
     * @nullable
     */
    supplierPhoneNumber?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Responsible Salesperson at Supplier's Office.
     * The name of a contact on the supplier side can be freely maintained.
     * There is no relation to any other data in the system, for examplebusiness partner.
     * Maximum length: 30.
     * @nullable
     */
    supplierRespSalesPersonName?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Confirmation Control Key.
     * Determines which confirmation categories are expected for a PO item (e.g. order acknowledgment, shipping notification).
     * Maximum length: 4.
     * @nullable
     */
    supplierConfirmationControlKey?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Order Acknowledgment Requirement.
     * Determines whether the purchasing document (purchase order, outline purchase agreement, etc.) is to be acknowledged by the supplier.
     * @nullable
     */
    isOrderAcknRqd?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * Authorization Group.
     * The authorization group allows extended authorization protection for particular objects. The authorization groups are freely definable. The authorization groups usually occur in authorization objects together with an activity.
     * Maximum length: 4.
     * @nullable
     */
    authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Supplier Account Group.
     * The account group is a classifying feature within vendor master records. The account group determines:
     * the number interval for the account number of the vendor,whether the number is assigned by the user or by the system,which specifications are necessary and/or possible in the master record.
     * Maximum length: 4.
     * @nullable
     */
    supplierAccountGroup?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * One-to-many navigation property to the [[SupplierPartnerFunc]] entity.
     */
    toPartnerFunction: SupplierPartnerFunc<T>[];
    /**
     * One-to-many navigation property to the [[SupplierPurchasingOrgText]] entity.
     */
    toPurchasingOrgText: SupplierPurchasingOrgText<T>[];
}
export interface SupplierPurchasingOrgType<T extends DeSerializers = DefaultDeSerializers> {
    supplier: DeserializedType<T, 'Edm.String'>;
    purchasingOrganization: DeserializedType<T, 'Edm.String'>;
    calculationSchemaGroupCode?: DeserializedType<T, 'Edm.String'> | null;
    deletionIndicator?: DeserializedType<T, 'Edm.Boolean'> | null;
    incotermsClassification?: DeserializedType<T, 'Edm.String'> | null;
    incotermsTransferLocation?: DeserializedType<T, 'Edm.String'> | null;
    incotermsVersion?: DeserializedType<T, 'Edm.String'> | null;
    incotermsLocation1?: DeserializedType<T, 'Edm.String'> | null;
    incotermsLocation2?: DeserializedType<T, 'Edm.String'> | null;
    invoiceIsGoodsReceiptBased?: DeserializedType<T, 'Edm.Boolean'> | null;
    materialPlannedDeliveryDurn?: DeserializedType<T, 'Edm.Decimal'> | null;
    minimumOrderAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
    paymentTerms?: DeserializedType<T, 'Edm.String'> | null;
    pricingDateControl?: DeserializedType<T, 'Edm.String'> | null;
    purOrdAutoGenerationIsAllowed?: DeserializedType<T, 'Edm.Boolean'> | null;
    purchaseOrderCurrency?: DeserializedType<T, 'Edm.String'> | null;
    purchasingGroup?: DeserializedType<T, 'Edm.String'> | null;
    purchasingIsBlockedForSupplier?: DeserializedType<T, 'Edm.Boolean'> | null;
    shippingCondition?: DeserializedType<T, 'Edm.String'> | null;
    supplierAbcClassificationCode?: DeserializedType<T, 'Edm.String'> | null;
    supplierPhoneNumber?: DeserializedType<T, 'Edm.String'> | null;
    supplierRespSalesPersonName?: DeserializedType<T, 'Edm.String'> | null;
    supplierConfirmationControlKey?: DeserializedType<T, 'Edm.String'> | null;
    isOrderAcknRqd?: DeserializedType<T, 'Edm.Boolean'> | null;
    authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
    supplierAccountGroup?: DeserializedType<T, 'Edm.String'> | null;
    toPartnerFunction: SupplierPartnerFuncType<T>[];
    toPurchasingOrgText: SupplierPurchasingOrgTextType<T>[];
}
// # sourceMappingURL=SupplierPurchasingOrg.d.ts.map
