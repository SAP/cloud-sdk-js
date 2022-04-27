import { TestEntityRequestBuilder } from './TestEntityRequestBuilder';
import { Moment, Duration } from 'moment';
import { BigNumber } from 'bignumber.js';
import { TestComplexType, TestComplexTypeField } from './TestComplexType';
import { TestEnumType } from './TestEnumType';
import { TestEnumTypeInt64 } from './TestEnumTypeInt64';
import { TestEnumTypeWithOneMember } from './TestEnumTypeWithOneMember';
import {
  AllFields,
  CollectionField,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  EnumField,
  Field,
  OneToManyLink,
  OneToOneLink,
  OrderableEdmTypeField,
  Time
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntity" of service "API_TEST_SRV".
 */
export declare class TestEntity extends EntityV4 implements TestEntityType {
  /**
   * Technical entity name for TestEntity.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * Key Property Guid.
   */
  keyPropertyGuid: string;
  /**
   * Key Property String.
   */
  keyPropertyString: string;
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
   * Enum Property Int 64.
   * @nullable
   */
  enumPropertyInt64?: TestEnumTypeInt64;
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
  toMultiLink: TestEntityMultiLink[];
  /**
   * One-to-many navigation property to the [[TestEntityMultiLink]] entity.
   */
  toOtherMultiLink: TestEntityMultiLink[];
  /**
   * One-to-one navigation property to the [[TestEntitySingleLink]] entity.
   */
  toSingleLink?: TestEntitySingleLink | null;
  /**
   * Returns an entity builder to construct instances of `TestEntity`.
   * @returns A builder that constructs instances of entity type `TestEntity`.
   */
  static builder(): EntityBuilderType<TestEntity, TestEntityType>;
  /**
   * Returns a request builder to construct requests for operations on the `TestEntity` entity type.
   * @returns A `TestEntity` request builder.
   */
  static requestBuilder(): TestEntityRequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntity>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
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
  enumPropertyInt64?: TestEnumTypeInt64 | null;
  enumPropertyWithOneMember?: TestEnumTypeWithOneMember | null;
  enumCollectionProperty?: TestEnumType[] | null;
  toMultiLink: TestEntityMultiLinkType[];
  toOtherMultiLink: TestEntityMultiLinkType[];
  toSingleLink?: TestEntitySingleLinkType | null;
}
export declare namespace TestEntity {
  /**
   * Static representation of the [[keyPropertyGuid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY_GUID: EdmTypeField<TestEntity, 'Edm.Guid', false, true>;
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY_STRING: EdmTypeField<
    TestEntity,
    'Edm.String',
    false,
    true
  >;
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const STRING_PROPERTY: EdmTypeField<TestEntity, 'Edm.String', true, true>;
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const BOOLEAN_PROPERTY: EdmTypeField<TestEntity, 'Edm.Boolean', true, true>;
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const GUID_PROPERTY: EdmTypeField<TestEntity, 'Edm.Guid', true, true>;
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const INT_16_PROPERTY: OrderableEdmTypeField<
    TestEntity,
    'Edm.Int16',
    true,
    true
  >;
  /**
   * Static representation of the [[int32Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const INT_32_PROPERTY: OrderableEdmTypeField<
    TestEntity,
    'Edm.Int32',
    true,
    true
  >;
  /**
   * Static representation of the [[int64Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const INT_64_PROPERTY: OrderableEdmTypeField<
    TestEntity,
    'Edm.Int64',
    true,
    true
  >;
  /**
   * Static representation of the [[decimalProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const DECIMAL_PROPERTY: OrderableEdmTypeField<
    TestEntity,
    'Edm.Decimal',
    true,
    true
  >;
  /**
   * Static representation of the [[singleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const SINGLE_PROPERTY: OrderableEdmTypeField<
    TestEntity,
    'Edm.Single',
    true,
    true
  >;
  /**
   * Static representation of the [[doubleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const DOUBLE_PROPERTY: OrderableEdmTypeField<
    TestEntity,
    'Edm.Double',
    true,
    true
  >;
  /**
   * Static representation of the [[floatProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const FLOAT_PROPERTY: OrderableEdmTypeField<
    TestEntity,
    'Edm.Float',
    true,
    true
  >;
  /**
   * Static representation of the [[timeOfDayProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const TIME_OF_DAY_PROPERTY: OrderableEdmTypeField<
    TestEntity,
    'Edm.TimeOfDay',
    true,
    true
  >;
  /**
   * Static representation of the [[dateProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const DATE_PROPERTY: OrderableEdmTypeField<
    TestEntity,
    'Edm.Date',
    true,
    true
  >;
  /**
   * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const DATE_TIME_OFF_SET_PROPERTY: OrderableEdmTypeField<
    TestEntity,
    'Edm.DateTimeOffset',
    true,
    true
  >;
  /**
   * Static representation of the [[durationProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const DURATION_PROPERTY: OrderableEdmTypeField<
    TestEntity,
    'Edm.Duration',
    true,
    true
  >;
  /**
   * Static representation of the [[byteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const BYTE_PROPERTY: OrderableEdmTypeField<
    TestEntity,
    'Edm.Byte',
    true,
    true
  >;
  /**
   * Static representation of the [[sByteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const S_BYTE_PROPERTY: OrderableEdmTypeField<
    TestEntity,
    'Edm.SByte',
    true,
    true
  >;
  /**
   * Static representation of the [[geographyPointProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const GEOGRAPHY_POINT_PROPERTY: EdmTypeField<
    TestEntity,
    'Edm.Any',
    true,
    true
  >;
  /**
   * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const SOMETHING_THE_SDK_DOES_NOT_SUPPORT: EdmTypeField<
    TestEntity,
    'Edm.Any',
    true,
    true
  >;
  /**
   * Static representation of the [[collectionProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const COLLECTION_PROPERTY: CollectionField<
    TestEntity,
    'Edm.String',
    true,
    true
  >;
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const COMPLEX_TYPE_PROPERTY: TestComplexTypeField<TestEntity, true, true>;
  /**
   * Static representation of the [[complexTypeCollectionProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const COMPLEX_TYPE_COLLECTION_PROPERTY: CollectionField<
    TestEntity,
    TestComplexType,
    true,
    true
  >;
  /**
   * Static representation of the [[enumProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const ENUM_PROPERTY: EnumField<TestEntity, TestEnumType, true, true>;
  /**
   * Static representation of the [[enumPropertyInt64]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const ENUM_PROPERTY_INT_64: EnumField<
    TestEntity,
    TestEnumTypeInt64,
    true,
    true
  >;
  /**
   * Static representation of the [[enumPropertyWithOneMember]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const ENUM_PROPERTY_WITH_ONE_MEMBER: EnumField<
    TestEntity,
    TestEnumTypeWithOneMember,
    true,
    true
  >;
  /**
   * Static representation of the [[enumCollectionProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const ENUM_COLLECTION_PROPERTY: CollectionField<
    TestEntity,
    typeof TestEnumType,
    true,
    true
  >;
  /**
   * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const TO_MULTI_LINK: OneToManyLink<TestEntity, TestEntityMultiLink>;
  /**
   * Static representation of the one-to-many navigation property [[toOtherMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const TO_OTHER_MULTI_LINK: OneToManyLink<TestEntity, TestEntityMultiLink>;
  /**
   * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const TO_SINGLE_LINK: OneToOneLink<TestEntity, TestEntitySingleLink>;
  /**
   * All fields of the TestEntity entity.
   */
  const _allFields: Array<
    | EdmTypeField<TestEntity, 'Edm.Guid', false, true>
    | EdmTypeField<TestEntity, 'Edm.String', false, true>
    | EdmTypeField<TestEntity, 'Edm.String', true, true>
    | EdmTypeField<TestEntity, 'Edm.Boolean', true, true>
    | EdmTypeField<TestEntity, 'Edm.Guid', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.Int16', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.Int32', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.Int64', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.Decimal', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.Single', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.Double', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.Float', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.TimeOfDay', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.Date', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.DateTimeOffset', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.Duration', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.Byte', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.SByte', true, true>
    | EdmTypeField<TestEntity, 'Edm.Any', true, true>
    | CollectionField<TestEntity, 'Edm.String', true, true>
    | TestComplexTypeField<TestEntity, true, true>
    | CollectionField<TestEntity, TestComplexType, true, true>
    | EnumField<TestEntity, TestEnumType, true, true>
    | EnumField<TestEntity, TestEnumTypeInt64, true, true>
    | EnumField<TestEntity, TestEnumTypeWithOneMember, true, true>
    | CollectionField<TestEntity, typeof TestEnumType, true, true>
    | OneToManyLink<TestEntity, TestEntityMultiLink>
    | OneToOneLink<TestEntity, TestEntitySingleLink>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<TestEntity>;
  /**
   * All key fields of the TestEntity entity.
   */
  const _keyFields: Array<Field<TestEntity, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property TestEntity.
   */
  const _keys: {
    [keys: string]: Field<TestEntity, boolean, boolean>;
  };
}
//# sourceMappingURL=TestEntity.d.ts.map
