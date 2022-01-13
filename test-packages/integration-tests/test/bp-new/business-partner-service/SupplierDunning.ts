/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';

/**
 * This class represents the entity "A_SupplierDunning" of service "API_BUSINESS_PARTNER".
 */
export class SupplierDunning<T extends DeSerializers = DefaultDeSerializers> extends Entity implements SupplierDunningType<T> {
  /**
   * Technical entity name for SupplierDunning.
   */
  static _entityName = 'A_SupplierDunning';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_BUSINESS_PARTNER';
  /**
   * All key fields of the SupplierDunning entity
   */
  static _keys = ['Supplier', 'CompanyCode', 'DunningArea'];
  /**
   * Account Number of Supplier.
   * Specifies an alphanumeric key that uniquely identifies the supplier in the SAP system.
   * Maximum length: 10.
   */
  supplier!: DeserializedType<T, 'Edm.String'>;
  /**
   * Company Code.
   * The company code is an organizational unit within financial accounting.
   * Maximum length: 4.
   */
  companyCode!: DeserializedType<T, 'Edm.String'>;
  /**
   * Dunning Area.
   * The dunning area represents an organizational entity that is responsible for dunning. The dunning areas represent a sub-structure of the company codes.
   * If different responsibilities or different dunning procedures exist within a company code, you can set up corresponding dunning areas.All dunning notices are made separately according to dunning areas, and if necessary with different dunning procedures.The dunning area must be noted in the line items. As long as documents are copied from preliminary work areas (billing documents), the dunning area can be derived from details such as division or sales area, if necessary.
   * Maximum length: 2.
   */
  dunningArea!: DeserializedType<T, 'Edm.String'>;
  /**
   * Dunning Block.
   * Key which reflects the reason for a dunning block indicator.
   * Maximum length: 1.
   * @nullable
   */
  dunningBlock?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Dunning Level.
   * Number that specifies how often an item or account has been dunned.
   * The business partner has received the dunning level from the last dunning run.If you use dunning areas, it is the dunning level that the business partner received from the last dunning run in the dunning area assigned.The dunning program sets the dunning level automatically when the customer or vendor receives a dunning notice.
   * Maximum length: 1.
   * @nullable
   */
  dunningLevel?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Dunning Procedure.
   * This field contains the key for the dunning procedure to be used.
   * Maximum length: 4.
   * @nullable
   */
  dunningProcedure?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Account number of the dunning recipient.
   * Account number of the vendor who is to receive the dunning notice.
   * Note:If an entry is not made in this field, the dunning notice is sent to the address of the vendor to be processed.
   * Maximum length: 10.
   * @nullable
   */
  dunningRecipient?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Date of Last Dunning Notice.
   * Date on which the last dunning notice was made.
   * @nullable
   */
  lastDunnedOn?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Date of the Legal Dunning Proceedings.
   * Date on which a legal dunning procedure was initiated.
   * The printing of dunning notices in the legal dunning procedure generates an internal notice about any further account movements. A dunning notice is not created for the customer.If the Legal dunning procedure field in the master record contains a date, this means that the account is involved in a legal dunning procedure. The relationship between this date and the dunning date does not affect how the account is processed.The printing of account movements in the legal dunning procedure differs from the normal printing of dunning notices as follows:You must specify a separate form for your dunning procedure in Customizing. For more information, see Customizing (IMG) under Dunning Forms.The dunning program also displays text element 520 "Legal dunning procedure". This makes it possible to display the date of the legal dunning procedure from the master record.The program also displays the documents blocked for dunning and those with a payment method (automatic debit, bank direct debit).Although dunning notices are printed, the dunning level does not change in the master record or in the items. New dunning level = old dunning level.The program only updates the date of the last dunning run.Enter the date manually.
   * @nullable
   */
  legDunningProcedureOn?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Dunning Clerk.
   * Identification code for the accounting clerk dealing with dunning letters.
   * Using this identification code, the accounting clerk whose name is printed on the dunning letters is determined.If this field is not filled, then the entry from the Accounting clerk field is used.
   * Maximum length: 2.
   * @nullable
   */
  dunningClerk?: DeserializedType<T, 'Edm.String'> | null;
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
}

export interface SupplierDunningType<T extends DeSerializers = DefaultDeSerializers> {
  supplier: DeserializedType<T, 'Edm.String'>;
  companyCode: DeserializedType<T, 'Edm.String'>;
  dunningArea: DeserializedType<T, 'Edm.String'>;
  dunningBlock?: DeserializedType<T, 'Edm.String'> | null;
  dunningLevel?: DeserializedType<T, 'Edm.String'> | null;
  dunningProcedure?: DeserializedType<T, 'Edm.String'> | null;
  dunningRecipient?: DeserializedType<T, 'Edm.String'> | null;
  lastDunnedOn?: DeserializedType<T, 'Edm.DateTime'> | null;
  legDunningProcedureOn?: DeserializedType<T, 'Edm.DateTime'> | null;
  dunningClerk?: DeserializedType<T, 'Edm.String'> | null;
  authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
  supplierAccountGroup?: DeserializedType<T, 'Edm.String'> | null;
}
