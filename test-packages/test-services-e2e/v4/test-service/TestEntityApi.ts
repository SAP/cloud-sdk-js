/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntity } from './TestEntity';
import { TestEntityRequestBuilder } from './TestEntityRequestBuilder';
import { TestEntityLink } from './TestEntityLink';
import { TestEntityLinkApi } from './TestEntityLinkApi';
import {
  CustomField,
  defaultDeSerializers,
  DefaultDeSerializers,
  DeSerializers,
  mergeDefaultDeSerializersWith
} from '@sap-cloud-sdk/odata-v4';
import {
  Time,
  OrderableEdmTypeField,
  EdmTypeField,
  OneToManyLink,
  AllFields,
  entityBuilder,
  EntityBuilderType,
  EntityApi,
  FieldBuilder
} from '@sap-cloud-sdk/odata-common/internal';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
export class TestEntityApi<T extends DeSerializers = DefaultDeSerializers>
  implements EntityApi<TestEntity<T>, T>
{
  public deSerializers: T;

  constructor(deSerializers: T = defaultDeSerializers as any) {
    this.deSerializers = deSerializers;
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_MULTI_LINK: OneToManyLink<TestEntity<T>, T, TestEntityLink<T>>;
  };

  _addNavigationProperties(linkedApis: [TestEntityLinkApi<T>]): this {
    this.navigationPropertyFields = {
      TO_MULTI_LINK: new OneToManyLink('ToMultiLink', this, linkedApis[0])
    };
    return this;
  }

  entityConstructor = TestEntity;

  requestBuilder(): TestEntityRequestBuilder<T> {
    return new TestEntityRequestBuilder(this);
  }

  entityBuilder(): EntityBuilderType<TestEntity<T>, T> {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<TestEntity<T>, T, NullableT> {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  get schema() {
    const fieldBuilder = new FieldBuilder(TestEntity, this.deSerializers);
    return {
      /**
       * Static representation of the [[keyTestEntity]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      KEY_TEST_ENTITY: fieldBuilder.buildEdmTypeField(
        'KeyTestEntity',
        'Edm.Int32',
        false
      ),
      /**
       * Static representation of the [[stringProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      STRING_PROPERTY: fieldBuilder.buildEdmTypeField(
        'StringProperty',
        'Edm.String',
        true
      ),
      /**
       * Static representation of the [[guidProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      GUID_PROPERTY: fieldBuilder.buildEdmTypeField(
        'GuidProperty',
        'Edm.Guid',
        true
      ),
      /**
       * Static representation of the [[booleanProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      BOOLEAN_PROPERTY: fieldBuilder.buildEdmTypeField(
        'BooleanProperty',
        'Edm.Boolean',
        true
      ),
      /**
       * Static representation of the [[int64Property]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      INT_64_PROPERTY: fieldBuilder.buildEdmTypeField(
        'Int64Property',
        'Edm.Int64',
        true
      ),
      /**
       * Static representation of the [[doubleProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      DOUBLE_PROPERTY: fieldBuilder.buildEdmTypeField(
        'DoubleProperty',
        'Edm.Double',
        true
      ),
      /**
       * Static representation of the [[decimalProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      DECIMAL_PROPERTY: fieldBuilder.buildEdmTypeField(
        'DecimalProperty',
        'Edm.Decimal',
        true
      ),
      /**
       * Static representation of the [[dateProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      DATE_PROPERTY: fieldBuilder.buildEdmTypeField(
        'DateProperty',
        'Edm.Date',
        true
      ),
      /**
       * Static representation of the [[timeOfDayProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TIME_OF_DAY_PROPERTY: fieldBuilder.buildEdmTypeField(
        'TimeOfDayProperty',
        'Edm.TimeOfDay',
        true
      ),
      /**
       * Static representation of the [[dataTimeOffsetDataTimeProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      DATA_TIME_OFFSET_DATA_TIME_PROPERTY: fieldBuilder.buildEdmTypeField(
        'DataTimeOffsetDataTimeProperty',
        'Edm.DateTimeOffset',
        true
      ),
      /**
       * Static representation of the [[dataTimeOffsetTimestampProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      DATA_TIME_OFFSET_TIMESTAMP_PROPERTY: fieldBuilder.buildEdmTypeField(
        'DataTimeOffsetTimestampProperty',
        'Edm.DateTimeOffset',
        true
      ),
      ...this.navigationPropertyFields,
      /**
       *
       * All fields selector.
       */
      ALL_FIELDS: new AllFields('*', TestEntity)
    };
  }
}
