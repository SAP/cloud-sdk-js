/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';

/**
 * This class represents the entity "A_CustomerWithHoldingTax" of service "API_BUSINESS_PARTNER".
 */
export class CustomerWithHoldingTax<T extends DeSerializers = DefaultDeSerializers> extends Entity implements CustomerWithHoldingTaxType<T> {
  /**
   * Technical entity name for CustomerWithHoldingTax.
   */
  static _entityName = 'A_CustomerWithHoldingTax';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_BUSINESS_PARTNER';
  /**
   * All key fields of the CustomerWithHoldingTax entity
   */
  static _keys = ['Customer', 'CompanyCode', 'WithholdingTaxType'];
  /**
   * Customer Number.
   * Gives an alphanumeric key, which clearly identifies the customer or vendor in the SAP system.
   * Maximum length: 10.
   */
  customer!: DeserializedType<T, 'Edm.String'>;
  /**
   * Company Code.
   * The company code is an organizational unit within financial accounting.
   * Maximum length: 4.
   */
  companyCode!: DeserializedType<T, 'Edm.String'>;
  /**
   * Indicator for Withholding Tax Type.
   * This indicator is used to classify the different types of withholding tax.
   * Withholding tax types classify particular features of a withholding tax including:The time at which the withholding tax is postedThe basis on which the base amount is calculatedThe basis for accumulation (if applicable)Withholding tax types are to be distinguished from withholding tax codes, to which are allocated the withholding tax percentage rate example.Whether a withholding tax can be defined as an existing type by means of a new code, or if a new type needs to be defined will depend on the type of transaction (see below).Note that a business transaction can only be assigned one withholding tax code per withholding tax type. If the business transaction is subject to several withholding taxes simultaneously, these must be represented by different types.This is the case in Argentina for example, where up to four kinds of withholding tax per business transaction are possible.
   * Maximum length: 2.
   */
  withholdingTaxType!: DeserializedType<T, 'Edm.String'>;
  /**
   * Withholding tax code.
   * One or more "withholding tax codes" are assigned to each withholding tax type. One of the things these codes determine is the various percentage rates for the withholding tax type.
   * Note that when processing a business transaction, no more than one withholding tax code can be assigned per withholding tax type. If the business transaction is subject to more than one withholding taxes, these must be represented in the system by defining various withholding tax types.
   * Maximum length: 2.
   * @nullable
   */
  withholdingTaxCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator: Withholding tax agent?.
   * @nullable
   */
  withholdingTaxAgent?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Obligated to withhold tax from.
   * Date from which:
   * The company code is obligated to withhold tax for the given withholding tax type.This date must be entered in Customizing under the withholding tax information for the company code.The customer is obligated to withhold tax for the withholding tax type.This date must be defined in the customer master record.
   * @nullable
   */
  obligationDateBegin?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Obligated to withhold tax until.
   * Date to which:
   * The company code is obligated to withhold tax for the withholding tax type.This date must be entered in Customizing under the withholding tax information for the company code.The customer is obigated to withhold tax for the withholding tax type.
   * @nullable
   */
  obligationDateEnd?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Withholding tax identification number.
   * This is a number issued by the tax authorities per withholding tax type.
   * This number must be specified in Customizing either:(a) As part of the withholding tax information defined for the company code, or(b) As part of the withholding tax information defined in the customer or vendor master record.
   * Maximum length: 16.
   * @nullable
   */
  withholdingTaxNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Exemption certificate number.
   * Numbered assigned by the relevant authorities for exemption from withholding tax.
   * This number must be entered in the system as follows:In the vendor master record in the case of vendorsFor customers, in Customizing under the settings for withholding tax information for the company code per withholding tax type.
   * Maximum length: 25.
   * @nullable
   */
  withholdingTaxCertificate?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Exemption rate.
   * Rate of exemption from withholding tax.
   * Those persons/activities subject to withholding tax can be exempted from withholding tax up to the percentage rate you enter here. This exemption rate refers to the withholding tax amount itself and not to the whole amount liable to withholding tax (withholding tax base amount).The gross amount of an invoice is 100.00 and the withholding tax base amount is defined as gross. The withholding tax rate is 10% meaning that the withholding tax amount is 10.00. Given an exemption rate of 30%, the withholding tax amount is reduced to 7.00.
   * @nullable
   */
  withholdingTaxExmptPercent?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Date on which exemption begins.
   * Date from which withholding tax exemption applies.
   * @nullable
   */
  exemptionDateBegin?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Date on which exemption ends.
   * Date on which withholding tax exemption expires.
   * @nullable
   */
  exemptionDateEnd?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Reason for exemption.
   * Indicator used to classify different types of exemption from liability to a particular withholding tax.
   * These indicators can be defined per withholding tax type in the vendor master record.
   * Maximum length: 2.
   * @nullable
   */
  exemptionReason?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Authorization Group.
   * The authorization group allows extended authorization protection for particular objects. The authorization groups are freely definable. The authorization groups usually occur in authorization objects together with an activity.
   * Maximum length: 4.
   * @nullable
   */
  authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
}

export interface CustomerWithHoldingTaxType<T extends DeSerializers = DefaultDeSerializers> {
  customer: DeserializedType<T, 'Edm.String'>;
  companyCode: DeserializedType<T, 'Edm.String'>;
  withholdingTaxType: DeserializedType<T, 'Edm.String'>;
  withholdingTaxCode?: DeserializedType<T, 'Edm.String'> | null;
  withholdingTaxAgent?: DeserializedType<T, 'Edm.Boolean'> | null;
  obligationDateBegin?: DeserializedType<T, 'Edm.DateTime'> | null;
  obligationDateEnd?: DeserializedType<T, 'Edm.DateTime'> | null;
  withholdingTaxNumber?: DeserializedType<T, 'Edm.String'> | null;
  withholdingTaxCertificate?: DeserializedType<T, 'Edm.String'> | null;
  withholdingTaxExmptPercent?: DeserializedType<T, 'Edm.Decimal'> | null;
  exemptionDateBegin?: DeserializedType<T, 'Edm.DateTime'> | null;
  exemptionDateEnd?: DeserializedType<T, 'Edm.DateTime'> | null;
  exemptionReason?: DeserializedType<T, 'Edm.String'> | null;
  authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
}
