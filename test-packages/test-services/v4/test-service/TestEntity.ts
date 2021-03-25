/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityRequestBuilder } from './TestEntityRequestBuilder';
import { Moment, Duration } from 'moment';
import { BigNumber } from 'bignumber.js';
import { TestComplexType, TestComplexTypeField } from './TestComplexType';
import { TestEnumType } from './TestEnumType';
import { TestEnumTypeWithOneMember } from './TestEnumTypeWithOneMember';
import {
  AllFields,
  AnyField,
  BigNumberField,
  BooleanField,
  CollectionField,
  CustomFieldV4,
  DateField,
  DurationField,
  EntityBuilderType,
  EntityV4,
  EnumField,
  Field,
  NumberField,
  OneToManyLink,
  OneToOneLink,
  StringField,
  Time,
  TimeField
} from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "A_TestEntity" of service "API_TEST_SRV".
 */
export class TestEntity extends EntityV4 implements TestEntityType {
  /**
   * Technical entity name for TestEntity.
   */
  static _entityName = 'A_TestEntity';
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
   * Returns an entity builder to construct instances of `TestEntity`.
   * @returns A builder that constructs instances of entity type `TestEntity`.
   */
  static builder(): EntityBuilderType<TestEntity, TestEntityType> {
    return EntityV4.entityBuilder(TestEntity);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntity` entity type.
   * @returns A `TestEntity` request builder.
   */
  static requestBuilder(): TestEntityRequestBuilder {
    return new TestEntityRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntity> {
    return EntityV4.customFieldSelector(fieldName, TestEntity);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

import {
  TestEntityMultiLink,
  TestEntityMultiLinkType
} from './TestEntityMultiLink';
import {
  TestEntitySingleLink,
  TestEntitySingleLinkType
} from './TestEntitySingleLink';

export interface TestEntityType {
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

export namespace TestEntity {
  /**
   * Static representation of the [[keyPropertyGuid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_GUID: StringField<TestEntity> = new StringField(
    'KeyPropertyGuid',
    TestEntity,
    'Edm.Guid'
  );
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_STRING: StringField<TestEntity> = new StringField(
    'KeyPropertyString',
    TestEntity,
    'Edm.String'
  );
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const STRING_PROPERTY: StringField<TestEntity> = new StringField(
    'StringProperty',
    TestEntity,
    'Edm.String'
  );
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BOOLEAN_PROPERTY: BooleanField<TestEntity> = new BooleanField(
    'BooleanProperty',
    TestEntity,
    'Edm.Boolean'
  );
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GUID_PROPERTY: StringField<TestEntity> = new StringField(
    'GuidProperty',
    TestEntity,
    'Edm.Guid'
  );
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_16_PROPERTY: NumberField<TestEntity> = new NumberField(
    'Int16Property',
    TestEntity,
    'Edm.Int16'
  );
  /**
   * Static representation of the [[int32Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_32_PROPERTY: NumberField<TestEntity> = new NumberField(
    'Int32Property',
    TestEntity,
    'Edm.Int32'
  );
  /**
   * Static representation of the [[int64Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_64_PROPERTY: BigNumberField<TestEntity> = new BigNumberField(
    'Int64Property',
    TestEntity,
    'Edm.Int64'
  );
  /**
   * Static representation of the [[decimalProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DECIMAL_PROPERTY: BigNumberField<TestEntity> = new BigNumberField(
    'DecimalProperty',
    TestEntity,
    'Edm.Decimal'
  );
  /**
   * Static representation of the [[singleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SINGLE_PROPERTY: NumberField<TestEntity> = new NumberField(
    'SingleProperty',
    TestEntity,
    'Edm.Single'
  );
  /**
   * Static representation of the [[doubleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DOUBLE_PROPERTY: NumberField<TestEntity> = new NumberField(
    'DoubleProperty',
    TestEntity,
    'Edm.Double'
  );
  /**
   * Static representation of the [[floatProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const FLOAT_PROPERTY: NumberField<TestEntity> = new NumberField(
    'FloatProperty',
    TestEntity,
    'Edm.Float'
  );
  /**
   * Static representation of the [[timeOfDayProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TIME_OF_DAY_PROPERTY: TimeField<TestEntity> = new TimeField(
    'TimeOfDayProperty',
    TestEntity,
    'Edm.TimeOfDay'
  );
  /**
   * Static representation of the [[dateProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATE_PROPERTY: DateField<TestEntity> = new DateField(
    'DateProperty',
    TestEntity,
    'Edm.Date'
  );
  /**
   * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATE_TIME_OFF_SET_PROPERTY: DateField<TestEntity> = new DateField(
    'DateTimeOffSetProperty',
    TestEntity,
    'Edm.DateTimeOffset'
  );
  /**
   * Static representation of the [[durationProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DURATION_PROPERTY: DurationField<TestEntity> = new DurationField(
    'DurationProperty',
    TestEntity,
    'Edm.Duration'
  );
  /**
   * Static representation of the [[byteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BYTE_PROPERTY: NumberField<TestEntity> = new NumberField(
    'ByteProperty',
    TestEntity,
    'Edm.Byte'
  );
  /**
   * Static representation of the [[sByteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const S_BYTE_PROPERTY: NumberField<TestEntity> = new NumberField(
    'SByteProperty',
    TestEntity,
    'Edm.SByte'
  );
  /**
   * Static representation of the [[geographyPointProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GEOGRAPHY_POINT_PROPERTY: AnyField<TestEntity> = new AnyField(
    'GeographyPointProperty',
    TestEntity,
    'Edm.Any'
  );
  /**
   * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SOMETHING_THE_SDK_DOES_NOT_SUPPORT: AnyField<TestEntity> = new AnyField(
    'SomethingTheSDKDoesNotSupport',
    TestEntity,
    'Edm.Any'
  );
  /**
   * Static representation of the [[collectionProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COLLECTION_PROPERTY: CollectionField<
    TestEntity,
    'Edm.String'
  > = new CollectionField('CollectionProperty', TestEntity, 'Edm.String');
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COMPLEX_TYPE_PROPERTY: TestComplexTypeField<TestEntity> = new TestComplexTypeField(
    'ComplexTypeProperty',
    TestEntity
  );
  /**
   * Static representation of the [[complexTypeCollectionProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COMPLEX_TYPE_COLLECTION_PROPERTY: CollectionField<
    TestEntity,
    TestComplexType
  > = new CollectionField(
    'ComplexTypeCollectionProperty',
    TestEntity,
    TestComplexType
  );
  /**
   * Static representation of the [[enumProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ENUM_PROPERTY: EnumField<TestEntity> = new EnumField(
    'EnumProperty',
    TestEntity
  );
  /**
   * Static representation of the [[enumPropertyWithOneMember]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ENUM_PROPERTY_WITH_ONE_MEMBER: EnumField<TestEntity> = new EnumField(
    'EnumPropertyWithOneMember',
    TestEntity
  );
  /**
   * Static representation of the [[enumCollectionProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ENUM_COLLECTION_PROPERTY: CollectionField<
    TestEntity,
    'Edm.Enum'
  > = new CollectionField('EnumCollectionProperty', TestEntity, 'Edm.Enum');
  /**
   * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_MULTI_LINK: OneToManyLink<
    TestEntity,
    TestEntityMultiLink
  > = new OneToManyLink('to_MultiLink', TestEntity, TestEntityMultiLink);
  /**
   * Static representation of the one-to-many navigation property [[toOtherMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_OTHER_MULTI_LINK: OneToManyLink<
    TestEntity,
    TestEntityMultiLink
  > = new OneToManyLink('to_OtherMultiLink', TestEntity, TestEntityMultiLink);
  /**
   * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_SINGLE_LINK: OneToOneLink<
    TestEntity,
    TestEntitySingleLink
  > = new OneToOneLink('to_SingleLink', TestEntity, TestEntitySingleLink);
  /**
   * All fields of the TestEntity entity.
   */
  export const _allFields: Array<
    | StringField<TestEntity>
    | BooleanField<TestEntity>
    | NumberField<TestEntity>
    | BigNumberField<TestEntity>
    | TimeField<TestEntity>
    | DateField<TestEntity>
    | DurationField<TestEntity>
    | AnyField<TestEntity>
    | CollectionField<TestEntity, 'Edm.String'>
    | TestComplexTypeField<TestEntity>
    | CollectionField<TestEntity, TestComplexType>
    | EnumField<TestEntity>
    | CollectionField<TestEntity, 'Edm.Enum'>
    | OneToManyLink<TestEntity, TestEntityMultiLink>
    | OneToOneLink<TestEntity, TestEntitySingleLink>
  > = [
    TestEntity.KEY_PROPERTY_GUID,
    TestEntity.KEY_PROPERTY_STRING,
    TestEntity.STRING_PROPERTY,
    TestEntity.BOOLEAN_PROPERTY,
    TestEntity.GUID_PROPERTY,
    TestEntity.INT_16_PROPERTY,
    TestEntity.INT_32_PROPERTY,
    TestEntity.INT_64_PROPERTY,
    TestEntity.DECIMAL_PROPERTY,
    TestEntity.SINGLE_PROPERTY,
    TestEntity.DOUBLE_PROPERTY,
    TestEntity.FLOAT_PROPERTY,
    TestEntity.TIME_OF_DAY_PROPERTY,
    TestEntity.DATE_PROPERTY,
    TestEntity.DATE_TIME_OFF_SET_PROPERTY,
    TestEntity.DURATION_PROPERTY,
    TestEntity.BYTE_PROPERTY,
    TestEntity.S_BYTE_PROPERTY,
    TestEntity.GEOGRAPHY_POINT_PROPERTY,
    TestEntity.SOMETHING_THE_SDK_DOES_NOT_SUPPORT,
    TestEntity.COLLECTION_PROPERTY,
    TestEntity.COMPLEX_TYPE_PROPERTY,
    TestEntity.COMPLEX_TYPE_COLLECTION_PROPERTY,
    TestEntity.ENUM_PROPERTY,
    TestEntity.ENUM_PROPERTY_WITH_ONE_MEMBER,
    TestEntity.ENUM_COLLECTION_PROPERTY,
    TestEntity.TO_MULTI_LINK,
    TestEntity.TO_OTHER_MULTI_LINK,
    TestEntity.TO_SINGLE_LINK
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntity> = new AllFields(
    '*',
    TestEntity
  );
  /**
   * All key fields of the TestEntity entity.
   */
  export const _keyFields: Array<Field<TestEntity>> = [
    TestEntity.KEY_PROPERTY_GUID,
    TestEntity.KEY_PROPERTY_STRING
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntity.
   */
  export const _keys: {
    [keys: string]: Field<TestEntity>;
  } = TestEntity._keyFields.reduce(
    (acc: { [keys: string]: Field<TestEntity> }, field: Field<TestEntity>) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
