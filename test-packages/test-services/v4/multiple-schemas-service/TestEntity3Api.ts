/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntity3 } from './TestEntity3';
import { TestEntity3RequestBuilder } from './TestEntity3RequestBuilder';
import { TestComplexType2, TestComplexType2Field } from './TestComplexType2';
import { TestEnumType2 } from './TestEnumType2';
import {
  CustomField,
  defaultDeSerializers,
  DefaultDeSerializers,
  DeSerializers,
  mergeDefaultDeSerializersWith,
  AllFields,
  entityBuilder,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  Time,
  EdmTypeField,
  EnumField
} from '@sap-cloud-sdk/odata-v4';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
export class TestEntity3Api<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntity3<DeSerializersT>, DeSerializersT>
{
  public deSerializers: DeSerializersT;

  constructor(deSerializers: DeSerializersT = defaultDeSerializers as any) {
    this.deSerializers = deSerializers;
  }

  private navigationPropertyFields!: {};

  _addNavigationProperties(linkedApis: []): this {
    this.navigationPropertyFields = {};
    return this;
  }

  entityConstructor = TestEntity3;

  requestBuilder(): TestEntity3RequestBuilder<DeSerializersT> {
    return new TestEntity3RequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    TestEntity3<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<TestEntity3<DeSerializersT>, DeSerializersT, NullableT> {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  get schema() {
    const fieldBuilder = new FieldBuilder(TestEntity3, this.deSerializers);
    return {
      /**
       * Static representation of the [[keyPropertyString]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      KEY_PROPERTY_STRING: fieldBuilder.buildEdmTypeField(
        'KeyPropertyString',
        'Edm.String',
        false
      ),
      /**
       * Static representation of the [[enumProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      ENUM_PROPERTY: fieldBuilder.buildEnumField(
        'EnumProperty',
        TestEnumType2,
        true
      ),
      /**
       * Static representation of the [[complexTypeProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      COMPLEX_TYPE_PROPERTY: fieldBuilder.buildComplexTypeField(
        'ComplexTypeProperty',
        TestComplexType2Field,
        true
      ),
      ...this.navigationPropertyFields,
      /**
       *
       * All fields selector.
       */
      ALL_FIELDS: new AllFields('*', TestEntity3)
    };
  }
}
