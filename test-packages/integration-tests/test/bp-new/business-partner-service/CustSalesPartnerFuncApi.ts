/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder } from '@sap-cloud-sdk/odata-v2';
import { CustSalesPartnerFuncRequestBuilder } from './CustSalesPartnerFuncRequestBuilder';
import { CustSalesPartnerFunc } from './CustSalesPartnerFunc';
export class CustSalesPartnerFuncApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      CustSalesPartnerFunc<
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

  entityConstructor = CustSalesPartnerFunc;

  requestBuilder(): CustSalesPartnerFuncRequestBuilder<
    DeSerializersT
  > {
    return new CustSalesPartnerFuncRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    CustSalesPartnerFunc<
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
  CustSalesPartnerFunc<
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
    const fieldBuilder = new FieldBuilder(CustSalesPartnerFunc, this.deSerializers);
    return {
    /**
 * Static representation of the [[customer]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CUSTOMER: fieldBuilder.buildEdmTypeField('Customer', 'Edm.String', false),
/**
 * Static representation of the [[salesOrganization]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
SALES_ORGANIZATION: fieldBuilder.buildEdmTypeField('SalesOrganization', 'Edm.String', false),
/**
 * Static representation of the [[distributionChannel]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DISTRIBUTION_CHANNEL: fieldBuilder.buildEdmTypeField('DistributionChannel', 'Edm.String', false),
/**
 * Static representation of the [[division]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DIVISION: fieldBuilder.buildEdmTypeField('Division', 'Edm.String', false),
/**
 * Static representation of the [[partnerCounter]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PARTNER_COUNTER: fieldBuilder.buildEdmTypeField('PartnerCounter', 'Edm.String', false),
/**
 * Static representation of the [[partnerFunction]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PARTNER_FUNCTION: fieldBuilder.buildEdmTypeField('PartnerFunction', 'Edm.String', false),
/**
 * Static representation of the [[bpCustomerNumber]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BP_CUSTOMER_NUMBER: fieldBuilder.buildEdmTypeField('BPCustomerNumber', 'Edm.String', true),
/**
 * Static representation of the [[customerPartnerDescription]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CUSTOMER_PARTNER_DESCRIPTION: fieldBuilder.buildEdmTypeField('CustomerPartnerDescription', 'Edm.String', true),
/**
 * Static representation of the [[defaultPartner]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DEFAULT_PARTNER: fieldBuilder.buildEdmTypeField('DefaultPartner', 'Edm.Boolean', true),
/**
 * Static representation of the [[supplier]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
SUPPLIER: fieldBuilder.buildEdmTypeField('Supplier', 'Edm.String', true),
/**
 * Static representation of the [[personnelNumber]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PERSONNEL_NUMBER: fieldBuilder.buildEdmTypeField('PersonnelNumber', 'Edm.String', true),
/**
 * Static representation of the [[contactPerson]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CONTACT_PERSON: fieldBuilder.buildEdmTypeField('ContactPerson', 'Edm.String', true),
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
ALL_FIELDS: new AllFields('*', CustSalesPartnerFunc)
  };
  }
}
