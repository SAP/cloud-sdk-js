/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntitySharesEntityTypeRequestBuilder } from './TestEntitySharesEntityTypeRequestBuilder';
import { Moment, Duration } from 'moment';
import { BigNumber } from 'bignumber.js';
import { TestComplexType, TestComplexTypeField } from './TestComplexType';
import { TestEnumType } from './TestEnumType';
import { TestEnumTypeWithOneMember } from './TestEnumTypeWithOneMember';
import { AllFields, AnyField, BigNumberField, BooleanField, CollectionField, CustomFieldV4, DateField, DurationField, EntityBuilderType, EntityV4, EnumField, Field, NumberField, OneToManyLink, OneToOneLink, StringField, Time, TimeField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "A_TestEntitySharesEntityType" of service "API_TEST_SRV".
 */
export class TestEntitySharesEntityType extends EntityV4 implements TestEntitySharesEntityTypeType {
  /**
   * Technical entity name for TestEntitySharesEntityType.
   */
  static _entityName = 'A_TestEntitySharesEntityType';
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
   * One-to-many navigation property to the [[TestEntityMultiLink]] entity.
   */
  toMultiLink!: TestEntityMultiLink[];
  /**
   * One-to-many navigation property to the [[TestEntityMultiLink]] entity.
   */
  toOtherMultiLink!: TestEntityMultiLink[];
  /**
   * One-to-one navigation property to the [[TestEntitySingleLink]] entity.
   */
  toSingleLink!: TestEntitySingleLink;

  /**
   * Returns an entity builder to construct instances of `TestEntitySharesEntityType`.
   * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType`.
   */
  static builder(): EntityBuilderType<TestEntitySharesEntityType, TestEntitySharesEntityTypeType> {
    return EntityV4.entityBuilder(TestEntitySharesEntityType);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntitySharesEntityType` entity type.
   * @returns A `TestEntitySharesEntityType` request builder.
   */
  static requestBuilder(): TestEntitySharesEntityTypeRequestBuilder {
    return new TestEntitySharesEntityTypeRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntitySharesEntityType`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntitySharesEntityType> {
    return EntityV4.customFieldSelector(fieldName, TestEntitySharesEntityType);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

import { TestEntityMultiLink, TestEntityMultiLinkType } from './TestEntityMultiLink';
import { TestEntitySingleLink, TestEntitySingleLinkType } from './TestEntitySingleLink';

export interface TestEntitySharesEntityTypeType {
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
  toMultiLink: TestEntityMultiLinkType[];
  toOtherMultiLink: TestEntityMultiLinkType[];
  toSingleLink: TestEntitySingleLinkType;
}

export namespace TestEntitySharesEntityType {
  /**
   * Static representation of the [[keyPropertyGuid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_GUID: StringField<TestEntitySharesEntityType> = new StringField('KeyPropertyGuid', TestEntitySharesEntityType, 'Edm.Guid');
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_STRING: StringField<TestEntitySharesEntityType> = new StringField('KeyPropertyString', TestEntitySharesEntityType, 'Edm.String');
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const STRING_PROPERTY: StringField<TestEntitySharesEntityType> = new StringField('StringProperty', TestEntitySharesEntityType, 'Edm.String');
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BOOLEAN_PROPERTY: BooleanField<TestEntitySharesEntityType> = new BooleanField('BooleanProperty', TestEntitySharesEntityType, 'Edm.Boolean');
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GUID_PROPERTY: StringField<TestEntitySharesEntityType> = new StringField('GuidProperty', TestEntitySharesEntityType, 'Edm.Guid');
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_16_PROPERTY: NumberField<TestEntitySharesEntityType> = new NumberField('Int16Property', TestEntitySharesEntityType, 'Edm.Int16');
  /**
   * Static representation of the [[int32Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_32_PROPERTY: NumberField<TestEntitySharesEntityType> = new NumberField('Int32Property', TestEntitySharesEntityType, 'Edm.Int32');
  /**
   * Static representation of the [[int64Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_64_PROPERTY: BigNumberField<TestEntitySharesEntityType> = new BigNumberField('Int64Property', TestEntitySharesEntityType, 'Edm.Int64');
  /**
   * Static representation of the [[decimalProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DECIMAL_PROPERTY: BigNumberField<TestEntitySharesEntityType> = new BigNumberField('DecimalProperty', TestEntitySharesEntityType, 'Edm.Decimal');
  /**
   * Static representation of the [[singleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SINGLE_PROPERTY: NumberField<TestEntitySharesEntityType> = new NumberField('SingleProperty', TestEntitySharesEntityType, 'Edm.Single');
  /**
   * Static representation of the [[doubleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DOUBLE_PROPERTY: NumberField<TestEntitySharesEntityType> = new NumberField('DoubleProperty', TestEntitySharesEntityType, 'Edm.Double');
  /**
   * Static representation of the [[floatProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const FLOAT_PROPERTY: NumberField<TestEntitySharesEntityType> = new NumberField('FloatProperty', TestEntitySharesEntityType, 'Edm.Float');
  /**
   * Static representation of the [[timeOfDayProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TIME_OF_DAY_PROPERTY: TimeField<TestEntitySharesEntityType> = new TimeField('TimeOfDayProperty', TestEntitySharesEntityType, 'Edm.TimeOfDay');
  /**
   * Static representation of the [[dateProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATE_PROPERTY: DateField<TestEntitySharesEntityType> = new DateField('DateProperty', TestEntitySharesEntityType, 'Edm.Date');
  /**
   * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATE_TIME_OFF_SET_PROPERTY: DateField<TestEntitySharesEntityType> = new DateField('DateTimeOffSetProperty', TestEntitySharesEntityType, 'Edm.DateTimeOffset');
  /**
   * Static representation of the [[durationProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DURATION_PROPERTY: DurationField<TestEntitySharesEntityType> = new DurationField('DurationProperty', TestEntitySharesEntityType, 'Edm.Duration');
  /**
   * Static representation of the [[byteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BYTE_PROPERTY: NumberField<TestEntitySharesEntityType> = new NumberField('ByteProperty', TestEntitySharesEntityType, 'Edm.Byte');
  /**
   * Static representation of the [[sByteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const S_BYTE_PROPERTY: NumberField<TestEntitySharesEntityType> = new NumberField('SByteProperty', TestEntitySharesEntityType, 'Edm.SByte');
  /**
   * Static representation of the [[geographyPointProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GEOGRAPHY_POINT_PROPERTY: AnyField<TestEntitySharesEntityType> = new AnyField('GeographyPointProperty', TestEntitySharesEntityType, 'Edm.Any');
  /**
   * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SOMETHING_THE_SDK_DOES_NOT_SUPPORT: AnyField<TestEntitySharesEntityType> = new AnyField('SomethingTheSDKDoesNotSupport', TestEntitySharesEntityType, 'Edm.Any');
  /**
   * Static representation of the [[collectionProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COLLECTION_PROPERTY: CollectionField<TestEntitySharesEntityType, 'Edm.String'> = new CollectionField('CollectionProperty', TestEntitySharesEntityType, 'Edm.String');
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COMPLEX_TYPE_PROPERTY: TestComplexTypeField<TestEntitySharesEntityType> = new TestComplexTypeField('ComplexTypeProperty', TestEntitySharesEntityType);
  /**
   * Static representation of the [[complexTypeCollectionProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COMPLEX_TYPE_COLLECTION_PROPERTY: CollectionField<TestEntitySharesEntityType, TestComplexType> = new CollectionField('ComplexTypeCollectionProperty', TestEntitySharesEntityType, TestComplexType);
  /**
   * Static representation of the [[enumProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ENUM_PROPERTY: EnumField<TestEntitySharesEntityType> = new EnumField('EnumProperty', TestEntitySharesEntityType);
  /**
   * Static representation of the [[enumPropertyWithOneMember]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ENUM_PROPERTY_WITH_ONE_MEMBER: EnumField<TestEntitySharesEntityType> = new EnumField('EnumPropertyWithOneMember', TestEntitySharesEntityType);
  /**
   * Static representation of the [[enumCollectionProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ENUM_COLLECTION_PROPERTY: CollectionField<TestEntitySharesEntityType, 'Edm.Enum'> = new CollectionField('EnumCollectionProperty', TestEntitySharesEntityType, 'Edm.Enum');
  /**
   * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_MULTI_LINK: OneToManyLink<TestEntitySharesEntityType, TestEntityMultiLink> = new OneToManyLink('to_MultiLink', TestEntitySharesEntityType, TestEntityMultiLink);
  /**
   * Static representation of the one-to-many navigation property [[toOtherMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_OTHER_MULTI_LINK: OneToManyLink<TestEntitySharesEntityType, TestEntityMultiLink> = new OneToManyLink('to_OtherMultiLink', TestEntitySharesEntityType, TestEntityMultiLink);
  /**
   * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_SINGLE_LINK: OneToOneLink<TestEntitySharesEntityType, TestEntitySingleLink> = new OneToOneLink('to_SingleLink', TestEntitySharesEntityType, TestEntitySingleLink);
  /**
   * All fields of the TestEntitySharesEntityType entity.
   */
  export const _allFields: Array<StringField<TestEntitySharesEntityType> | BooleanField<TestEntitySharesEntityType> | NumberField<TestEntitySharesEntityType> | BigNumberField<TestEntitySharesEntityType> | TimeField<TestEntitySharesEntityType> | DateField<TestEntitySharesEntityType> | DurationField<TestEntitySharesEntityType> | AnyField<TestEntitySharesEntityType> | CollectionField<TestEntitySharesEntityType, 'Edm.String'> | TestComplexTypeField<TestEntitySharesEntityType> | CollectionField<TestEntitySharesEntityType, TestComplexType> | EnumField<TestEntitySharesEntityType> | CollectionField<TestEntitySharesEntityType, 'Edm.Enum'> | OneToManyLink<TestEntitySharesEntityType, TestEntityMultiLink> | OneToOneLink<TestEntitySharesEntityType, TestEntitySingleLink>> = [
    TestEntitySharesEntityType.KEY_PROPERTY_GUID,
    TestEntitySharesEntityType.KEY_PROPERTY_STRING,
    TestEntitySharesEntityType.STRING_PROPERTY,
    TestEntitySharesEntityType.BOOLEAN_PROPERTY,
    TestEntitySharesEntityType.GUID_PROPERTY,
    TestEntitySharesEntityType.INT_16_PROPERTY,
    TestEntitySharesEntityType.INT_32_PROPERTY,
    TestEntitySharesEntityType.INT_64_PROPERTY,
    TestEntitySharesEntityType.DECIMAL_PROPERTY,
    TestEntitySharesEntityType.SINGLE_PROPERTY,
    TestEntitySharesEntityType.DOUBLE_PROPERTY,
    TestEntitySharesEntityType.FLOAT_PROPERTY,
    TestEntitySharesEntityType.TIME_OF_DAY_PROPERTY,
    TestEntitySharesEntityType.DATE_PROPERTY,
    TestEntitySharesEntityType.DATE_TIME_OFF_SET_PROPERTY,
    TestEntitySharesEntityType.DURATION_PROPERTY,
    TestEntitySharesEntityType.BYTE_PROPERTY,
    TestEntitySharesEntityType.S_BYTE_PROPERTY,
    TestEntitySharesEntityType.GEOGRAPHY_POINT_PROPERTY,
    TestEntitySharesEntityType.SOMETHING_THE_SDK_DOES_NOT_SUPPORT,
    TestEntitySharesEntityType.COLLECTION_PROPERTY,
    TestEntitySharesEntityType.COMPLEX_TYPE_PROPERTY,
    TestEntitySharesEntityType.COMPLEX_TYPE_COLLECTION_PROPERTY,
    TestEntitySharesEntityType.ENUM_PROPERTY,
    TestEntitySharesEntityType.ENUM_PROPERTY_WITH_ONE_MEMBER,
    TestEntitySharesEntityType.ENUM_COLLECTION_PROPERTY,
    TestEntitySharesEntityType.TO_MULTI_LINK,
    TestEntitySharesEntityType.TO_OTHER_MULTI_LINK,
    TestEntitySharesEntityType.TO_SINGLE_LINK
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntitySharesEntityType> = new AllFields('*', TestEntitySharesEntityType);
  /**
   * All key fields of the TestEntitySharesEntityType entity.
   */
  export const _keyFields: Array<Field<TestEntitySharesEntityType>> = [TestEntitySharesEntityType.KEY_PROPERTY_GUID, TestEntitySharesEntityType.KEY_PROPERTY_STRING];
  /**
   * Mapping of all key field names to the respective static field property TestEntitySharesEntityType.
   */
  export const _keys: { [keys: string]: Field<TestEntitySharesEntityType> } = TestEntitySharesEntityType._keyFields.reduce((acc: { [keys: string]: Field<TestEntitySharesEntityType> }, field: Field<TestEntitySharesEntityType>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
