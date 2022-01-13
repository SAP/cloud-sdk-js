/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';
import { CustomerCompany, CustomerCompanyType } from './CustomerCompany';
import { CustomerSalesArea, CustomerSalesAreaType } from './CustomerSalesArea';
import { CustomerTaxGrouping, CustomerTaxGroupingType } from './CustomerTaxGrouping';
import { CustomerText, CustomerTextType } from './CustomerText';
import { CustomerUnloadingPoint, CustomerUnloadingPointType } from './CustomerUnloadingPoint';

/**
 * This class represents the entity "A_Customer" of service "API_BUSINESS_PARTNER".
 */
export class Customer<T extends DeSerializers = DefaultDeSerializers> extends Entity implements CustomerType<T> {
  /**
   * Technical entity name for Customer.
   */
  static _entityName = 'A_Customer';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_BUSINESS_PARTNER';
  /**
   * All key fields of the Customer entity
   */
  static _keys = ['Customer'];
  /**
   * Customer Number.
   * Gives an alphanumeric key, which clearly identifies the customer or vendor in the SAP system.
   * Maximum length: 10.
   */
  customer!: DeserializedType<T, 'Edm.String'>;
  /**
   * Authorization Group.
   * The authorization group allows extended authorization protection for particular objects. The authorization groups are freely definable. The authorization groups usually occur in authorization objects together with an activity.
   * Maximum length: 4.
   * @nullable
   */
  authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Central Billing Block for Customer.
   * Indicates if the processing of billing documents is blocked for the customer in all sales areas (company-wide, for example).
   * You can define different kinds of block, according to the needs of your organization. You can, for example, automatically block the processing of all credit memos to a certain customer, pending manual approval.
   * Maximum length: 2.
   * @nullable
   */
  billingIsBlockedForCustomer?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Name of Person who Created the Object.
   * Name with which the user who entered the master record was logged on in the R/3 System.
   * Maximum length: 12.
   * @nullable
   */
  createdByUser?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Record Created On.
   * Date on which the master record, or the part of the master record being viewed, was created.
   * @nullable
   */
  creationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Customer Account Group.
   * The account group is a classifying feature within customer master records. The account group determines:
   * in which number range the customer account number should be;whether the number is assigned by the user or by the system;which specifications are necessary or possible in the master record.
   * Maximum length: 4.
   * @nullable
   */
  customerAccountGroup?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Customer Classification.
   * Specifies a classification of the customer (for example, classifies the customer as a bulk purchaser).
   * The classifications are freely definable according to the needs of your organization.
   * Maximum length: 2.
   * @nullable
   */
  customerClassification?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Customer Full Name.
   * Maximum length: 220.
   * @nullable
   */
  customerFullName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Name of Customer.
   * Maximum length: 80.
   * @nullable
   */
  customerName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Central delivery block for the customer.
   * Indicates if delivery processing is blocked for the customer in all sales areas (company-wide, for example).
   * You can define different kinds of block, according to the needs of your organization. You can, for example, automatically block all deliveries to a certain customer for credit reasons.
   * Maximum length: 2.
   * @nullable
   */
  deliveryIsBlocked?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Natural Person.
   * Denotes a natural person.
   * In the following countries, the system needs to know whether the taxpayer is a legal or natural person so that it can check the tax numbers correctly:BrazilBulgariaColombiaCroatiaGreeceItalyMexicoPeruSloveniaThailandUkraineThe flag is also used in conjunction with the Statement of Payments to Natural Persons report, as used in the Czech Republic and in Slovakia. This report only covers customers and vendors for whom you have set this indicator.In South Korea, it is used in conjunction with the Generic Withholding Tax Reporting program.
   * Maximum length: 1.
   * @nullable
   */
  nfPartnerIsNaturalPerson?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Central Order Block for Customer.
   * Indicates if sales order processing is blocked for the customer in all sales areas (company-wide, for example).
   * If you block sales order processing, the block counts for the following partner functions of the customer:Sold-to partyShip-to partyPayerIf you want to process an order where the ship-to party differs from the sold-to party, and the ship-to party is blocked, you cannot process the order.You can define different kinds of block, according to the needs of your organization. You can, for example, automatically block all free of charge deliveries and credit memo requests for a certain customer, pending manual approval before further processing can take place.
   * Maximum length: 2.
   * @nullable
   */
  orderIsBlockedForCustomer?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Central Posting Block.
   * Indicates that the account is blocked for posting for all company codes.
   * If you set this indicator, the system prevents users from posting items to this account and issues an error message to inform them that the account is blocked.
   * @nullable
   */
  postingIsBlocked?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Account Number of Supplier.
   * Specifies an alphanumeric key that uniquely identifies the supplier in the SAP system.
   * Maximum length: 10.
   * @nullable
   */
  supplier?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Group Key.
   * If the customer or the vendor belongs to a group, you can enter a group key here. The group key is freely assignable.
   * If you create a matchcode using this group key, group evaluations are possible.
   * Maximum length: 10.
   * @nullable
   */
  customerCorporateGroup?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Account number of the master record with the fiscal address.
   * Account number of another master record in which the official address is stored. This address is used, for example, for tax reports to the tax authorities in Italy.
   * Maximum length: 10.
   * @nullable
   */
  fiscalAddress?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Industry key.
   * An industry is a distinct group of companies with the same basic business activity. The industry key is used in selecting data for evaluations (for example, a vendor master data list). You can specify industries such as trade, banking, service, manufacturing, health care, public service, media and so on.
   * The industry field belongs to the general data area of customer and vendor master records.
   * Maximum length: 4.
   * @nullable
   */
  industry?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Industry Code 1.
   * Specifies the code that uniquely identifies the industry (or industries) of the customer.
   * Depending on the standards your organization uses (for example, Standard Industry Codes (SIC)), enter the appropriate code. You can assign more than one industry code to a customer by choosing Create more.
   * Maximum length: 10.
   * @nullable
   */
  industryCode1?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Industry Code 2.
   * Specifies an additional code that identifies the industry (or industries) of the customer.
   * Depending on the standards your organization uses (for example, Standard Industry Codes (SIC)), enter the appropriate code.
   * Maximum length: 10.
   * @nullable
   */
  industryCode2?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Industry Code 3.
   * Specifies an additional code that identifies the industry (or industries) of the customer.
   * Depending on the standards your organization uses (for example, Standard Industry Codes (SIC)), enter the appropriate code.
   * Maximum length: 10.
   * @nullable
   */
  industryCode3?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Industry Code 4.
   * Specifies an additional code that identifies the industry (or industries) of the customer.
   * Depending on the standards your organization uses (for example, Standard Industry Codes (SIC)), enter the appropriate code.
   * Maximum length: 10.
   * @nullable
   */
  industryCode4?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Industry Code 5.
   * Specifies an additional code that identifies the industry (or industries) of the customer.
   * Depending on the standards your organization uses (for example, Standard Industry Codes (SIC)), enter the appropriate code.
   * Maximum length: 10.
   * @nullable
   */
  industryCode5?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * International location number  (part 1).
   * Here you enter the first 7 digits of the international location number.
   * The International Location Number (ILN) is assigned (in Germany by the Centrale for Coorganisation GmbH)) when a company is founded. It consists of 13 digits, the last digit being the check digit. There are two categories of location numbers:Participants who only need an ILN to cleary and unmistakably identify themselves for communication with the business partner are given a category 1 ILN. This cannot be used to identify articles by means of EAN.Participants who wish to assign the location numbers for their own enterprise areas are given a category 2 ILN. For a category 2 ILN, digits 1 to 7 are described as basis number. This is used as basis for the creation of article numbers (EAN).
   * Maximum length: 7.
   * @nullable
   */
  internationalLocationNumber1?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Nielsen ID.
   * Specifies a regional division according to the market categories created by the A. C. Nielsen company.
   * By allocating a Nielsen division, you can use the services of the Nielsen Institute to create a market analysis of your customers.
   * Maximum length: 2.
   * @nullable
   */
  nielsenRegion?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Type.
   * Classification of companies according to tax aspects.
   * Maximum length: 2.
   * @nullable
   */
  responsibleType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Number 1.
   * Specifies the tax number.
   * Enter the appropriate tax number:Country/Region Tax NumberArgentina  CUIT number or CUIL numberBelgium Enterprise numberBrazil  CNPJ numberBulgaria Unified identification codeChile RUT numberChina VAT registration number (shui wu deng ji hao)Colombia NIT numberCroatia Legal persons: company identification numberNatural persons: JMBG numberCzech Republic  DIC numberFrance SIRET numberGreece Personal IDHungary  Tax numberItaly Fiscal codeKazakhstan RNN (obsolete)Mexico RFC numberNetherlands SI registration number (Aansluitnummer UWV) of chain- liability vendorNorway VAT numberPeru RUC numberPhilippines Taxpayer identification number (see below)Poland NIP numberPortugal  NIF numberRomania Tax numberRussia INNSlovakia  DIC numberSlovenia Tax numberSouth Korea Natural persons: Personal identification numberLegal persons: Corporation IDSpain NIF numberSwitzerland  UID numberTaiwan GUI registration numberThailand Personal IDTurkey Name of business partner's tax officeUkraine Taxpayer identification numberUnited Kingdom Company registration numberUnited States Social security numberVenezuela  RIF numberIn the Philippines, enter the taxpayer identification number with a V or N at the end, as follows:If the business partner is liable to VAT: 999-999-999-999VIf the business partner is not liable to VAT: 999-999-999-999N.
   * Maximum length: 16.
   * @nullable
   */
  taxNumber1?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Number 2.
   * Specifies the tax number.
   * Enter the appropriate tax number:Country/Region Tax NumberArgentina NIP number or CM numberBelgium VAT numberBrazil  CPF numberBulgaria Legal persons: tax numberNatural persons: personal IDCroatia OIB number Czech Republic  ICO numberFrance SIREN numberGreece AFM numberIndia TINItaly  VAT numberKazakhstan BC (Beneficiary Code)Netherlands BSN numberNorway Organization registration numberRussia OKPO codeSlovakia  ICO numberSouth Korea VAT registration numberSweden Organization registration numberSwitzerland VAT numberTaiwan Tax registration numberUkraine Legal persons: USREOU numberNatural persons: SRNP numberTurkey Tax numberUnited Kingdom NI numberUnited States Employer identification numberVenezuela NIT number.
   * Maximum length: 11.
   * @nullable
   */
  taxNumber2?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Number 3.
   * Specifies the tax number.
   * Enter the tax number that applies:Country Tax numberArgentina Withholding agent numberBrazil State tax numberBulgaria Social security numberMexico CURP numberKazakhstan BINNetherlands Tax registration number (Loonbelastingnummer) of the chain-liability vendorRussia KPP numberThailand Tax ID     Ukraine VAT registration number.
   * Maximum length: 18.
   * @nullable
   */
  taxNumber3?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Number 4.
   * Specifies the tax number.
   * Enter the appropriate tax number:Country Tax NumberBrazil Municipal tax numberKazakhstan IINRussia OFK number (for public bodies only).
   * Maximum length: 18.
   * @nullable
   */
  taxNumber4?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Number 5.
   * Kazakhstan
   * Specifies the certificate of registration as VAT payer in the following format: XXXXXYYYYYYYZZZZZZZZ, where: XXXXX is the certificate serial number, YYYYYYY is the certificate number and ZZZZZZZZ is the date of certificate issue.
   * Maximum length: 60.
   * @nullable
   */
  taxNumber5?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Number Type.
   * Taxes in Argentina:
   * The format and the check of tax number 1 depend on the two-digit tax number type.The tax number type is an identification type for tax in Argentina (for example, 80 for CUIT) and is used for the DGI tax report.
   * Maximum length: 2.
   * @nullable
   */
  taxNumberType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * VAT Registration Number.
   * VAT registration number (VAT reg.no.) of the customer, vendor or your company code.
   * The VAT registration number is used within the EU for tax-exempt deliveries for the "EC sales list". The check rules are defined for each EU country and cannot be changed.
   * Maximum length: 20.
   * @nullable
   */
  vatRegistration?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Central Deletion Flag for Master Record.
   * Indicates that all data in this master record is to be deleted.
   * To delete this data, you have to run the archiving program for Accounts Receivable or Payable. This program will archive all master records marked for deletion provided that there is no dependent data in them.Deletion flags can also be used in the program for deleting master data. You should, however, run this program only to delete test data prior to production startup.
   * @nullable
   */
  deletionIndicator?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Express train station.
   * The name of the train station that the customer uses to receive express deliveries.
   * The express train station may differ from the station that the customer uses for routine deliveries.
   * Maximum length: 25.
   * @nullable
   */
  expressTrainStationName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Train station.
   * The name of the train station that the customer uses for receiving routine deliveries.
   * The train station may differ from the station that the customer uses for express deliveries.
   * Maximum length: 25.
   * @nullable
   */
  trainStationName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * City Code.
   * This key is used for classifying cities from a tax point of view. This is a finer sub-division than the county code.
   * Currently the key is used only in the USA for handling city tax.
   * Maximum length: 4.
   * @nullable
   */
  cityCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * County Code.
   * Key used to classify cities from the point of view of taxes.
   * Currently the county code is used in the USA for handling county tax, and in Denmark to define the municipality number of the employee's first place of residence.
   * Maximum length: 3.
   * @nullable
   */
  county?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * One-to-many navigation property to the [[CustomerCompany]] entity.
   */
  toCustomerCompany!: CustomerCompany<T>[];
  /**
   * One-to-many navigation property to the [[CustomerSalesArea]] entity.
   */
  toCustomerSalesArea!: CustomerSalesArea<T>[];
  /**
   * One-to-many navigation property to the [[CustomerTaxGrouping]] entity.
   */
  toCustomerTaxGrouping!: CustomerTaxGrouping<T>[];
  /**
   * One-to-many navigation property to the [[CustomerText]] entity.
   */
  toCustomerText!: CustomerText<T>[];
  /**
   * One-to-many navigation property to the [[CustomerUnloadingPoint]] entity.
   */
  toCustomerUnloadingPoint!: CustomerUnloadingPoint<T>[];
}

export interface CustomerType<T extends DeSerializers = DefaultDeSerializers> {
  customer: DeserializedType<T, 'Edm.String'>;
  authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
  billingIsBlockedForCustomer?: DeserializedType<T, 'Edm.String'> | null;
  createdByUser?: DeserializedType<T, 'Edm.String'> | null;
  creationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  customerAccountGroup?: DeserializedType<T, 'Edm.String'> | null;
  customerClassification?: DeserializedType<T, 'Edm.String'> | null;
  customerFullName?: DeserializedType<T, 'Edm.String'> | null;
  customerName?: DeserializedType<T, 'Edm.String'> | null;
  deliveryIsBlocked?: DeserializedType<T, 'Edm.String'> | null;
  nfPartnerIsNaturalPerson?: DeserializedType<T, 'Edm.String'> | null;
  orderIsBlockedForCustomer?: DeserializedType<T, 'Edm.String'> | null;
  postingIsBlocked?: DeserializedType<T, 'Edm.Boolean'> | null;
  supplier?: DeserializedType<T, 'Edm.String'> | null;
  customerCorporateGroup?: DeserializedType<T, 'Edm.String'> | null;
  fiscalAddress?: DeserializedType<T, 'Edm.String'> | null;
  industry?: DeserializedType<T, 'Edm.String'> | null;
  industryCode1?: DeserializedType<T, 'Edm.String'> | null;
  industryCode2?: DeserializedType<T, 'Edm.String'> | null;
  industryCode3?: DeserializedType<T, 'Edm.String'> | null;
  industryCode4?: DeserializedType<T, 'Edm.String'> | null;
  industryCode5?: DeserializedType<T, 'Edm.String'> | null;
  internationalLocationNumber1?: DeserializedType<T, 'Edm.String'> | null;
  nielsenRegion?: DeserializedType<T, 'Edm.String'> | null;
  responsibleType?: DeserializedType<T, 'Edm.String'> | null;
  taxNumber1?: DeserializedType<T, 'Edm.String'> | null;
  taxNumber2?: DeserializedType<T, 'Edm.String'> | null;
  taxNumber3?: DeserializedType<T, 'Edm.String'> | null;
  taxNumber4?: DeserializedType<T, 'Edm.String'> | null;
  taxNumber5?: DeserializedType<T, 'Edm.String'> | null;
  taxNumberType?: DeserializedType<T, 'Edm.String'> | null;
  vatRegistration?: DeserializedType<T, 'Edm.String'> | null;
  deletionIndicator?: DeserializedType<T, 'Edm.Boolean'> | null;
  expressTrainStationName?: DeserializedType<T, 'Edm.String'> | null;
  trainStationName?: DeserializedType<T, 'Edm.String'> | null;
  cityCode?: DeserializedType<T, 'Edm.String'> | null;
  county?: DeserializedType<T, 'Edm.String'> | null;
  toCustomerCompany: CustomerCompanyType<T>[];
  toCustomerSalesArea: CustomerSalesAreaType<T>[];
  toCustomerTaxGrouping: CustomerTaxGroupingType<T>[];
  toCustomerText: CustomerTextType<T>[];
  toCustomerUnloadingPoint: CustomerUnloadingPointType<T>[];
}
