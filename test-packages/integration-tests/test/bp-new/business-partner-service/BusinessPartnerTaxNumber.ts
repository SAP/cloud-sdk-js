/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';

/**
 * This class represents the entity "A_BusinessPartnerTaxNumber" of service "API_BUSINESS_PARTNER".
 */
export class BusinessPartnerTaxNumber<T extends DeSerializers = DefaultDeSerializers> extends Entity implements BusinessPartnerTaxNumberType<T> {
  /**
   * Technical entity name for BusinessPartnerTaxNumber.
   */
  static _entityName = 'A_BusinessPartnerTaxNumber';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_BUSINESS_PARTNER';
  /**
   * All key fields of the BusinessPartnerTaxNumber entity
   */
  static _keys = ['BusinessPartner', 'BPTaxType'];
  /**
   * Business Partner Number.
   * Key identifying a business partner in the SAP system. The key is unique within a client.
   * Maximum length: 10.
   */
  businessPartner!: DeserializedType<T, 'Edm.String'>;
  /**
   * Tax Number Category.
   * Specifies the tax number category.
   * Maximum length: 4.
   */
  bpTaxType!: DeserializedType<T, 'Edm.String'>;
  /**
   * Business Partner Tax Number.
   * Specifies the tax number.
   * Maximum length: 20.
   * @nullable
   */
  bpTaxNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Business Partner Tax Number.
   * Specifies the tax number.
   * You can enter up to 60 characters in this field.
   * Maximum length: 60.
   * @nullable
   */
  bpTaxLongNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Authorization Group.
   * You can use authorization groups to stipulate which business partners a user is allowed to process.
   * Use the following authorization object:'Business partners: authorization groups' (B_BUPA_GRP).The system only checks this authorization if you made an entry in the "Authorization group" field for the business partner. Otherwise, any user may process the business partner.
   * Maximum length: 4.
   * @nullable
   */
  authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
}

export interface BusinessPartnerTaxNumberType<T extends DeSerializers = DefaultDeSerializers> {
  businessPartner: DeserializedType<T, 'Edm.String'>;
  bpTaxType: DeserializedType<T, 'Edm.String'>;
  bpTaxNumber?: DeserializedType<T, 'Edm.String'> | null;
  bpTaxLongNumber?: DeserializedType<T, 'Edm.String'> | null;
  authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
}
