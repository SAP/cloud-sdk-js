/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntitySharesEntityType2RequestBuilder } from './TestEntitySharesEntityType2RequestBuilder';
import { Moment, Duration } from 'moment';
import { BigNumber } from 'bignumber.js';
import { TestComplexType, TestComplexTypeField } from './TestComplexType';
import { TestEnumType } from './TestEnumType';
import { TestEnumTypeWithOneMember } from './TestEnumTypeWithOneMember';
import { AllFields, AnyField, BigNumberField, BooleanField, CollectionField, CustomFieldV4, DateField, DurationField, EntityBuilderType, EntityV4, EnumField, Field, NumberField, StringField, Time, TimeField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "A_TestEntitySharesEntityType2" of service "API_TEST_SRV".
 */
export class TestEntitySharesEntityType2 extends EntityV4 implements TestEntitySharesEntityType2Type {
  /**
   * Technical entity name for TestEntitySharesEntityType2.
   */
  static _entityName = 'A_TestEntitySharesEntityType2';
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
   * Returns an entity builder to construct instances of `TestEntitySharesEntityType2`.
   * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType2`.
   */
  static builder(): EntityBuilderType<TestEntitySharesEntityType2, TestEntitySharesEntityType2Type> {
    return EntityV4.entityBuilder(TestEntitySharesEntityType2);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntitySharesEntityType2` entity type.
   * @returns A `TestEntitySharesEntityType2` request builder.
   */
  static requestBuilder(): TestEntitySharesEntityType2RequestBuilder {
    return new TestEntitySharesEntityType2RequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntitySharesEntityType2`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType2`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntitySharesEntityType2> {
    return EntityV4.customFieldSelector(fieldName, TestEntitySharesEntityType2);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntitySharesEntityType2Type {
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

export namespace TestEntitySharesEntityType2 {
  /**
   * Static representation of the [[keyPropertyGuid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_GUID: StringField<TestEntitySharesEntityType2> = new StringField('KeyPropertyGuid', TestEntitySharesEntityType2, 'Edm.Guid');
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_STRING: StringField<TestEntitySharesEntityType2> = new StringField('KeyPropertyString', TestEntitySharesEntityType2, 'Edm.String');
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const STRING_PROPERTY: StringField<TestEntitySharesEntityType2> = new StringField('StringProperty', TestEntitySharesEntityType2, 'Edm.String');
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BOOLEAN_PROPERTY: BooleanField<TestEntitySharesEntityType2> = new BooleanField('BooleanProperty', TestEntitySharesEntityType2, 'Edm.Boolean');
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GUID_PROPERTY: StringField<TestEntitySharesEntityType2> = new StringField('GuidProperty', TestEntitySharesEntityType2, 'Edm.Guid');
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_16_PROPERTY: NumberField<TestEntitySharesEntityType2> = new NumberField('Int16Property', TestEntitySharesEntityType2, 'Edm.Int16');
  /**
   * Static representation of the [[int32Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_32_PROPERTY: NumberField<TestEntitySharesEntityType2> = new NumberField('Int32Property', TestEntitySharesEntityType2, 'Edm.Int32');
  /**
   * Static representation of the [[int64Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_64_PROPERTY: BigNumberField<TestEntitySharesEntityType2> = new BigNumberField('Int64Property', TestEntitySharesEntityType2, 'Edm.Int64');
  /**
   * Static representation of the [[decimalProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DECIMAL_PROPERTY: BigNumberField<TestEntitySharesEntityType2> = new BigNumberField('DecimalProperty', TestEntitySharesEntityType2, 'Edm.Decimal');
  /**
   * Static representation of the [[singleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SINGLE_PROPERTY: NumberField<TestEntitySharesEntityType2> = new NumberField('SingleProperty', TestEntitySharesEntityType2, 'Edm.Single');
  /**
   * Static representation of the [[doubleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DOUBLE_PROPERTY: NumberField<TestEntitySharesEntityType2> = new NumberField('DoubleProperty', TestEntitySharesEntityType2, 'Edm.Double');
  /**
   * Static representation of the [[floatProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const FLOAT_PROPERTY: NumberField<TestEntitySharesEntityType2> = new NumberField('FloatProperty', TestEntitySharesEntityType2, 'Edm.Float');
  /**
   * Static representation of the [[timeOfDayProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TIME_OF_DAY_PROPERTY: TimeField<TestEntitySharesEntityType2> = new TimeField('TimeOfDayProperty', TestEntitySharesEntityType2, 'Edm.TimeOfDay');
  /**
   * Static representation of the [[dateProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATE_PROPERTY: DateField<TestEntitySharesEntityType2> = new DateField('DateProperty', TestEntitySharesEntityType2, 'Edm.Date');
  /**
   * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATE_TIME_OFF_SET_PROPERTY: DateField<TestEntitySharesEntityType2> = new DateField('DateTimeOffSetProperty', TestEntitySharesEntityType2, 'Edm.DateTimeOffset');
  /**
   * Static representation of the [[durationProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DURATION_PROPERTY: DurationField<TestEntitySharesEntityType2> = new DurationField('DurationProperty', TestEntitySharesEntityType2, 'Edm.Duration');
  /**
   * Static representation of the [[byteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BYTE_PROPERTY: NumberField<TestEntitySharesEntityType2> = new NumberField('ByteProperty', TestEntitySharesEntityType2, 'Edm.Byte');
  /**
   * Static representation of the [[sByteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const S_BYTE_PROPERTY: NumberField<TestEntitySharesEntityType2> = new NumberField('SByteProperty', TestEntitySharesEntityType2, 'Edm.SByte');
  /**
   * Static representation of the [[geographyPointProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GEOGRAPHY_POINT_PROPERTY: AnyField<TestEntitySharesEntityType2> = new AnyField('GeographyPointProperty', TestEntitySharesEntityType2, 'Edm.Any');
  /**
   * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SOMETHING_THE_SDK_DOES_NOT_SUPPORT: AnyField<TestEntitySharesEntityType2> = new AnyField('SomethingTheSDKDoesNotSupport', TestEntitySharesEntityType2, 'Edm.Any');
  /**
   * Static representation of the [[collectionProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COLLECTION_PROPERTY: CollectionField<TestEntitySharesEntityType2, 'Edm.String'> = new CollectionField('CollectionProperty', TestEntitySharesEntityType2, 'Edm.String');
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COMPLEX_TYPE_PROPERTY: TestComplexTypeField<TestEntitySharesEntityType2> = new TestComplexTypeField('ComplexTypeProperty', TestEntitySharesEntityType2);
  /**
   * Static representation of the [[complexTypeCollectionProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COMPLEX_TYPE_COLLECTION_PROPERTY: CollectionField<TestEntitySharesEntityType2, TestComplexType> = new CollectionField('ComplexTypeCollectionProperty', TestEntitySharesEntityType2, TestComplexType);
  /**
   * Static representation of the [[enumProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ENUM_PROPERTY: EnumField<TestEntitySharesEntityType2> = new EnumField('EnumProperty', TestEntitySharesEntityType2);
  /**
   * Static representation of the [[enumPropertyWithOneMember]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ENUM_PROPERTY_WITH_ONE_MEMBER: EnumField<TestEntitySharesEntityType2> = new EnumField('EnumPropertyWithOneMember', TestEntitySharesEntityType2);
  /**
   * Static representation of the [[enumCollectionProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ENUM_COLLECTION_PROPERTY: CollectionField<TestEntitySharesEntityType2, 'Edm.Enum'> = new CollectionField('EnumCollectionProperty', TestEntitySharesEntityType2, 'Edm.Enum');
  /**
   * All fields of the TestEntitySharesEntityType2 entity.
   */
  export const _allFields: Array<StringField<TestEntitySharesEntityType2> | BooleanField<TestEntitySharesEntityType2> | NumberField<TestEntitySharesEntityType2> | BigNumberField<TestEntitySharesEntityType2> | TimeField<TestEntitySharesEntityType2> | DateField<TestEntitySharesEntityType2> | DurationField<TestEntitySharesEntityType2> | AnyField<TestEntitySharesEntityType2> | CollectionField<TestEntitySharesEntityType2, 'Edm.String'> | TestComplexTypeField<TestEntitySharesEntityType2> | CollectionField<TestEntitySharesEntityType2, TestComplexType> | EnumField<TestEntitySharesEntityType2> | CollectionField<TestEntitySharesEntityType2, 'Edm.Enum'>> = [
    TestEntitySharesEntityType2.KEY_PROPERTY_GUID,
    TestEntitySharesEntityType2.KEY_PROPERTY_STRING,
    TestEntitySharesEntityType2.STRING_PROPERTY,
    TestEntitySharesEntityType2.BOOLEAN_PROPERTY,
    TestEntitySharesEntityType2.GUID_PROPERTY,
    TestEntitySharesEntityType2.INT_16_PROPERTY,
    TestEntitySharesEntityType2.INT_32_PROPERTY,
    TestEntitySharesEntityType2.INT_64_PROPERTY,
    TestEntitySharesEntityType2.DECIMAL_PROPERTY,
    TestEntitySharesEntityType2.SINGLE_PROPERTY,
    TestEntitySharesEntityType2.DOUBLE_PROPERTY,
    TestEntitySharesEntityType2.FLOAT_PROPERTY,
    TestEntitySharesEntityType2.TIME_OF_DAY_PROPERTY,
    TestEntitySharesEntityType2.DATE_PROPERTY,
    TestEntitySharesEntityType2.DATE_TIME_OFF_SET_PROPERTY,
    TestEntitySharesEntityType2.DURATION_PROPERTY,
    TestEntitySharesEntityType2.BYTE_PROPERTY,
    TestEntitySharesEntityType2.S_BYTE_PROPERTY,
    TestEntitySharesEntityType2.GEOGRAPHY_POINT_PROPERTY,
    TestEntitySharesEntityType2.SOMETHING_THE_SDK_DOES_NOT_SUPPORT,
    TestEntitySharesEntityType2.COLLECTION_PROPERTY,
    TestEntitySharesEntityType2.COMPLEX_TYPE_PROPERTY,
    TestEntitySharesEntityType2.COMPLEX_TYPE_COLLECTION_PROPERTY,
    TestEntitySharesEntityType2.ENUM_PROPERTY,
    TestEntitySharesEntityType2.ENUM_PROPERTY_WITH_ONE_MEMBER,
    TestEntitySharesEntityType2.ENUM_COLLECTION_PROPERTY
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntitySharesEntityType2> = new AllFields('*', TestEntitySharesEntityType2);
  /**
   * All key fields of the TestEntitySharesEntityType2 entity.
   */
  export const _keyFields: Array<Field<TestEntitySharesEntityType2>> = [TestEntitySharesEntityType2.KEY_PROPERTY_GUID, TestEntitySharesEntityType2.KEY_PROPERTY_STRING];
  /**
   * Mapping of all key field names to the respective static field property TestEntitySharesEntityType2.
   */
  export const _keys: { [keys: string]: Field<TestEntitySharesEntityType2> } = TestEntitySharesEntityType2._keyFields.reduce((acc: { [keys: string]: Field<TestEntitySharesEntityType2> }, field: Field<TestEntitySharesEntityType2>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
