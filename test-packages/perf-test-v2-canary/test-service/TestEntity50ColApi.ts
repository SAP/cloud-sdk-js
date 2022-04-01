/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntity50Col } from './TestEntity50Col';
import { TestEntity50ColRequestBuilder } from './TestEntity50ColRequestBuilder';
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder, Time } from '@sap-cloud-sdk/odata-v4';
export class TestEntity50ColApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements 
    EntityApi<
      TestEntity50Col<
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
  
  entityConstructor = TestEntity50Col;
  
  requestBuilder(): TestEntity50ColRequestBuilder<
    DeSerializersT
  > {
    return new TestEntity50ColRequestBuilder<DeSerializersT>(this);
  }
  
  entityBuilder(): EntityBuilderType<
    TestEntity50Col<
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
  TestEntity50Col<
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
    const fieldBuilder = new FieldBuilder(TestEntity50Col, this.deSerializers);
    return { 
    /**
 * Static representation of the [[keyTestEntity50Col]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
KEY_TEST_ENTITY_50_COL: fieldBuilder.buildEdmTypeField('KeyTestEntity50Col', 'Edm.Int32', false),
/**
 * Static representation of the [[stringProperty1]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
STRING_PROPERTY_1: fieldBuilder.buildEdmTypeField('StringProperty1', 'Edm.String', true),
/**
 * Static representation of the [[guidProperty1]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
GUID_PROPERTY_1: fieldBuilder.buildEdmTypeField('GuidProperty1', 'Edm.Guid', true),
/**
 * Static representation of the [[booleanProperty1]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BOOLEAN_PROPERTY_1: fieldBuilder.buildEdmTypeField('BooleanProperty1', 'Edm.Boolean', true),
/**
 * Static representation of the [[int64Property1]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INT_64_PROPERTY_1: fieldBuilder.buildEdmTypeField('Int64Property1', 'Edm.Int64', true),
/**
 * Static representation of the [[doubleProperty1]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DOUBLE_PROPERTY_1: fieldBuilder.buildEdmTypeField('DoubleProperty1', 'Edm.Double', true),
/**
 * Static representation of the [[decimalProperty1]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DECIMAL_PROPERTY_1: fieldBuilder.buildEdmTypeField('DecimalProperty1', 'Edm.Decimal', true),
/**
 * Static representation of the [[dateProperty1]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DATE_PROPERTY_1: fieldBuilder.buildEdmTypeField('DateProperty1', 'Edm.Date', true),
/**
 * Static representation of the [[timeOfDayProperty1]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
TIME_OF_DAY_PROPERTY_1: fieldBuilder.buildEdmTypeField('TimeOfDayProperty1', 'Edm.TimeOfDay', true),
/**
 * Static representation of the [[dataTimeOffsetDataTimeProperty1]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DATA_TIME_OFFSET_DATA_TIME_PROPERTY_1: fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty1', 'Edm.DateTimeOffset', true),
/**
 * Static representation of the [[dataTimeOffsetTimestampProperty1]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_1: fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty1', 'Edm.DateTimeOffset', true),
/**
 * Static representation of the [[stringProperty2]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
STRING_PROPERTY_2: fieldBuilder.buildEdmTypeField('StringProperty2', 'Edm.String', true),
/**
 * Static representation of the [[guidProperty2]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
GUID_PROPERTY_2: fieldBuilder.buildEdmTypeField('GuidProperty2', 'Edm.Guid', true),
/**
 * Static representation of the [[booleanProperty2]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BOOLEAN_PROPERTY_2: fieldBuilder.buildEdmTypeField('BooleanProperty2', 'Edm.Boolean', true),
/**
 * Static representation of the [[int64Property2]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INT_64_PROPERTY_2: fieldBuilder.buildEdmTypeField('Int64Property2', 'Edm.Int64', true),
/**
 * Static representation of the [[doubleProperty2]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DOUBLE_PROPERTY_2: fieldBuilder.buildEdmTypeField('DoubleProperty2', 'Edm.Double', true),
/**
 * Static representation of the [[decimalProperty2]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DECIMAL_PROPERTY_2: fieldBuilder.buildEdmTypeField('DecimalProperty2', 'Edm.Decimal', true),
/**
 * Static representation of the [[dateProperty2]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DATE_PROPERTY_2: fieldBuilder.buildEdmTypeField('DateProperty2', 'Edm.Date', true),
/**
 * Static representation of the [[timeOfDayProperty2]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
TIME_OF_DAY_PROPERTY_2: fieldBuilder.buildEdmTypeField('TimeOfDayProperty2', 'Edm.TimeOfDay', true),
/**
 * Static representation of the [[dataTimeOffsetDataTimeProperty2]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DATA_TIME_OFFSET_DATA_TIME_PROPERTY_2: fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty2', 'Edm.DateTimeOffset', true),
/**
 * Static representation of the [[dataTimeOffsetTimestampProperty2]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_2: fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty2', 'Edm.DateTimeOffset', true),
/**
 * Static representation of the [[stringProperty3]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
STRING_PROPERTY_3: fieldBuilder.buildEdmTypeField('StringProperty3', 'Edm.String', true),
/**
 * Static representation of the [[guidProperty3]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
GUID_PROPERTY_3: fieldBuilder.buildEdmTypeField('GuidProperty3', 'Edm.Guid', true),
/**
 * Static representation of the [[booleanProperty3]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BOOLEAN_PROPERTY_3: fieldBuilder.buildEdmTypeField('BooleanProperty3', 'Edm.Boolean', true),
/**
 * Static representation of the [[int64Property3]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INT_64_PROPERTY_3: fieldBuilder.buildEdmTypeField('Int64Property3', 'Edm.Int64', true),
/**
 * Static representation of the [[doubleProperty3]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DOUBLE_PROPERTY_3: fieldBuilder.buildEdmTypeField('DoubleProperty3', 'Edm.Double', true),
/**
 * Static representation of the [[decimalProperty3]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DECIMAL_PROPERTY_3: fieldBuilder.buildEdmTypeField('DecimalProperty3', 'Edm.Decimal', true),
/**
 * Static representation of the [[dateProperty3]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DATE_PROPERTY_3: fieldBuilder.buildEdmTypeField('DateProperty3', 'Edm.Date', true),
/**
 * Static representation of the [[timeOfDayProperty3]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
TIME_OF_DAY_PROPERTY_3: fieldBuilder.buildEdmTypeField('TimeOfDayProperty3', 'Edm.TimeOfDay', true),
/**
 * Static representation of the [[dataTimeOffsetDataTimeProperty3]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DATA_TIME_OFFSET_DATA_TIME_PROPERTY_3: fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty3', 'Edm.DateTimeOffset', true),
/**
 * Static representation of the [[dataTimeOffsetTimestampProperty3]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_3: fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty3', 'Edm.DateTimeOffset', true),
/**
 * Static representation of the [[stringProperty4]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
STRING_PROPERTY_4: fieldBuilder.buildEdmTypeField('StringProperty4', 'Edm.String', true),
/**
 * Static representation of the [[guidProperty4]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
GUID_PROPERTY_4: fieldBuilder.buildEdmTypeField('GuidProperty4', 'Edm.Guid', true),
/**
 * Static representation of the [[booleanProperty4]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BOOLEAN_PROPERTY_4: fieldBuilder.buildEdmTypeField('BooleanProperty4', 'Edm.Boolean', true),
/**
 * Static representation of the [[int64Property4]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INT_64_PROPERTY_4: fieldBuilder.buildEdmTypeField('Int64Property4', 'Edm.Int64', true),
/**
 * Static representation of the [[doubleProperty4]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DOUBLE_PROPERTY_4: fieldBuilder.buildEdmTypeField('DoubleProperty4', 'Edm.Double', true),
/**
 * Static representation of the [[decimalProperty4]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DECIMAL_PROPERTY_4: fieldBuilder.buildEdmTypeField('DecimalProperty4', 'Edm.Decimal', true),
/**
 * Static representation of the [[dateProperty4]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DATE_PROPERTY_4: fieldBuilder.buildEdmTypeField('DateProperty4', 'Edm.Date', true),
/**
 * Static representation of the [[timeOfDayProperty4]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
TIME_OF_DAY_PROPERTY_4: fieldBuilder.buildEdmTypeField('TimeOfDayProperty4', 'Edm.TimeOfDay', true),
/**
 * Static representation of the [[dataTimeOffsetDataTimeProperty4]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DATA_TIME_OFFSET_DATA_TIME_PROPERTY_4: fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty4', 'Edm.DateTimeOffset', true),
/**
 * Static representation of the [[dataTimeOffsetTimestampProperty4]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_4: fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty4', 'Edm.DateTimeOffset', true),
/**
 * Static representation of the [[stringProperty5]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
STRING_PROPERTY_5: fieldBuilder.buildEdmTypeField('StringProperty5', 'Edm.String', true),
/**
 * Static representation of the [[guidProperty5]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
GUID_PROPERTY_5: fieldBuilder.buildEdmTypeField('GuidProperty5', 'Edm.Guid', true),
/**
 * Static representation of the [[booleanProperty5]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BOOLEAN_PROPERTY_5: fieldBuilder.buildEdmTypeField('BooleanProperty5', 'Edm.Boolean', true),
/**
 * Static representation of the [[int64Property5]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INT_64_PROPERTY_5: fieldBuilder.buildEdmTypeField('Int64Property5', 'Edm.Int64', true),
/**
 * Static representation of the [[doubleProperty5]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DOUBLE_PROPERTY_5: fieldBuilder.buildEdmTypeField('DoubleProperty5', 'Edm.Double', true),
/**
 * Static representation of the [[decimalProperty5]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DECIMAL_PROPERTY_5: fieldBuilder.buildEdmTypeField('DecimalProperty5', 'Edm.Decimal', true),
/**
 * Static representation of the [[dateProperty5]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DATE_PROPERTY_5: fieldBuilder.buildEdmTypeField('DateProperty5', 'Edm.Date', true),
/**
 * Static representation of the [[timeOfDayProperty5]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
TIME_OF_DAY_PROPERTY_5: fieldBuilder.buildEdmTypeField('TimeOfDayProperty5', 'Edm.TimeOfDay', true),
/**
 * Static representation of the [[dataTimeOffsetDataTimeProperty5]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DATA_TIME_OFFSET_DATA_TIME_PROPERTY_5: fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty5', 'Edm.DateTimeOffset', true),
/**
 * Static representation of the [[dataTimeOffsetTimestampProperty5]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_5: fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty5', 'Edm.DateTimeOffset', true),
...this.navigationPropertyFields,
/**
 * 
 * All fields selector.
 */
ALL_FIELDS: new AllFields('*', TestEntity50Col) 
  };
  }
}
