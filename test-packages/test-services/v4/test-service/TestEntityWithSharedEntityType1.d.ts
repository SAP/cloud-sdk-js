import { TestEntityWithSharedEntityType1RequestBuilder } from './TestEntityWithSharedEntityType1RequestBuilder';
import {
  AllFields,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  Field
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntityWithSharedEntityType1" of service "API_TEST_SRV".
 */
export declare class TestEntityWithSharedEntityType1
  extends EntityV4
  implements TestEntityWithSharedEntityType1Type
{
  /**
   * Technical entity name for TestEntityWithSharedEntityType1.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty: string;
  /**
   * Returns an entity builder to construct instances of `TestEntityWithSharedEntityType1`.
   * @returns A builder that constructs instances of entity type `TestEntityWithSharedEntityType1`.
   */
  static builder(): EntityBuilderType<
    TestEntityWithSharedEntityType1,
    TestEntityWithSharedEntityType1Type
  >;
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityWithSharedEntityType1` entity type.
   * @returns A `TestEntityWithSharedEntityType1` request builder.
   */
  static requestBuilder(): TestEntityWithSharedEntityType1RequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityWithSharedEntityType1`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityWithSharedEntityType1`.
   */
  static customField(
    fieldName: string
  ): CustomFieldV4<TestEntityWithSharedEntityType1>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
export interface TestEntityWithSharedEntityType1Type {
  keyProperty: string;
}
export declare namespace TestEntityWithSharedEntityType1 {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY: EdmTypeField<
    TestEntityWithSharedEntityType1,
    'Edm.String',
    false,
    true
  >;
  /**
   * All fields of the TestEntityWithSharedEntityType1 entity.
   */
  const _allFields: Array<
    EdmTypeField<TestEntityWithSharedEntityType1, 'Edm.String', false, true>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<TestEntityWithSharedEntityType1>;
  /**
   * All key fields of the TestEntityWithSharedEntityType1 entity.
   */
  const _keyFields: Array<
    Field<TestEntityWithSharedEntityType1, boolean, boolean>
  >;
  /**
   * Mapping of all key field names to the respective static field property TestEntityWithSharedEntityType1.
   */
  const _keys: {
    [keys: string]: Field<TestEntityWithSharedEntityType1, boolean, boolean>;
  };
}
//# sourceMappingURL=TestEntityWithSharedEntityType1.d.ts.map
