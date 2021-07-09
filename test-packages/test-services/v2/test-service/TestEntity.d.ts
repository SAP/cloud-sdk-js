import { TestEntityRequestBuilder } from './TestEntityRequestBuilder';
import { Moment } from 'moment';
import { BigNumber } from 'bignumber.js';
import { TestComplexType, TestComplexTypeField } from './TestComplexType';
import {
  AllFields,
  CustomFieldV2,
  EdmTypeField,
  EntityBuilderType,
  EntityV2,
  Field,
  Link,
  OneToOneLink,
  OrderableEdmTypeField,
  Time
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntity" of service "API_TEST_SRV".
 */
export declare class TestEntity extends EntityV2 implements TestEntityType {
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
   * Time Property.
   * @nullable
   */
  timeProperty?: Time;
  /**
   * Date Time Property.
   * @nullable
   */
  dateTimeProperty?: Moment;
  /**
   * Date Time Off Set Property.
   * @nullable
   */
  dateTimeOffSetProperty?: Moment;
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
   * Something The Sdk Does Not Support.
   * @nullable
   */
  somethingTheSdkDoesNotSupport?: any;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestComplexType;
  /**
   * One-to-many navigation property to the [[TestEntityMultiLink]] entity.
   */
  toMultiLink: TestEntityMultiLink[];
  /**
   * One-to-many navigation property to the [[TestEntityOtherMultiLink]] entity.
   */
  toOtherMultiLink: TestEntityOtherMultiLink[];
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
  static customField(fieldName: string): CustomFieldV2<TestEntity>;
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
  TestEntityOtherMultiLink,
  TestEntityOtherMultiLinkType
} from './TestEntityOtherMultiLink';
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
  timeProperty?: Time | null;
  dateTimeProperty?: Moment | null;
  dateTimeOffSetProperty?: Moment | null;
  byteProperty?: number | null;
  sByteProperty?: number | null;
  somethingTheSdkDoesNotSupport?: any | null;
  complexTypeProperty?: TestComplexType | null;
  toMultiLink: TestEntityMultiLinkType[];
  toOtherMultiLink: TestEntityOtherMultiLinkType[];
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
   * Static representation of the [[timeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const TIME_PROPERTY: OrderableEdmTypeField<
    TestEntity,
    'Edm.Time',
    true,
    true
  >;
  /**
   * Static representation of the [[dateTimeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const DATE_TIME_PROPERTY: OrderableEdmTypeField<
    TestEntity,
    'Edm.DateTime',
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
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const COMPLEX_TYPE_PROPERTY: TestComplexTypeField<TestEntity, true, true>;
  /**
   * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const TO_MULTI_LINK: Link<TestEntity, TestEntityMultiLink>;
  /**
   * Static representation of the one-to-many navigation property [[toOtherMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const TO_OTHER_MULTI_LINK: Link<TestEntity, TestEntityOtherMultiLink>;
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
    | OrderableEdmTypeField<TestEntity, 'Edm.Time', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.DateTime', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.DateTimeOffset', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.Byte', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.SByte', true, true>
    | EdmTypeField<TestEntity, 'Edm.Any', true, true>
    | TestComplexTypeField<TestEntity, true, true>
    | Link<TestEntity, TestEntityMultiLink>
    | Link<TestEntity, TestEntityOtherMultiLink>
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
