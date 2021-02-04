/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntitySharesEntityType1RequestBuilder } from './TestEntitySharesEntityType1RequestBuilder';
import { Moment, Duration } from 'moment';
import { BigNumber } from 'bignumber.js';
import { TestComplexType, TestComplexTypeField } from './TestComplexType';
import { TestEnumType } from './TestEnumType';
import { TestEnumTypeWithOneMember } from './TestEnumTypeWithOneMember';
import { AllFields, AnyField, BigNumberField, BooleanField, CollectionField, CustomFieldV4, DateField, DurationField, EntityBuilderType, EntityV4, EnumField, Field, NumberField, StringField, Time, TimeField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "A_TestEntitySharesEntityType1" of service "API_TEST_SRV".
 */
export class TestEntitySharesEntityType1 extends EntityV4 implements TestEntitySharesEntityType1Type {
  /**
   * Technical entity name for TestEntitySharesEntityType1.
   */
  static _entityName = 'A_TestEntitySharesEntityType1';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * Key Property Guid.
   */
  keyPropertyGuid!: string;
  /**
   * Key Property String.
   */
  keyPropertyString!: string;
  /**
   * String Property.
   * Maximum length: 10.
   * @nullable
   */
  stringProperty?: string;
  /**
   * Boolean Property.
   * @nullable
   */
  booleanProperty?: boolean;
  /**
   * Guid Property.
   * @nullable
   */
  guidProperty?: string;
  /**
   * Int 16 Property.
   * @nullable
   */
  int16Property?: number;
  /**
   * Int 32 Property.
   * @nullable
   */
  int32Property?: number;
  /**
   * Int 64 Property.
   * @nullable
   */
  int64Property?: BigNumber;
  /**
   * Decimal Property.
   * @nullable
   */
  decimalProperty?: BigNumber;
  /**
   * Single Property.
   * @nullable
   */
  singleProperty?: number;
  /**
   * Double Property.
   * @nullable
   */
  doubleProperty?: number;
  /**
   * Float Property.
   * @nullable
   */
  floatProperty?: number;
  /**
   * Time Of Day Property.
   * @nullable
   */
  timeOfDayProperty?: Time;
  /**
   * Date Property.
   * @nullable
   */
  dateProperty?: Moment;
  /**
   * Date Time Off Set Property.
   * @nullable
   */
  dateTimeOffSetProperty?: Moment;
  /**
   * Duration Property.
   * @nullable
   */
  durationProperty?: Duration;
  /**
   * Byte Property.
   * @nullable
   */
  byteProperty?: number;
  /**
   * S Byte Property.
   * @nullable
   */
  sByteProperty?: number;
  /**
   * Geography Point Property.
   * @nullable
   */
  geographyPointProperty?: any;
  /**
   * Something The Sdk Does Not Support.
   * @nullable
   */
  somethingTheSdkDoesNotSupport?: any;
  /**
   * Collection Property.
   * Maximum length: 10.
   * @nullable
   */
  collectionProperty?: string[];
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestComplexType;
  /**
   * Complex Type Collection Property.
   * @nullable
   */
  complexTypeCollectionProperty?: TestComplexType[];
  /**
   * Enum Property.
   * @nullable
   */
  enumProperty?: TestEnumType;
  /**
   * Enum Property With One Member.
   * @nullable
   */
  enumPropertyWithOneMember?: TestEnumTypeWithOneMember;
  /**
   * Enum Collection Property.
   * @nullable
   */
  enumCollectionProperty?: TestEnumType[];

  /**
   * Returns an entity builder to construct instances of `TestEntitySharesEntityType1`.
   * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType1`.
   */
  static builder(): EntityBuilderType<TestEntitySharesEntityType1, TestEntitySharesEntityType1Type> {
    return EntityV4.entityBuilder(TestEntitySharesEntityType1);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntitySharesEntityType1` entity type.
   * @returns A `TestEntitySharesEntityType1` request builder.
   */
  static requestBuilder(): TestEntitySharesEntityType1RequestBuilder {
    return new TestEntitySharesEntityType1RequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntitySharesEntityType1`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType1`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntitySharesEntityType1> {
    return EntityV4.customFieldSelector(fieldName, TestEntitySharesEntityType1);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntitySharesEntityType1Type {
  keyPropertyGuid: string;
  keyPropertyString: string;
  stringProperty?: string | null;
  booleanProperty?: boolean | null;
  guidProperty?: string | null;
  int16Property?: number | null;
  int32Property?: number | null;
  int64Property?: BigNumber | null;
  decimalProperty?: BigNumber | null;
  singleProperty?: number | null;
  doubleProperty?: number | null;
  floatProperty?: number | null;
  timeOfDayProperty?: Time | null;
  dateProperty?: Moment | null;
  dateTimeOffSetProperty?: Moment | null;
  durationProperty?: Duration | null;
  byteProperty?: number | null;
  sByteProperty?: number | null;
  geographyPointProperty?: any | null;
  somethingTheSdkDoesNotSupport?: any | null;
  collectionProperty?: string[] | null;
  complexTypeProperty?: TestComplexType | null;
  complexTypeCollectionProperty?: TestComplexType[] | null;
  enumProperty?: TestEnumType | null;
  enumPropertyWithOneMember?: TestEnumTypeWithOneMember | null;
  enumCollectionProperty?: TestEnumType[] | null;
}

export namespace TestEntitySharesEntityType1 {
  /**
   * Static representation of the [[keyPropertyGuid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_GUID: StringField<TestEntitySharesEntityType1> = new StringField('KeyPropertyGuid', TestEntitySharesEntityType1, 'Edm.Guid');
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_STRING: StringField<TestEntitySharesEntityType1> = new StringField('KeyPropertyString', TestEntitySharesEntityType1, 'Edm.String');
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const STRING_PROPERTY: StringField<TestEntitySharesEntityType1> = new StringField('StringProperty', TestEntitySharesEntityType1, 'Edm.String');
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BOOLEAN_PROPERTY: BooleanField<TestEntitySharesEntityType1> = new BooleanField('BooleanProperty', TestEntitySharesEntityType1, 'Edm.Boolean');
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GUID_PROPERTY: StringField<TestEntitySharesEntityType1> = new StringField('GuidProperty', TestEntitySharesEntityType1, 'Edm.Guid');
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_16_PROPERTY: NumberField<TestEntitySharesEntityType1> = new NumberField('Int16Property', TestEntitySharesEntityType1, 'Edm.Int16');
  /**
   * Static representation of the [[int32Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_32_PROPERTY: NumberField<TestEntitySharesEntityType1> = new NumberField('Int32Property', TestEntitySharesEntityType1, 'Edm.Int32');
  /**
   * Static representation of the [[int64Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_64_PROPERTY: BigNumberField<TestEntitySharesEntityType1> = new BigNumberField('Int64Property', TestEntitySharesEntityType1, 'Edm.Int64');
  /**
   * Static representation of the [[decimalProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DECIMAL_PROPERTY: BigNumberField<TestEntitySharesEntityType1> = new BigNumberField('DecimalProperty', TestEntitySharesEntityType1, 'Edm.Decimal');
  /**
   * Static representation of the [[singleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SINGLE_PROPERTY: NumberField<TestEntitySharesEntityType1> = new NumberField('SingleProperty', TestEntitySharesEntityType1, 'Edm.Single');
  /**
   * Static representation of the [[doubleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DOUBLE_PROPERTY: NumberField<TestEntitySharesEntityType1> = new NumberField('DoubleProperty', TestEntitySharesEntityType1, 'Edm.Double');
  /**
   * Static representation of the [[floatProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const FLOAT_PROPERTY: NumberField<TestEntitySharesEntityType1> = new NumberField('FloatProperty', TestEntitySharesEntityType1, 'Edm.Float');
  /**
   * Static representation of the [[timeOfDayProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TIME_OF_DAY_PROPERTY: TimeField<TestEntitySharesEntityType1> = new TimeField('TimeOfDayProperty', TestEntitySharesEntityType1, 'Edm.TimeOfDay');
  /**
   * Static representation of the [[dateProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATE_PROPERTY: DateField<TestEntitySharesEntityType1> = new DateField('DateProperty', TestEntitySharesEntityType1, 'Edm.Date');
  /**
   * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATE_TIME_OFF_SET_PROPERTY: DateField<TestEntitySharesEntityType1> = new DateField('DateTimeOffSetProperty', TestEntitySharesEntityType1, 'Edm.DateTimeOffset');
  /**
   * Static representation of the [[durationProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DURATION_PROPERTY: DurationField<TestEntitySharesEntityType1> = new DurationField('DurationProperty', TestEntitySharesEntityType1, 'Edm.Duration');
  /**
   * Static representation of the [[byteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BYTE_PROPERTY: NumberField<TestEntitySharesEntityType1> = new NumberField('ByteProperty', TestEntitySharesEntityType1, 'Edm.Byte');
  /**
   * Static representation of the [[sByteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const S_BYTE_PROPERTY: NumberField<TestEntitySharesEntityType1> = new NumberField('SByteProperty', TestEntitySharesEntityType1, 'Edm.SByte');
  /**
   * Static representation of the [[geographyPointProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GEOGRAPHY_POINT_PROPERTY: AnyField<TestEntitySharesEntityType1> = new AnyField('GeographyPointProperty', TestEntitySharesEntityType1, 'Edm.Any');
  /**
   * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SOMETHING_THE_SDK_DOES_NOT_SUPPORT: AnyField<TestEntitySharesEntityType1> = new AnyField('SomethingTheSDKDoesNotSupport', TestEntitySharesEntityType1, 'Edm.Any');
  /**
   * Static representation of the [[collectionProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COLLECTION_PROPERTY: CollectionField<TestEntitySharesEntityType1, 'Edm.String'> = new CollectionField('CollectionProperty', TestEntitySharesEntityType1, 'Edm.String');
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COMPLEX_TYPE_PROPERTY: TestComplexTypeField<TestEntitySharesEntityType1> = new TestComplexTypeField('ComplexTypeProperty', TestEntitySharesEntityType1);
  /**
   * Static representation of the [[complexTypeCollectionProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COMPLEX_TYPE_COLLECTION_PROPERTY: CollectionField<TestEntitySharesEntityType1, TestComplexType> = new CollectionField('ComplexTypeCollectionProperty', TestEntitySharesEntityType1, TestComplexType);
  /**
   * Static representation of the [[enumProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ENUM_PROPERTY: EnumField<TestEntitySharesEntityType1> = new EnumField('EnumProperty', TestEntitySharesEntityType1);
  /**
   * Static representation of the [[enumPropertyWithOneMember]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ENUM_PROPERTY_WITH_ONE_MEMBER: EnumField<TestEntitySharesEntityType1> = new EnumField('EnumPropertyWithOneMember', TestEntitySharesEntityType1);
  /**
   * Static representation of the [[enumCollectionProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ENUM_COLLECTION_PROPERTY: CollectionField<TestEntitySharesEntityType1, 'Edm.Enum'> = new CollectionField('EnumCollectionProperty', TestEntitySharesEntityType1, 'Edm.Enum');
  /**
   * All fields of the TestEntitySharesEntityType1 entity.
   */
  export const _allFields: Array<StringField<TestEntitySharesEntityType1> | BooleanField<TestEntitySharesEntityType1> | NumberField<TestEntitySharesEntityType1> | BigNumberField<TestEntitySharesEntityType1> | TimeField<TestEntitySharesEntityType1> | DateField<TestEntitySharesEntityType1> | DurationField<TestEntitySharesEntityType1> | AnyField<TestEntitySharesEntityType1> | CollectionField<TestEntitySharesEntityType1, 'Edm.String'> | TestComplexTypeField<TestEntitySharesEntityType1> | CollectionField<TestEntitySharesEntityType1, TestComplexType> | EnumField<TestEntitySharesEntityType1> | CollectionField<TestEntitySharesEntityType1, 'Edm.Enum'>> = [
    TestEntitySharesEntityType1.KEY_PROPERTY_GUID,
    TestEntitySharesEntityType1.KEY_PROPERTY_STRING,
    TestEntitySharesEntityType1.STRING_PROPERTY,
    TestEntitySharesEntityType1.BOOLEAN_PROPERTY,
    TestEntitySharesEntityType1.GUID_PROPERTY,
    TestEntitySharesEntityType1.INT_16_PROPERTY,
    TestEntitySharesEntityType1.INT_32_PROPERTY,
    TestEntitySharesEntityType1.INT_64_PROPERTY,
    TestEntitySharesEntityType1.DECIMAL_PROPERTY,
    TestEntitySharesEntityType1.SINGLE_PROPERTY,
    TestEntitySharesEntityType1.DOUBLE_PROPERTY,
    TestEntitySharesEntityType1.FLOAT_PROPERTY,
    TestEntitySharesEntityType1.TIME_OF_DAY_PROPERTY,
    TestEntitySharesEntityType1.DATE_PROPERTY,
    TestEntitySharesEntityType1.DATE_TIME_OFF_SET_PROPERTY,
    TestEntitySharesEntityType1.DURATION_PROPERTY,
    TestEntitySharesEntityType1.BYTE_PROPERTY,
    TestEntitySharesEntityType1.S_BYTE_PROPERTY,
    TestEntitySharesEntityType1.GEOGRAPHY_POINT_PROPERTY,
    TestEntitySharesEntityType1.SOMETHING_THE_SDK_DOES_NOT_SUPPORT,
    TestEntitySharesEntityType1.COLLECTION_PROPERTY,
    TestEntitySharesEntityType1.COMPLEX_TYPE_PROPERTY,
    TestEntitySharesEntityType1.COMPLEX_TYPE_COLLECTION_PROPERTY,
    TestEntitySharesEntityType1.ENUM_PROPERTY,
    TestEntitySharesEntityType1.ENUM_PROPERTY_WITH_ONE_MEMBER,
    TestEntitySharesEntityType1.ENUM_COLLECTION_PROPERTY
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntitySharesEntityType1> = new AllFields('*', TestEntitySharesEntityType1);
  /**
   * All key fields of the TestEntitySharesEntityType1 entity.
   */
  export const _keyFields: Array<Field<TestEntitySharesEntityType1>> = [TestEntitySharesEntityType1.KEY_PROPERTY_GUID, TestEntitySharesEntityType1.KEY_PROPERTY_STRING];
  /**
   * Mapping of all key field names to the respective static field property TestEntitySharesEntityType1.
   */
  export const _keys: { [keys: string]: Field<TestEntitySharesEntityType1> } = TestEntitySharesEntityType1._keyFields.reduce((acc: { [keys: string]: Field<TestEntitySharesEntityType1> }, field: Field<TestEntitySharesEntityType1>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
