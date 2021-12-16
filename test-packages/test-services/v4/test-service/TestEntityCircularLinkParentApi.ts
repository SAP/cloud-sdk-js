/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityCircularLinkParent } from './TestEntityCircularLinkParent';
import { TestEntityCircularLinkParentRequestBuilder } from './TestEntityCircularLinkParentRequestBuilder';
import { TestEntityCircularLinkChild } from './TestEntityCircularLinkChild';
import { TestEntityCircularLinkChildApi } from './TestEntityCircularLinkChildApi';
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, mergeDefaultDeSerializersWith } from '@sap-cloud-sdk/odata-v4';
import { EdmTypeField, OneToOneLink, OneToManyLink, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder, Time } from '@sap-cloud-sdk/odata-common/internal';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
export class TestEntityCircularLinkParentApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements 
    EntityApi<
      TestEntityCircularLinkParent<
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
       * Static representation of the one-to-one navigation property [[toFirstChild]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_FIRST_CHILD: OneToOneLink<
            TestEntityCircularLinkParent<DeSerializersT>,
            DeSerializersT,
            TestEntityCircularLinkChild<DeSerializersT>
          >,
      /**
       * Static representation of the one-to-many navigation property [[toChildren]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_CHILDREN: OneToManyLink<
            TestEntityCircularLinkParent<DeSerializersT>,
            DeSerializersT,
            TestEntityCircularLinkChild<DeSerializersT>
          >
    };

  _addNavigationProperties(
      linkedApis: [
        TestEntityCircularLinkChildApi<DeSerializersT>,TestEntityCircularLinkChildApi<DeSerializersT>
      ]): this {
        this.navigationPropertyFields = {
          TO_FIRST_CHILD: new OneToOneLink(
              'to_FirstChild',
              this,
              linkedApis[0]
            ),
          TO_CHILDREN: new OneToManyLink(
              'to_Children',
              this,
              linkedApis[1]
            )
        };
        return this;
      }
  
  entityConstructor = TestEntityCircularLinkParent;
  
  requestBuilder(): TestEntityCircularLinkParentRequestBuilder<
    DeSerializersT
  > {
    return new TestEntityCircularLinkParentRequestBuilder(this);
  }
  
  entityBuilder(): EntityBuilderType<
    TestEntityCircularLinkParent<
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
  TestEntityCircularLinkParent<
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
    const fieldBuilder = new FieldBuilder(TestEntityCircularLinkParent, this.deSerializers);
    return { 
    /**
 * Static representation of the [[keyProperty]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
KEY_PROPERTY: fieldBuilder.buildEdmTypeField('KeyProperty', 'Edm.String', false),
...this.navigationPropertyFields,
/**
 * 
 * All fields selector.
 */
ALL_FIELDS: new AllFields('*', TestEntityCircularLinkParent) 
  };
  }
}
