/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder } from '@sap-cloud-sdk/odata-v2';
import { SupplierPartnerFuncRequestBuilder } from './SupplierPartnerFuncRequestBuilder';
import { SupplierPartnerFunc } from './SupplierPartnerFunc';
export class SupplierPartnerFuncApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      SupplierPartnerFunc<
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

  entityConstructor = SupplierPartnerFunc;

  requestBuilder(): SupplierPartnerFuncRequestBuilder<
    DeSerializersT
  > {
    return new SupplierPartnerFuncRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    SupplierPartnerFunc<
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
  SupplierPartnerFunc<
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
    const fieldBuilder = new FieldBuilder(SupplierPartnerFunc, this.deSerializers);
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
 * Static representation of the [[supplierSubrange]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
SUPPLIER_SUBRANGE: fieldBuilder.buildEdmTypeField('SupplierSubrange', 'Edm.String', false),
/**
 * Static representation of the [[plant]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PLANT: fieldBuilder.buildEdmTypeField('Plant', 'Edm.String', false),
/**
 * Static representation of the [[partnerFunction]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PARTNER_FUNCTION: fieldBuilder.buildEdmTypeField('PartnerFunction', 'Edm.String', false),
/**
 * Static representation of the [[partnerCounter]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PARTNER_COUNTER: fieldBuilder.buildEdmTypeField('PartnerCounter', 'Edm.String', false),
/**
 * Static representation of the [[defaultPartner]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DEFAULT_PARTNER: fieldBuilder.buildEdmTypeField('DefaultPartner', 'Edm.Boolean', true),
/**
 * Static representation of the [[creationDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CREATION_DATE: fieldBuilder.buildEdmTypeField('CreationDate', 'Edm.DateTime', true),
/**
 * Static representation of the [[createdByUser]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CREATED_BY_USER: fieldBuilder.buildEdmTypeField('CreatedByUser', 'Edm.String', true),
/**
 * Static representation of the [[referenceSupplier]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
REFERENCE_SUPPLIER: fieldBuilder.buildEdmTypeField('ReferenceSupplier', 'Edm.String', true),
/**
 * Static representation of the [[authorizationGroup]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
AUTHORIZATION_GROUP: fieldBuilder.buildEdmTypeField('AuthorizationGroup', 'Edm.String', true),
...this.navigationPropertyFields,
/**
 *
 * All fields selector.
 */
ALL_FIELDS: new AllFields('*', SupplierPartnerFunc)
  };
  }
}
