/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';

/**
 * This class represents the entity "A_BuPaIndustry" of service "API_BUSINESS_PARTNER".
 */
export class BuPaIndustry<T extends DeSerializers = DefaultDeSerializers> extends Entity implements BuPaIndustryType<T> {
  /**
   * Technical entity name for BuPaIndustry.
   */
  static _entityName = 'A_BuPaIndustry';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_BUSINESS_PARTNER';
  /**
   * All key fields of the BuPaIndustry entity
   */
  static _keys = ['IndustrySector', 'IndustrySystemType', 'BusinessPartner'];
  /**
   * Industry.
   * Describes an industry.
   * An industry is a classification of companies according to their main business activity. For example, you can use Commerce, Banking, Services, Industry, Healthcare, Public Sector, Media, and so on, as industries.You can define industries along with their descriptions in Customizing.Assign the industry key to an industry key system.
   * Maximum length: 10.
   */
  industrySector!: DeserializedType<T, 'Edm.String'>;
  /**
   * Industry System.
   * Serves to combine and categorize several industries into a group.
   * You can create different industry systems, each with its own catalog of industries, whereby an industry can be assigned to several industry systems.You have to select one industry system as the standard industry system. This is then automatically displayed in the initial screen for the maintenance of industry data.You can define an industry system along with its description in Customizing. You can assign several industry systems to a business partner.If you choose the button All Industry Systems, you can access all the industry systems defined in the Customizing using the input help.
   * Maximum length: 4.
   */
  industrySystemType!: DeserializedType<T, 'Edm.String'>;
  /**
   * Business Partner Number.
   * Key identifying a business partner in the SAP system. The key is unique within a client.
   * Maximum length: 10.
   */
  businessPartner!: DeserializedType<T, 'Edm.String'>;
  /**
   * Industry is Standard for BP in Industry System.
   * Identifies the industry in an industry system that can be defined as the standard industry.
   * It is recommended that you define an industry within an industry system as the standard industry, because only the standard industries can be determined at the interfaces to BW or the APIs, for example.This means that even if only one industry exists within an industry system, it should be indicated as the standard industry as this this information cannot be determined otherwise.
   * Maximum length: 1.
   * @nullable
   */
  isStandardIndustry?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Description.
   * Maximum length: 100.
   * @nullable
   */
  industryKeyDescription?: DeserializedType<T, 'Edm.String'> | null;
}

export interface BuPaIndustryType<T extends DeSerializers = DefaultDeSerializers> {
  industrySector: DeserializedType<T, 'Edm.String'>;
  industrySystemType: DeserializedType<T, 'Edm.String'>;
  businessPartner: DeserializedType<T, 'Edm.String'>;
  isStandardIndustry?: DeserializedType<T, 'Edm.String'> | null;
  industryKeyDescription?: DeserializedType<T, 'Edm.String'> | null;
}
