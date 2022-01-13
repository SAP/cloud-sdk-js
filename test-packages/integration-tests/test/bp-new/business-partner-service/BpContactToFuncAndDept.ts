/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';

/**
 * This class represents the entity "A_BPContactToFuncAndDept" of service "API_BUSINESS_PARTNER".
 */
export class BpContactToFuncAndDept<T extends DeSerializers = DefaultDeSerializers> extends Entity implements BpContactToFuncAndDeptType<T> {
  /**
   * Technical entity name for BpContactToFuncAndDept.
   */
  static _entityName = 'A_BPContactToFuncAndDept';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_BUSINESS_PARTNER';
  /**
   * All key fields of the BpContactToFuncAndDept entity
   */
  static _keys = ['RelationshipNumber', 'BusinessPartnerCompany', 'BusinessPartnerPerson', 'ValidityEndDate'];
  /**
   * BP Relationship Number.
   * The business partner relationship number is an internal number that identifies the business partner relationship set.
   * Maximum length: 12.
   */
  relationshipNumber!: DeserializedType<T, 'Edm.String'>;
  /**
   * Business Partner Number.
   * Key identifying a business partner in the SAP system. The key is unique within a client.
   * Maximum length: 10.
   */
  businessPartnerCompany!: DeserializedType<T, 'Edm.String'>;
  /**
   * Business Partner Number.
   * Key identifying a business partner in the SAP system. The key is unique within a client.
   * Maximum length: 10.
   */
  businessPartnerPerson!: DeserializedType<T, 'Edm.String'>;
  /**
   * Validity Date (Valid To).
   */
  validityEndDate!: DeserializedType<T, 'Edm.DateTime'>;
  /**
   * Function of partner.
   * Identifies the function that a person has within a company.
   * This is a contact person attribute that you can define in Customizing.Personnel managerSecretary.
   * Maximum length: 4.
   * @nullable
   */
  contactPersonFunction?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Department.
   * Name of the department of a business partner for your internal usage.
   * The name given by the business partner to this particular department may differ from the name that you use. You can enter the name given by the business partner in the field company department.This is a contact person attribute that you can define in Customizing.For your purposes, the department name is "Sales". The business partner names the same department "Sales South".
   * Maximum length: 4.
   * @nullable
   */
  contactPersonDepartment?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Telephone No.: Dialing Code + Number.
   * Telephone number, consisting of dialling code and number, but without country dialling code.
   * If the telephone number consists of a company number and an extension, the extension must be entered in the field extension.Telephone number, as it is dialled from within the country.For the number "01234/567-0" enter the following:Telephone: 01234/567Estension: 0For the number "01234/567-891" enter the following:Telephone: 01234/567Extension: 891For the number "012-345-678" (678 as extension) enter the following:Telepone: 012-345Extension: 678In the following cases enter the complete number (without country dialling code) in the field Telephone:No part of the number can be regarded as an extension.You are not sure which part of the number can be regarded as an extension.
   * Maximum length: 30.
   * @nullable
   */
  phoneNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Telephone no.: Extension.
   * Telephone extension number
   * If the telephone number consists of a company number and an extension, the extension should be entered here.Enter the extension.The following rules apply for the format of telephone and fax numbers:The length of the entries in the field Telephone and Extension (Fax and Extension) cannot be more than 24 characters in total.Leading spaces are not allowed in the field Telephone or Fax or in the field Extension.Valid characters are:Numbers (0123456789)Letters (ABCDEFGHIJKLMNOPQRSTUVWXYZ)Following other characters:  /, (, ), - *, # and " " (space), but not as a leading space.If an + is entered as the first character, the system checks whether the specified number starts with a country code. If so, a warning message is displayed because the country code is automatically determined by the system and should not be stored in the Telephone number (Fax number) field.If an &amp; is entered as the first character, the automatic check and formatting of the telephone number (fax number), as well as the determination of the country code, is suppressed.For the number "01234/567-0" enter the following:Telephone: 01234/567Estension: 0For the number "01234/567-891" enter the following:Telephone: 01234/567Extension: 891For the number "012-345-678" (678 as extension) enter the following:Telepone: 012-345Extension: 678In the following cases enter the complete number (without country dialling code) in the field Telephone:No part of the number can be regarded as an extension.You are not sure which part of the number can be regarded as an extension.
   * Maximum length: 10.
   * @nullable
   */
  phoneNumberExtension?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Fax Number: Dialing Code+Number.
   * Fax number, consisting of dialling code and number, but without country dialling code.
   * If the fax number consists of a company number and an extension, the extension must be entered in the field extension.Fax number, as it is to be dialled from within the same country.Enter the following for the number "01234/567-0":Fax: 01234/567Extension: 0Enter the following for the number "01234/567-891":Fax: 01234/567Extension: 891For the number "012-345-678" (678 as extension) enter the following:Fax: 012-345Extension: 678In the following cases, enter the complete number (without country dialing code) in the field Fax:No part of the number can be considered as an extension.You are not sure which part of the number can be considered as an extension.
   * Maximum length: 30.
   * @nullable
   */
  faxNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Fax no.: Extension.
   * Fax extension number
   * If the fax number consists of a company number and an extension, the extension must be entered here.Enter the extensionThe following rules apply for the format of telephone and fax numbers:The length of the entries in the field Telephone and Extension (Fax and Extension) cannot be more than 24 characters in total.Leading spaces are not allowed in the field Telephone or Fax or in the field Extension.Valid characters are:Numbers (0123456789)Letters (ABCDEFGHIJKLMNOPQRSTUVWXYZ)Following other characters:  /, (, ), - *, # and " " (space), but not as a leading space.If an + is entered as the first character, the system checks whether the specified number starts with a country code. If so, a warning message is displayed because the country code is automatically determined by the system and should not be stored in the Telephone number (Fax number) field.If an &amp; is entered as the first character, the automatic check and formatting of the telephone number (fax number), as well as the determination of the country code, is suppressed.Enter the following for the number "01234/567-0":Fax: 01234/567Extension: 0Enter the following for the number "01234/567-891":Fax: 01234/567Extension: 891For the number "012-345-678" (678 as extension) enter the following:Fax: 012-345Extension: 678In the following cases, enter the complete number (without country dialing code) in the field Fax:No part of the number can be considered as an extension.You are not sure which part of the number can be considered as an extension.
   * Maximum length: 10.
   * @nullable
   */
  faxNumberExtension?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Email Address.
   * Internet mail address, also called e-mail address.
   * Example: user.name@company.comThe Internet mail address is used to send mail via the Internet world-wide; the protocol used is SMTP (Simple Mail Transfer Protocol).The Internet mail address format is specified in various RFCs (Internet Request for Comment), including RFCs 821 and 822.This is not an IP address (192.56.30.6).
   * Maximum length: 241.
   * @nullable
   */
  emailAddress?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Business Partner Relationship Category.
   * A relationship may exist between two business partners. The business partner relationship category characterizes the features of the relationship.
   * A distinction is made between a one-way and an undirected business partner relationship category. In a one-way relationship category, the relationship extends from one partner to another, but not vice versa.Marriage (undirected)Employee (one-way)Contact person (one-way).
   * Maximum length: 6.
   * @nullable
   */
  relationshipCategory?: DeserializedType<T, 'Edm.String'> | null;
}

export interface BpContactToFuncAndDeptType<T extends DeSerializers = DefaultDeSerializers> {
  relationshipNumber: DeserializedType<T, 'Edm.String'>;
  businessPartnerCompany: DeserializedType<T, 'Edm.String'>;
  businessPartnerPerson: DeserializedType<T, 'Edm.String'>;
  validityEndDate: DeserializedType<T, 'Edm.DateTime'>;
  contactPersonFunction?: DeserializedType<T, 'Edm.String'> | null;
  contactPersonDepartment?: DeserializedType<T, 'Edm.String'> | null;
  phoneNumber?: DeserializedType<T, 'Edm.String'> | null;
  phoneNumberExtension?: DeserializedType<T, 'Edm.String'> | null;
  faxNumber?: DeserializedType<T, 'Edm.String'> | null;
  faxNumberExtension?: DeserializedType<T, 'Edm.String'> | null;
  emailAddress?: DeserializedType<T, 'Edm.String'> | null;
  relationshipCategory?: DeserializedType<T, 'Edm.String'> | null;
}
