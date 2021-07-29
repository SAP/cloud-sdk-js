import { TestEntityWithEnumKeyRequestBuilder } from './TestEntityWithEnumKeyRequestBuilder';
import { TestEnumType } from './TestEnumType';
import {
  AllFields,
  CustomFieldV4,
  EntityBuilderType,
  EntityV4,
  EnumField,
  Field
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntityWithEnumKey" of service "API_TEST_SRV".
 */
export declare class TestEntityWithEnumKey
  extends EntityV4
  implements TestEntityWithEnumKeyType
{
  /**
   * Technical entity name for TestEntityWithEnumKey.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * Key Property Enum 1.
   */
  keyPropertyEnum1: TestEnumType;
  /**
   * Returns an entity builder to construct instances of `TestEntityWithEnumKey`.
   * @returns A builder that constructs instances of entity type `TestEntityWithEnumKey`.
   */
  static builder(): EntityBuilderType<
    TestEntityWithEnumKey,
    TestEntityWithEnumKeyType
  >;
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityWithEnumKey` entity type.
   * @returns A `TestEntityWithEnumKey` request builder.
   */
  static requestBuilder(): TestEntityWithEnumKeyRequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityWithEnumKey`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityWithEnumKey`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntityWithEnumKey>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
export interface TestEntityWithEnumKeyType {
  keyPropertyEnum1: TestEnumType;
}
export declare namespace TestEntityWithEnumKey {
  /**
   * Static representation of the [[keyPropertyEnum1]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY_ENUM_1: EnumField<
    TestEntityWithEnumKey,
    TestEnumType,
    false,
    true
  >;
  /**
   * All fields of the TestEntityWithEnumKey entity.
   */
  const _allFields: Array<
    EnumField<TestEntityWithEnumKey, TestEnumType, false, true>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<TestEntityWithEnumKey>;
  /**
   * All key fields of the TestEntityWithEnumKey entity.
   */
  const _keyFields: Array<Field<TestEntityWithEnumKey, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property TestEntityWithEnumKey.
   */
  const _keys: {
    [keys: string]: Field<TestEntityWithEnumKey, boolean, boolean>;
  };
}
//# sourceMappingURL=TestEntityWithEnumKey.d.ts.map
