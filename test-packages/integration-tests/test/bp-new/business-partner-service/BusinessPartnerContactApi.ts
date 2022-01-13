/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder, Link, OneToOneLink } from '@sap-cloud-sdk/odata-v2';
import { BusinessPartnerContact } from './BusinessPartnerContact';
import { BusinessPartnerContactRequestBuilder } from './BusinessPartnerContactRequestBuilder';
import { BpContactToAddress } from './BpContactToAddress';
import { BpContactToAddressApi } from './BpContactToAddressApi';
import { BpContactToFuncAndDept } from './BpContactToFuncAndDept';
import { BpContactToFuncAndDeptApi } from './BpContactToFuncAndDeptApi';
export class BusinessPartnerContactApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      BusinessPartnerContact<
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
       * Static representation of the one-to-many navigation property [[toContactAddress]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_CONTACT_ADDRESS: Link<
            BusinessPartnerContact<DeSerializersT>,
            DeSerializersT,
            BpContactToAddress<DeSerializersT>
          >;
      /**
       * Static representation of the one-to-one navigation property [[toContactRelationship]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_CONTACT_RELATIONSHIP: OneToOneLink<
            BusinessPartnerContact<DeSerializersT>,
            DeSerializersT,
            BpContactToFuncAndDept<DeSerializersT>
          >;
    };

  _addNavigationProperties(
      linkedApis: [
        BpContactToAddressApi<DeSerializersT>,BpContactToFuncAndDeptApi<DeSerializersT>
      ]): this {
        this.navigationPropertyFields = {
          TO_CONTACT_ADDRESS: new Link(
              'to_ContactAddress',
              this,
              linkedApis[0]
            ),
          TO_CONTACT_RELATIONSHIP: new OneToOneLink(
              'to_ContactRelationship',
              this,
              linkedApis[1]
            )
        };
        return this;
      }

  entityConstructor = BusinessPartnerContact;

  requestBuilder(): BusinessPartnerContactRequestBuilder<
    DeSerializersT
  > {
    return new BusinessPartnerContactRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    BusinessPartnerContact<
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
  BusinessPartnerContact<
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
    const fieldBuilder = new FieldBuilder(BusinessPartnerContact, this.deSerializers);
    return {
    /**
 * Static representation of the [[relationshipNumber]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
RELATIONSHIP_NUMBER: fieldBuilder.buildEdmTypeField('RelationshipNumber', 'Edm.String', false),
/**
 * Static representation of the [[businessPartnerCompany]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER_COMPANY: fieldBuilder.buildEdmTypeField('BusinessPartnerCompany', 'Edm.String', false),
/**
 * Static representation of the [[businessPartnerPerson]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER_PERSON: fieldBuilder.buildEdmTypeField('BusinessPartnerPerson', 'Edm.String', false),
/**
 * Static representation of the [[validityEndDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
VALIDITY_END_DATE: fieldBuilder.buildEdmTypeField('ValidityEndDate', 'Edm.DateTime', false),
/**
 * Static representation of the [[validityStartDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
VALIDITY_START_DATE: fieldBuilder.buildEdmTypeField('ValidityStartDate', 'Edm.DateTime', true),
/**
 * Static representation of the [[isStandardRelationship]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
IS_STANDARD_RELATIONSHIP: fieldBuilder.buildEdmTypeField('IsStandardRelationship', 'Edm.Boolean', true),
/**
 * Static representation of the [[relationshipCategory]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
RELATIONSHIP_CATEGORY: fieldBuilder.buildEdmTypeField('RelationshipCategory', 'Edm.String', true),
...this.navigationPropertyFields,
/**
 *
 * All fields selector.
 */
ALL_FIELDS: new AllFields('*', BusinessPartnerContact)
  };
  }
}
