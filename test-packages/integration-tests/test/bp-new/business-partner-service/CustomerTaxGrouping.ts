/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';

/**
 * This class represents the entity "A_CustomerTaxGrouping" of service "API_BUSINESS_PARTNER".
 */
export class CustomerTaxGrouping<T extends DeSerializers = DefaultDeSerializers> extends Entity implements CustomerTaxGroupingType<T> {
  /**
   * Technical entity name for CustomerTaxGrouping.
   */
  static _entityName = 'A_CustomerTaxGrouping';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_BUSINESS_PARTNER';
  /**
   * All key fields of the CustomerTaxGrouping entity
   */
  static _keys = ['Customer', 'CustomerTaxGroupingCode'];
  /**
   * Customer Number.
   * Gives an alphanumeric key, which clearly identifies the customer or vendor in the SAP system.
   * Maximum length: 10.
   */
  customer!: DeserializedType<T, 'Edm.String'>;
  /**
   * Category indicator for tax codes.
   * This indicator is used to allocate customers and vendors to different tax categories. The system evaluates this information during document entry to assist users in selecting the tax code.
   * Maximum length: 3.
   */
  customerTaxGroupingCode!: DeserializedType<T, 'Edm.String'>;
  /**
   * Number of exemption certificate.
   * The exemption information are displayed while posting a document to help the user find the correct tax code. If the posting date lies within an exemption interval the corresponding tax category will be highlighted.
   * Maximum length: 15.
   * @nullable
   */
  custTaxGrpExemptionCertificate?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Exemption rate.
   * Tax categories
   * The exemption information is used by the system to help the user find the correct tax code while posting a document.The system will not apply the exemption rate to a tax amount previously calculated. This has to be done by defining a special tax code with a reduced percentage rate.Withholding taxThe exemption percentage is applied to the calculated withholding tax amount.
   * @nullable
   */
  custTaxGroupExemptionRate?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Start date of exemption.
   * @nullable
   */
  custTaxGroupExemptionStartDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * End date of exemption.
   * @nullable
   */
  custTaxGroupExemptionEndDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Subjected from.
   * This field gives the start date of the status of being subjected.
   * @nullable
   */
  custTaxGroupSubjectedStartDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Subjected until.
   * This field gives the end date of the status of being subjected.
   * @nullable
   */
  custTaxGroupSubjectedEndDate?: DeserializedType<T, 'Edm.DateTime'> | null;
}

export interface CustomerTaxGroupingType<T extends DeSerializers = DefaultDeSerializers> {
  customer: DeserializedType<T, 'Edm.String'>;
  customerTaxGroupingCode: DeserializedType<T, 'Edm.String'>;
  custTaxGrpExemptionCertificate?: DeserializedType<T, 'Edm.String'> | null;
  custTaxGroupExemptionRate?: DeserializedType<T, 'Edm.Decimal'> | null;
  custTaxGroupExemptionStartDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  custTaxGroupExemptionEndDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  custTaxGroupSubjectedStartDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  custTaxGroupSubjectedEndDate?: DeserializedType<T, 'Edm.DateTime'> | null;
}
