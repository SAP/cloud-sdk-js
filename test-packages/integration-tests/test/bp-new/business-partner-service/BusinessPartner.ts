/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';
import { BuPaIdentification, BuPaIdentificationType } from './BuPaIdentification';
import { BuPaIndustry, BuPaIndustryType } from './BuPaIndustry';
import { BusinessPartnerAddress, BusinessPartnerAddressType } from './BusinessPartnerAddress';
import { BusinessPartnerBank, BusinessPartnerBankType } from './BusinessPartnerBank';
import { BusinessPartnerContact, BusinessPartnerContactType } from './BusinessPartnerContact';
import { BusinessPartnerRole, BusinessPartnerRoleType } from './BusinessPartnerRole';
import { BusinessPartnerTaxNumber, BusinessPartnerTaxNumberType } from './BusinessPartnerTaxNumber';
import { Customer, CustomerType } from './Customer';
import { Supplier, SupplierType } from './Supplier';

/**
 * This class represents the entity "A_BusinessPartner" of service "API_BUSINESS_PARTNER".
 */
export class BusinessPartner<T extends DeSerializers = DefaultDeSerializers> extends Entity implements BusinessPartnerType<T> {
  /**
   * Technical entity name for BusinessPartner.
   */
  static _entityName = 'A_BusinessPartner';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_BUSINESS_PARTNER';
  /**
   * All key fields of the BusinessPartner entity
   */
  static _keys = ['BusinessPartner'];
  /**
   * Business Partner Number.
   * Key identifying a business partner in the SAP system. The key is unique within a client.
   * Maximum length: 10.
   */
  businessPartner!: DeserializedType<T, 'Edm.String'>;
  /**
   * Customer Number.
   * Gives an alphanumeric key, which clearly identifies the customer or vendor in the SAP system.
   * Maximum length: 10.
   * @nullable
   */
  customer?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Account Number of Supplier.
   * Specifies an alphanumeric key that uniquely identifies the supplier in the SAP system.
   * Maximum length: 10.
   * @nullable
   */
  supplier?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Academic Title: Key.
   * Key for academic title.
   * You can define a key for an academic title in Customizing.
   * Maximum length: 4.
   * @nullable
   */
  academicTitle?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Authorization Group.
   * You can use authorization groups to stipulate which business partners a user is allowed to process.
   * Use the following authorization object:'Business partners: authorization groups' (B_BUPA_GRP).The system only checks this authorization if you made an entry in the "Authorization group" field for the business partner. Otherwise, any user may process the business partner.
   * Maximum length: 4.
   * @nullable
   */
  authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Business Partner Category.
   * Category under which a business partner is classified.
   * You can distinguish between the following business partner categories:OrganizationNatural personGroup of natural persons or organizationsThe processing screens for the business partner categories are set up differently.So, for example, the screen for an organization contains the field Legal form, but this is not needed in the screen for a natural person.
   * Maximum length: 1.
   * @nullable
   */
  businessPartnerCategory?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Business Partner Full Name.
   * Maximum length: 81.
   * @nullable
   */
  businessPartnerFullName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Business Partner Grouping.
   * Classification assigned when creating a business partner.
   * Assign each business partner to a grouping when you create the business partner. The grouping determines the number range. You cannot change the assignment afterwards.You can define the groupings, their descriptions, the associated number range and other attributes in Customizing.You can define standard groupings for the internal and the external number assignment.For each grouping create a number range.When you create a business partner, the entry in the grouping field determines whether and how an entry is made in the business partner number field.
   * Maximum length: 4.
   * @nullable
   */
  businessPartnerGrouping?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Business Partner Name.
   * Maximum length: 81.
   * @nullable
   */
  businessPartnerName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Business Partner GUID.
   * @nullable
   */
  businessPartnerUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Business Partner: Correspondence Language.
   * Correspondence language (written) for business partners in the 'Person' category. Maintain the correspondence language for business partners in the 'Organization' and 'Group' category with the address (communication).
   * When transferring data (direct input), make sure that for a'Person', the field 'LANGU_CORR' and for an'Organization' or "Group" the field 'LANGU'has an entry.
   * Maximum length: 2.
   * @nullable
   */
  correspondenceLanguage?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * User who created the object.
   * Maximum length: 12.
   * @nullable
   */
  createdByUser?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Date on which the object was created.
   * @nullable
   */
  creationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Time at which the object was created.
   * @nullable
   */
  creationTime?: DeserializedType<T, 'Edm.Time'> | null;
  /**
   * First name of business partner (person).
   * Maximum length: 40.
   * @nullable
   */
  firstName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Form-of-Address Key.
   * Key for form of address text.
   * You can also define a form of address text in Customizing.The form of address text can be maintained in different languages.
   * Maximum length: 4.
   * @nullable
   */
  formOfAddress?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Industry sector.
   * An industry sector is the term used to classify a company according to its main business activity.
   * You can assign an industry sector to business partners in the category 'Organization'RetailBanksServicesIndustryHealth servicePublic sectorMedia.
   * Maximum length: 10.
   * @nullable
   */
  industry?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * International location number  (part 1).
   * Here you enter the first 7 digits of the international location number.
   * The International Location Number (ILN) is assigned (in Germany by the Centrale for Coorganisation GmbH)) when a company is founded. It consists of 13 digits, the last digit being the check digit. There are two categories of location numbers:Participants who only need an ILN to cleary and unmistakably identify themselves for communication with the business partner are given a category 1 ILN. This cannot be used to identify articles by means of EAN.Participants who wish to assign the location numbers for their own enterprise areas are given a category 2 ILN. For a category 2 ILN, digits 1 to 7 are described as basis number. This is used as basis for the creation of article numbers (EAN).
   * Maximum length: 7.
   * @nullable
   */
  internationalLocationNumber1?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * International location number (Part 2).
   * Here, you enter digits 8-12 of the 13-digit international location number.
   * The international location number (ILN) is assigned when establishing a company (by the "Zentrale für Coorganisation GmbH" in Germany). It consists of 13 digits, the last of which is the check digit. There are two types of international location numbers:Subscribers who only need one ILN to identify themselves in communication with the business partner are given an ILN of type 1. These cannot be used for identifying articles by means of EAN.Subscribers who need to assign location numbers for their own company areas are given an ILN of type 2. Positions 1 through 7 of the ILN type 2 are known as the basis number. This basis number forms the basis for article numbers (EAN).
   * Maximum length: 5.
   * @nullable
   */
  internationalLocationNumber2?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Selection: Business partner is female.
   * @nullable
   */
  isFemale?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Selection: Business partner is male.
   * @nullable
   */
  isMale?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Business Partner Is a Natural Person Under the Tax Laws.
   * Indicator through which a distinction between natural and legal persons can be made during tax reporting.
   * Is used in Italy and Mexico ,among other countries.Brasil: If the indicator is not set, 'CGC' is relevant in tax number 1. If the indicator is set, 'CPF' is relevant in tax number 2.Colombia: In the case of some natural persons, the NIT number does not have a check digit. In this case you should set this indicator and the check is deactivated.
   * Maximum length: 1.
   * @nullable
   */
  isNaturalPerson?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Selection: Sex of business partner is not known.
   * @nullable
   */
  isSexUnknown?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Gender of Business Partner (Person).
   * Maximum length: 1.
   * @nullable
   */
  genderCodeName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Business partner: Language.
   * Language for verbal communication with a business partner.
   * This language may differ from the language(s) defined for written correspondence.
   * Maximum length: 2.
   * @nullable
   */
  language?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Date when object was last changed.
   * @nullable
   */
  lastChangeDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Time at which object was last changed.
   * @nullable
   */
  lastChangeTime?: DeserializedType<T, 'Edm.Time'> | null;
  /**
   * Last user to change object.
   * Maximum length: 12.
   * @nullable
   */
  lastChangedByUser?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Last name of business partner (person).
   * Maximum length: 40.
   * @nullable
   */
  lastName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Legal form of organization.
   * Denotes certain legal norms that are of significance for the organization of a company.
   * For business partners in the category "Organization", you can state the legal form of the company. This is for information purposes only.Stock corporation (AG in Germany)Limited liability company (GmbH in Germany).
   * Maximum length: 2.
   * @nullable
   */
  legalForm?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Name 1 of organization.
   * First name field for business partners in the Organization category.
   * Maximum length: 40.
   * @nullable
   */
  organizationBpName1?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Name 2 of organization.
   * Second name field for business partners in the Organization category.
   * Maximum length: 40.
   * @nullable
   */
  organizationBpName2?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Name 3 of organization.
   * Third name field for business partners in the Organization category.
   * Maximum length: 40.
   * @nullable
   */
  organizationBpName3?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Name 4 of organization.
   * Fourth name field for business partners in the Organization category.
   * Maximum length: 40.
   * @nullable
   */
  organizationBpName4?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Date organization founded.
   * Indicates the official registration of a company in the Commercial Register.
   * If a company is not officially registered in the Commercial Register, it has to use some type of text addition, such as foundation pending, when referring to the legal form.
   * @nullable
   */
  organizationFoundationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Liquidation date of organization.
   * Term for the end of bankruptcy proceedings.
   * This date also indicates that the company no longer exists.
   * @nullable
   */
  organizationLiquidationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Search Term 1 for Business Partner.
   * Denotes the term that you define for a business partner, and via which you can restrict the search for a business partner in the business partner search or in the locator.
   * Maximum length: 20.
   * @nullable
   */
  searchTerm1?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Search Term 2 for Business Partner.
   * Denotes the term that you define for a business partner, and via which you can restrict the search for a business partner in the business partner search or in the locator.
   * Maximum length: 20.
   * @nullable
   */
  searchTerm2?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Other Last Name of a Person.
   * Maximum length: 40.
   * @nullable
   */
  additionalLastName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Date of Birth of Business Partner.
   * @nullable
   */
  birthDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Date of Birth: Status.
   * If the Business partner's actual birthdate is unknown, a partial entry can be made or read. This field then indicates which part of the birthdate is unknown. Below are some examples (Dates are specified in format MM/DD/YYYY):
   * 01/01/0000 =&gt; 01/01/1880 Year unknown00/01/1911 =&gt; 01/01/1911 Month unknown05/00/1911 =&gt; 05/01/1911 Day unknown05/05/1911 =&gt; 05/05/1911 Fully known00/00/1911 =&gt; 05/05/1911 Day &amp; Month unknown00/05/0000 =&gt; 05/05/1911 Month &amp; Year unknown05/00/0000 =&gt; 05/05/1911 Day &amp; Year unknown00/00/0000=&gt; 05/05/1911 Fully unknown'Date of Birth: Status' field determines the unknown parts of birthdate.Enter a valid date under Birthdate. Future dates are not accepted. If any part/s of the date is/are unknown, select the nearest date.If year is unknown, select any random valid year.
   * Maximum length: 1.
   * @nullable
   */
  businessPartnerBirthDateStatus?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Birthplace of business partner.
   * Maximum length: 40.
   * @nullable
   */
  businessPartnerBirthplaceName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Date of death of business partner.
   * @nullable
   */
  businessPartnerDeathDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Central Block for Business Partner.
   * If the business partner is blocked centrally, certain activities cannot be executed.
   * @nullable
   */
  businessPartnerIsBlocked?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Business Partner Type.
   * You can use the business partner type to group business partners according to your own criteria in Customizing (IMG).
   * In Customizing you can show or hide fields for data entry, depending on the requirements of the relevant business partner type.Select a business partner type. You can obtain help by pressing the F4 key.
   * Maximum length: 4.
   * @nullable
   */
  businessPartnerType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * E Tag.
   * Maximum length: 26.
   * @nullable
   */
  eTag?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Name 1 (group).
   * First name field for business partners in the Group category.
   * Maximum length: 40.
   * @nullable
   */
  groupBusinessPartnerName1?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Name 2 (group).
   * Second name field for business partners in the Group category.
   * Maximum length: 40.
   * @nullable
   */
  groupBusinessPartnerName2?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Address Number.
   * Internal key for identifying the address for communication data that spans all addresses in Business Partner.
   * For more information on the significance and usage of the address number, see the documentation for Business Address Services (BAS).
   * Maximum length: 10.
   * @nullable
   */
  independentAddressId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Check digit for the international location number.
   * The check digit is derived from a special check digit procedure from digits of the previous international location numbers. In this way, you can check whether the ILN entered is actually valid.
   * Maximum length: 1.
   * @nullable
   */
  internationalLocationNumber3?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Middle Name or Second Forename of a Person.
   * Maximum length: 40.
   * @nullable
   */
  middleName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Country/Region for Name Format Rule.
   * The country/region for the name format rule and the name format rule key together uniquely identify a formatting rule.
   * A country/region can have several formats which correspond to different rules. You need formatting rules to describe the composition of a person's name.
   * Maximum length: 3.
   * @nullable
   */
  nameCountry?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Name format.
   * See Name format.
   * Maximum length: 2.
   * @nullable
   */
  nameFormat?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Full Name.
   * States the complete name of a person.
   * The complete name is generally generated and saved by the Business Address Services (BAS) according to country-specific rules from the individual name components (without the form of address).If, during the formatting of an address, you want to use an alternative name, you can manually format the alternative name here.
   * Maximum length: 80.
   * @nullable
   */
  personFullName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Person Number.
   * Internal key for identifying a person in Business Address Services.
   * For more information about the meaning and use of the person number and Business Address Services concepts, see the function group SZA0 documentation.
   * Maximum length: 10.
   * @nullable
   */
  personNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Central Archiving Flag.
   * Establishes if the business partner is meant to be archived.
   * If the indicator is set, the relevant business partner can be archived from the view of the business partner administration.If the check of the data to be archived shows, for example,  that there are still active business transactions the archiving of the business partner data is prevented even if the indicator is set.If the indicator is not set, the business partner will not be taken into consideration during archiving.
   * @nullable
   */
  isMarkedForArchiving?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Business Partner Number in External System.
   * Business partner number from an external system or a legacy system.
   * If the current business partner is known under a different number in an external system, you can store this number here for information purposes.Direct input gives you the option of maintaining a business partner by specifying the external business partner number. If you maintain business partner data in your legacy system, you can transmit changes made to business partners to the SAP system without having to know the SAP business partner number in the legacy system.
   * Maximum length: 20.
   * @nullable
   */
  businessPartnerIdByExtSystem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Company ID of Trading Partner.
   * Company ID standard for the whole group.
   * Maximum length: 6.
   * @nullable
   */
  tradingPartner?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * One-to-many navigation property to the [[BuPaIdentification]] entity.
   */
  toBuPaIdentification!: BuPaIdentification<T>[];
  /**
   * One-to-many navigation property to the [[BuPaIndustry]] entity.
   */
  toBuPaIndustry!: BuPaIndustry<T>[];
  /**
   * One-to-many navigation property to the [[BusinessPartnerAddress]] entity.
   */
  toBusinessPartnerAddress!: BusinessPartnerAddress<T>[];
  /**
   * One-to-many navigation property to the [[BusinessPartnerBank]] entity.
   */
  toBusinessPartnerBank!: BusinessPartnerBank<T>[];
  /**
   * One-to-many navigation property to the [[BusinessPartnerContact]] entity.
   */
  toBusinessPartnerContact!: BusinessPartnerContact<T>[];
  /**
   * One-to-many navigation property to the [[BusinessPartnerRole]] entity.
   */
  toBusinessPartnerRole!: BusinessPartnerRole<T>[];
  /**
   * One-to-many navigation property to the [[BusinessPartnerTaxNumber]] entity.
   */
  toBusinessPartnerTax!: BusinessPartnerTaxNumber<T>[];
  /**
   * One-to-one navigation property to the [[Customer]] entity.
   */
  toCustomer?: Customer<T> | null;
  /**
   * One-to-one navigation property to the [[Supplier]] entity.
   */
  toSupplier?: Supplier<T> | null;
}

export interface BusinessPartnerType<T extends DeSerializers = DefaultDeSerializers> {
  businessPartner: DeserializedType<T, 'Edm.String'>;
  customer?: DeserializedType<T, 'Edm.String'> | null;
  supplier?: DeserializedType<T, 'Edm.String'> | null;
  academicTitle?: DeserializedType<T, 'Edm.String'> | null;
  authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
  businessPartnerCategory?: DeserializedType<T, 'Edm.String'> | null;
  businessPartnerFullName?: DeserializedType<T, 'Edm.String'> | null;
  businessPartnerGrouping?: DeserializedType<T, 'Edm.String'> | null;
  businessPartnerName?: DeserializedType<T, 'Edm.String'> | null;
  businessPartnerUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  correspondenceLanguage?: DeserializedType<T, 'Edm.String'> | null;
  createdByUser?: DeserializedType<T, 'Edm.String'> | null;
  creationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  creationTime?: DeserializedType<T, 'Edm.Time'> | null;
  firstName?: DeserializedType<T, 'Edm.String'> | null;
  formOfAddress?: DeserializedType<T, 'Edm.String'> | null;
  industry?: DeserializedType<T, 'Edm.String'> | null;
  internationalLocationNumber1?: DeserializedType<T, 'Edm.String'> | null;
  internationalLocationNumber2?: DeserializedType<T, 'Edm.String'> | null;
  isFemale?: DeserializedType<T, 'Edm.Boolean'> | null;
  isMale?: DeserializedType<T, 'Edm.Boolean'> | null;
  isNaturalPerson?: DeserializedType<T, 'Edm.String'> | null;
  isSexUnknown?: DeserializedType<T, 'Edm.Boolean'> | null;
  genderCodeName?: DeserializedType<T, 'Edm.String'> | null;
  language?: DeserializedType<T, 'Edm.String'> | null;
  lastChangeDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  lastChangeTime?: DeserializedType<T, 'Edm.Time'> | null;
  lastChangedByUser?: DeserializedType<T, 'Edm.String'> | null;
  lastName?: DeserializedType<T, 'Edm.String'> | null;
  legalForm?: DeserializedType<T, 'Edm.String'> | null;
  organizationBpName1?: DeserializedType<T, 'Edm.String'> | null;
  organizationBpName2?: DeserializedType<T, 'Edm.String'> | null;
  organizationBpName3?: DeserializedType<T, 'Edm.String'> | null;
  organizationBpName4?: DeserializedType<T, 'Edm.String'> | null;
  organizationFoundationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  organizationLiquidationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  searchTerm1?: DeserializedType<T, 'Edm.String'> | null;
  searchTerm2?: DeserializedType<T, 'Edm.String'> | null;
  additionalLastName?: DeserializedType<T, 'Edm.String'> | null;
  birthDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  businessPartnerBirthDateStatus?: DeserializedType<T, 'Edm.String'> | null;
  businessPartnerBirthplaceName?: DeserializedType<T, 'Edm.String'> | null;
  businessPartnerDeathDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  businessPartnerIsBlocked?: DeserializedType<T, 'Edm.Boolean'> | null;
  businessPartnerType?: DeserializedType<T, 'Edm.String'> | null;
  eTag?: DeserializedType<T, 'Edm.String'> | null;
  groupBusinessPartnerName1?: DeserializedType<T, 'Edm.String'> | null;
  groupBusinessPartnerName2?: DeserializedType<T, 'Edm.String'> | null;
  independentAddressId?: DeserializedType<T, 'Edm.String'> | null;
  internationalLocationNumber3?: DeserializedType<T, 'Edm.String'> | null;
  middleName?: DeserializedType<T, 'Edm.String'> | null;
  nameCountry?: DeserializedType<T, 'Edm.String'> | null;
  nameFormat?: DeserializedType<T, 'Edm.String'> | null;
  personFullName?: DeserializedType<T, 'Edm.String'> | null;
  personNumber?: DeserializedType<T, 'Edm.String'> | null;
  isMarkedForArchiving?: DeserializedType<T, 'Edm.Boolean'> | null;
  businessPartnerIdByExtSystem?: DeserializedType<T, 'Edm.String'> | null;
  tradingPartner?: DeserializedType<T, 'Edm.String'> | null;
  toBuPaIdentification: BuPaIdentificationType<T>[];
  toBuPaIndustry: BuPaIndustryType<T>[];
  toBusinessPartnerAddress: BusinessPartnerAddressType<T>[];
  toBusinessPartnerBank: BusinessPartnerBankType<T>[];
  toBusinessPartnerContact: BusinessPartnerContactType<T>[];
  toBusinessPartnerRole: BusinessPartnerRoleType<T>[];
  toBusinessPartnerTax: BusinessPartnerTaxNumberType<T>[];
  toCustomer?: CustomerType<T> | null;
  toSupplier?: SupplierType<T> | null;
}
