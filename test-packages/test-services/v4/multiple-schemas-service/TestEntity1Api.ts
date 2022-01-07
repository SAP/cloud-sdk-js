/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntity1 } from './TestEntity1';
import { TestEntity1RequestBuilder } from './TestEntity1RequestBuilder';
import { TestComplexType1, TestComplexType1Field } from './TestComplexType1';
import { TestEnumType1 } from './TestEnumType1';
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, mergeDefaultDeSerializersWith } from '@sap-cloud-sdk/odata-v4';
import { EdmTypeField, OrderableEdmTypeField, EnumField, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder, Time } from '@sap-cloud-sdk/odata-common/internal';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
export class TestEntity1Api<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements 
    EntityApi<
      TestEntity1<
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
  
  entityConstructor = TestEntity1;
  
  requestBuilder(): TestEntity1RequestBuilder<
    DeSerializersT
  > {
    return new TestEntity1RequestBuilder<DeSerializersT>(this);
  }
  
  entityBuilder(): EntityBuilderType<
    TestEntity1<
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
  TestEntity1<
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
    const fieldBuilder = new FieldBuilder(TestEntity1, this.deSerializers);
    return { 
    /**
 * Static representation of the [[keyPropertyString]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
KEY_PROPERTY_STRING: fieldBuilder.buildEdmTypeField('KeyPropertyString', 'Edm.String', false),
/**
 * Static representation of the [[int16Property]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INT_16_PROPERTY: fieldBuilder.buildEdmTypeField('Int16Property', 'Edm.Int16', true),
/**
 * Static representation of the [[enumProperty]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ENUM_PROPERTY: fieldBuilder.buildEnumField('EnumProperty', TestEnumType1, true),
/**
 * Static representation of the [[complexTypeProperty]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
COMPLEX_TYPE_PROPERTY: fieldBuilder.buildComplexTypeField('ComplexTypeProperty', TestComplexType1Field, true),
...this.navigationPropertyFields,
/**
 * 
 * All fields selector.
 */
ALL_FIELDS: new AllFields('*', TestEntity1) 
  };
  }
}
