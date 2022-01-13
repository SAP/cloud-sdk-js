/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';

/**
 * This class represents the entity "A_BuPaAddressUsage" of service "API_BUSINESS_PARTNER".
 */
export class BuPaAddressUsage<T extends DeSerializers = DefaultDeSerializers> extends Entity implements BuPaAddressUsageType<T> {
  /**
   * Technical entity name for BuPaAddressUsage.
   */
  static _entityName = 'A_BuPaAddressUsage';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_BUSINESS_PARTNER';
  /**
   * All key fields of the BuPaAddressUsage entity
   */
  static _keys = ['BusinessPartner', 'ValidityEndDate', 'AddressUsage', 'AddressID'];
  /**
   * Business Partner Number.
   * Key identifying a business partner in the SAP system. The key is unique within a client.
   * Maximum length: 10.
   */
  businessPartner!: DeserializedType<T, 'Edm.String'>;
  /**
   * Validity End of a Business Partner Address Usage.
   */
  validityEndDate!: DeserializedType<T, 'Edm.DateTimeOffset'>;
  /**
   * Address Type.
   * Business partner attribute, which you can use to distinguish between various addresses by defining the address usage for communication with business partners.
   * Maintain the usage types for addresses (address types) in Customizing.You can create a short description and a name for the address type.When maintaining business partners you can use the function address usage to assign business partner addresses to address types.If necessary, you can set the indicator for multiple use in Customizing.Correspondence addressDelivery address.
   * Maximum length: 10.
   */
  addressUsage!: DeserializedType<T, 'Edm.String'>;
  /**
   * Address Number.
   * Internal key for identifying a Business Address Services address.
   * For more information about the meaning and use of the address number and the Business Address Services concepts, see the function group SZA0 documentation.
   * Maximum length: 10.
   */
  addressId!: DeserializedType<T, 'Edm.String'>;
  /**
   * Validity Start of a Business Partner Address Usage.
   * @nullable
   */
  validityStartDate?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Indicator: Standard Address Usage.
   * Establishes which is the standard address for an address usage.
   * Several addresses per period can be assigned to an address usage.If this is the case, then this indicator controls which of the assigned addresses should be the standard address of the relevant usage. This is determined automatically when the address usage is accessed.
   * @nullable
   */
  standardUsage?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Authorization Group.
   * You can use authorization groups to stipulate which business partners a user is allowed to process.
   * Use the following authorization object:'Business partners: authorization groups' (B_BUPA_GRP).The system only checks this authorization if you made an entry in the "Authorization group" field for the business partner. Otherwise, any user may process the business partner.
   * Maximum length: 4.
   * @nullable
   */
  authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
}

export interface BuPaAddressUsageType<T extends DeSerializers = DefaultDeSerializers> {
  businessPartner: DeserializedType<T, 'Edm.String'>;
  validityEndDate: DeserializedType<T, 'Edm.DateTimeOffset'>;
  addressUsage: DeserializedType<T, 'Edm.String'>;
  addressId: DeserializedType<T, 'Edm.String'>;
  validityStartDate?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  standardUsage?: DeserializedType<T, 'Edm.Boolean'> | null;
  authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
}
