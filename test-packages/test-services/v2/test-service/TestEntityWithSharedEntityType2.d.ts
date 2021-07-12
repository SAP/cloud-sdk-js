import { TestEntityWithSharedEntityType2RequestBuilder } from './TestEntityWithSharedEntityType2RequestBuilder';
import {
  AllFields,
  CustomFieldV2,
  EdmTypeField,
  EntityBuilderType,
  EntityV2,
  Field
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntityWithSharedEntityType2" of service "API_TEST_SRV".
 */
export declare class TestEntityWithSharedEntityType2
  extends EntityV2
  implements TestEntityWithSharedEntityType2Type
{
  /**
   * Technical entity name for TestEntityWithSharedEntityType2.
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
   * Returns an entity builder to construct instances of `TestEntityWithSharedEntityType2`.
   * @returns A builder that constructs instances of entity type `TestEntityWithSharedEntityType2`.
   */
  static builder(): EntityBuilderType<
    TestEntityWithSharedEntityType2,
    TestEntityWithSharedEntityType2Type
  >;
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityWithSharedEntityType2` entity type.
   * @returns A `TestEntityWithSharedEntityType2` request builder.
   */
  static requestBuilder(): TestEntityWithSharedEntityType2RequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityWithSharedEntityType2`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityWithSharedEntityType2`.
   */
  static customField(
    fieldName: string
  ): CustomFieldV2<TestEntityWithSharedEntityType2>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
export interface TestEntityWithSharedEntityType2Type {
  keyProperty: string;
}
export declare namespace TestEntityWithSharedEntityType2 {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY: EdmTypeField<
    TestEntityWithSharedEntityType2,
    'Edm.String',
    false,
    true
  >;
  /**
   * All fields of the TestEntityWithSharedEntityType2 entity.
   */
  const _allFields: Array<
    EdmTypeField<TestEntityWithSharedEntityType2, 'Edm.String', false, true>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<TestEntityWithSharedEntityType2>;
  /**
   * All key fields of the TestEntityWithSharedEntityType2 entity.
   */
  const _keyFields: Array<
    Field<TestEntityWithSharedEntityType2, boolean, boolean>
  >;
  /**
   * Mapping of all key field names to the respective static field property TestEntityWithSharedEntityType2.
   */
  const _keys: {
    [keys: string]: Field<TestEntityWithSharedEntityType2, boolean, boolean>;
  };
}
//# sourceMappingURL=TestEntityWithSharedEntityType2.d.ts.map
