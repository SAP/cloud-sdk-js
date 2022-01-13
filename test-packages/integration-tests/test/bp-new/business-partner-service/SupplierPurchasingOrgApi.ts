/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder, Link } from '@sap-cloud-sdk/odata-v2';
import { SupplierPurchasingOrg } from './SupplierPurchasingOrg';
import { SupplierPurchasingOrgRequestBuilder } from './SupplierPurchasingOrgRequestBuilder';
import { SupplierPartnerFunc } from './SupplierPartnerFunc';
import { SupplierPartnerFuncApi } from './SupplierPartnerFuncApi';
import { SupplierPurchasingOrgText } from './SupplierPurchasingOrgText';
import { SupplierPurchasingOrgTextApi } from './SupplierPurchasingOrgTextApi';
export class SupplierPurchasingOrgApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      SupplierPurchasingOrg<
        DeSerializersT
      >,
      DeSerializersT
    > {
  public deSerializers: DeSerializersT;

  constructor(
    deSerializers: DeSerializersT = defaultDeSerializers as any) {
    this.deSerializers = deSerializers;
  }

  private navigationPropertyFields!: {
      /**
       * Static representation of the one-to-many navigation property [[toPartnerFunction]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_PARTNER_FUNCTION: Link<
            SupplierPurchasingOrg<DeSerializersT>,
            DeSerializersT,
            SupplierPartnerFunc<DeSerializersT>
          >;
      /**
       * Static representation of the one-to-many navigation property [[toPurchasingOrgText]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_PURCHASING_ORG_TEXT: Link<
            SupplierPurchasingOrg<DeSerializersT>,
            DeSerializersT,
            SupplierPurchasingOrgText<DeSerializersT>
          >;
    };

  _addNavigationProperties(
      linkedApis: [
        SupplierPartnerFuncApi<DeSerializersT>,SupplierPurchasingOrgTextApi<DeSerializersT>
      ]): this {
        this.navigationPropertyFields = {
          TO_PARTNER_FUNCTION: new Link(
              'to_PartnerFunction',
              this,
              linkedApis[0]
            ),
          TO_PURCHASING_ORG_TEXT: new Link(
              'to_PurchasingOrgText',
              this,
              linkedApis[1]
            )
        };
        return this;
      }

  entityConstructor = SupplierPurchasingOrg;

  requestBuilder(): SupplierPurchasingOrgRequestBuilder<
    DeSerializersT
  > {
    return new SupplierPurchasingOrgRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    SupplierPurchasingOrg<
      DeSerializersT
    >,
    DeSerializersT
  > {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
  SupplierPurchasingOrg<
      DeSerializersT>,
    DeSerializersT,
    NullableT
  > {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  get schema() {
    const fieldBuilder = new FieldBuilder(SupplierPurchasingOrg, this.deSerializers);
    return {
    /**
 * Static representation of the [[supplier]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
SUPPLIER: fieldBuilder.buildEdmTypeField('Supplier', 'Edm.String', false),
/**
 * Static representation of the [[purchasingOrganization]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PURCHASING_ORGANIZATION: fieldBuilder.buildEdmTypeField('PurchasingOrganization', 'Edm.String', false),
/**
 * Static representation of the [[calculationSchemaGroupCode]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CALCULATION_SCHEMA_GROUP_CODE: fieldBuilder.buildEdmTypeField('CalculationSchemaGroupCode', 'Edm.String', true),
/**
 * Static representation of the [[deletionIndicator]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DELETION_INDICATOR: fieldBuilder.buildEdmTypeField('DeletionIndicator', 'Edm.Boolean', true),
/**
 * Static representation of the [[incotermsClassification]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INCOTERMS_CLASSIFICATION: fieldBuilder.buildEdmTypeField('IncotermsClassification', 'Edm.String', true),
/**
 * Static representation of the [[incotermsTransferLocation]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INCOTERMS_TRANSFER_LOCATION: fieldBuilder.buildEdmTypeField('IncotermsTransferLocation', 'Edm.String', true),
/**
 * Static representation of the [[incotermsVersion]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INCOTERMS_VERSION: fieldBuilder.buildEdmTypeField('IncotermsVersion', 'Edm.String', true),
/**
 * Static representation of the [[incotermsLocation1]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INCOTERMS_LOCATION_1: fieldBuilder.buildEdmTypeField('IncotermsLocation1', 'Edm.String', true),
/**
 * Static representation of the [[incotermsLocation2]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INCOTERMS_LOCATION_2: fieldBuilder.buildEdmTypeField('IncotermsLocation2', 'Edm.String', true),
/**
 * Static representation of the [[invoiceIsGoodsReceiptBased]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INVOICE_IS_GOODS_RECEIPT_BASED: fieldBuilder.buildEdmTypeField('InvoiceIsGoodsReceiptBased', 'Edm.Boolean', true),
/**
 * Static representation of the [[materialPlannedDeliveryDurn]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
MATERIAL_PLANNED_DELIVERY_DURN: fieldBuilder.buildEdmTypeField('MaterialPlannedDeliveryDurn', 'Edm.Decimal', true),
/**
 * Static representation of the [[minimumOrderAmount]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
MINIMUM_ORDER_AMOUNT: fieldBuilder.buildEdmTypeField('MinimumOrderAmount', 'Edm.Decimal', true),
/**
 * Static representation of the [[paymentTerms]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PAYMENT_TERMS: fieldBuilder.buildEdmTypeField('PaymentTerms', 'Edm.String', true),
/**
 * Static representation of the [[pricingDateControl]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PRICING_DATE_CONTROL: fieldBuilder.buildEdmTypeField('PricingDateControl', 'Edm.String', true),
/**
 * Static representation of the [[purOrdAutoGenerationIsAllowed]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PUR_ORD_AUTO_GENERATION_IS_ALLOWED: fieldBuilder.buildEdmTypeField('PurOrdAutoGenerationIsAllowed', 'Edm.Boolean', true),
/**
 * Static representation of the [[purchaseOrderCurrency]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PURCHASE_ORDER_CURRENCY: fieldBuilder.buildEdmTypeField('PurchaseOrderCurrency', 'Edm.String', true),
/**
 * Static representation of the [[purchasingGroup]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PURCHASING_GROUP: fieldBuilder.buildEdmTypeField('PurchasingGroup', 'Edm.String', true),
/**
 * Static representation of the [[purchasingIsBlockedForSupplier]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PURCHASING_IS_BLOCKED_FOR_SUPPLIER: fieldBuilder.buildEdmTypeField('PurchasingIsBlockedForSupplier', 'Edm.Boolean', true),
/**
 * Static representation of the [[shippingCondition]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
SHIPPING_CONDITION: fieldBuilder.buildEdmTypeField('ShippingCondition', 'Edm.String', true),
/**
 * Static representation of the [[supplierAbcClassificationCode]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
SUPPLIER_ABC_CLASSIFICATION_CODE: fieldBuilder.buildEdmTypeField('SupplierABCClassificationCode', 'Edm.String', true),
/**
 * Static representation of the [[supplierPhoneNumber]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
SUPPLIER_PHONE_NUMBER: fieldBuilder.buildEdmTypeField('SupplierPhoneNumber', 'Edm.String', true),
/**
 * Static representation of the [[supplierRespSalesPersonName]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
SUPPLIER_RESP_SALES_PERSON_NAME: fieldBuilder.buildEdmTypeField('SupplierRespSalesPersonName', 'Edm.String', true),
/**
 * Static representation of the [[supplierConfirmationControlKey]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
SUPPLIER_CONFIRMATION_CONTROL_KEY: fieldBuilder.buildEdmTypeField('SupplierConfirmationControlKey', 'Edm.String', true),
/**
 * Static representation of the [[isOrderAcknRqd]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
IS_ORDER_ACKN_RQD: fieldBuilder.buildEdmTypeField('IsOrderAcknRqd', 'Edm.Boolean', true),
/**
 * Static representation of the [[authorizationGroup]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
AUTHORIZATION_GROUP: fieldBuilder.buildEdmTypeField('AuthorizationGroup', 'Edm.String', true),
/**
 * Static representation of the [[supplierAccountGroup]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
SUPPLIER_ACCOUNT_GROUP: fieldBuilder.buildEdmTypeField('SupplierAccountGroup', 'Edm.String', true),
...this.navigationPropertyFields,
/**
 *
 * All fields selector.
 */
ALL_FIELDS: new AllFields('*', SupplierPurchasingOrg)
  };
  }
}
