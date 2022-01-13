/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';
import { BpContactToAddress, BpContactToAddressType } from './BpContactToAddress';
import { BpContactToFuncAndDept, BpContactToFuncAndDeptType } from './BpContactToFuncAndDept';

/**
 * This class represents the entity "A_BusinessPartnerContact" of service "API_BUSINESS_PARTNER".
 */
export class BusinessPartnerContact<T extends DeSerializers = DefaultDeSerializers> extends Entity implements BusinessPartnerContactType<T> {
  /**
   * Technical entity name for BusinessPartnerContact.
   */
  static _entityName = 'A_BusinessPartnerContact';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_BUSINESS_PARTNER';
  /**
   * All key fields of the BusinessPartnerContact entity
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
   * Validity Date (Valid From).
   * @nullable
   */
  validityStartDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Standard Relationship.
   * States whether the relationship is a standard relationship.
   * If several relationships of the BP relationship category contact person have been defined for, you can set the indicator standard relationship for one of these relationships.A relationship that is marked as a standard relationship can be used whenA certain scenario automatically selects a contact personThe contact person responsible is not knownYou can give this indicator to only one business partner relationship of a BP relationship category for a particular period. Another relationship of the same relationship category can be indicated as the standard relationship only if the periods for the relationship do not overlap or coincide.
   * @nullable
   */
  isStandardRelationship?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Business Partner Relationship Category.
   * A relationship may exist between two business partners. The business partner relationship category characterizes the features of the relationship.
   * A distinction is made between a one-way and an undirected business partner relationship category. In a one-way relationship category, the relationship extends from one partner to another, but not vice versa.Marriage (undirected)Employee (one-way)Contact person (one-way).
   * Maximum length: 6.
   * @nullable
   */
  relationshipCategory?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * One-to-many navigation property to the [[BpContactToAddress]] entity.
   */
  toContactAddress!: BpContactToAddress<T>[];
  /**
   * One-to-one navigation property to the [[BpContactToFuncAndDept]] entity.
   */
  toContactRelationship?: BpContactToFuncAndDept<T> | null;
}

export interface BusinessPartnerContactType<T extends DeSerializers = DefaultDeSerializers> {
  relationshipNumber: DeserializedType<T, 'Edm.String'>;
  businessPartnerCompany: DeserializedType<T, 'Edm.String'>;
  businessPartnerPerson: DeserializedType<T, 'Edm.String'>;
  validityEndDate: DeserializedType<T, 'Edm.DateTime'>;
  validityStartDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  isStandardRelationship?: DeserializedType<T, 'Edm.Boolean'> | null;
  relationshipCategory?: DeserializedType<T, 'Edm.String'> | null;
  toContactAddress: BpContactToAddressType<T>[];
  toContactRelationship?: BpContactToFuncAndDeptType<T> | null;
}
