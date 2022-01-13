/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';

/**
 * This class represents the entity "A_BusinessPartnerRole" of service "API_BUSINESS_PARTNER".
 */
export class BusinessPartnerRole<T extends DeSerializers = DefaultDeSerializers> extends Entity implements BusinessPartnerRoleType<T> {
  /**
   * Technical entity name for BusinessPartnerRole.
   */
  static _entityName = 'A_BusinessPartnerRole';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_BUSINESS_PARTNER';
  /**
   * All key fields of the BusinessPartnerRole entity
   */
  static _keys = ['BusinessPartner', 'BusinessPartnerRole'];
  /**
   * Business Partner Number.
   * Key identifying a business partner in the SAP system. The key is unique within a client.
   * Maximum length: 10.
   */
  businessPartner!: DeserializedType<T, 'Edm.String'>;
  /**
   * BP Role.
   * Function that a business partner takes on, depending on a business transaction.
   * You can define business partner roles along with their attributes in Customizing.You can create an alphanumeric, 6-digit key for the BP role. You can also choose a title as the short form and a description as the long form for the role text.Screen control in the dialog takes place by assigning a BP view.A program can access specific business partner roles for a business partner using thebusiness partner role category . The role categories are also in the TB003 table.
   * Maximum length: 6.
   */
  businessPartnerRole!: DeserializedType<T, 'Edm.String'>;
  /**
   * Validity Start of a BP Role.
   * @nullable
   */
  validFrom?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Validity End of a BP Role.
   * @nullable
   */
  validTo?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Authorization Group.
   * You can use authorization groups to stipulate which business partners a user is allowed to process.
   * Use the following authorization object:'Business partners: authorization groups' (B_BUPA_GRP).The system only checks this authorization if you made an entry in the "Authorization group" field for the business partner. Otherwise, any user may process the business partner.
   * Maximum length: 4.
   * @nullable
   */
  authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
}

export interface BusinessPartnerRoleType<T extends DeSerializers = DefaultDeSerializers> {
  businessPartner: DeserializedType<T, 'Edm.String'>;
  businessPartnerRole: DeserializedType<T, 'Edm.String'>;
  validFrom?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  validTo?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
}
