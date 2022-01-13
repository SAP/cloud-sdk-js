/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder } from '@sap-cloud-sdk/odata-v2';
import { SupplierPurchasingOrgTextRequestBuilder } from './SupplierPurchasingOrgTextRequestBuilder';
import { SupplierPurchasingOrgText } from './SupplierPurchasingOrgText';
export class SupplierPurchasingOrgTextApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      SupplierPurchasingOrgText<
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

    };

  _addNavigationProperties(
      linkedApis: [

      ]): this {
        this.navigationPropertyFields = {

        };
        return this;
      }

  entityConstructor = SupplierPurchasingOrgText;

  requestBuilder(): SupplierPurchasingOrgTextRequestBuilder<
    DeSerializersT
  > {
    return new SupplierPurchasingOrgTextRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    SupplierPurchasingOrgText<
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
  SupplierPurchasingOrgText<
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
    const fieldBuilder = new FieldBuilder(SupplierPurchasingOrgText, this.deSerializers);
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
 * Static representation of the [[language]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
LANGUAGE: fieldBuilder.buildEdmTypeField('Language', 'Edm.String', false),
/**
 * Static representation of the [[longTextId]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
LONG_TEXT_ID: fieldBuilder.buildEdmTypeField('LongTextID', 'Edm.String', false),
/**
 * Static representation of the [[longText]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
LONG_TEXT: fieldBuilder.buildEdmTypeField('LongText', 'Edm.String', true),
...this.navigationPropertyFields,
/**
 *
 * All fields selector.
 */
ALL_FIELDS: new AllFields('*', SupplierPurchasingOrgText)
  };
  }
}
