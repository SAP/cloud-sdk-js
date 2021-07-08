import { TestEntityEndsWithRequestBuilder } from './TestEntityEndsWithRequestBuilder';
import {
  AllFields,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  Field
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntityEndsWithCollection" of service "API_TEST_SRV".
 */
export declare class TestEntityEndsWith
  extends EntityV4
  implements TestEntityEndsWithType
{
  /**
   * Technical entity name for TestEntityEndsWith.
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
   * Returns an entity builder to construct instances of `TestEntityEndsWith`.
   * @returns A builder that constructs instances of entity type `TestEntityEndsWith`.
   */
  static builder(): EntityBuilderType<
    TestEntityEndsWith,
    TestEntityEndsWithType
  >;
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityEndsWith` entity type.
   * @returns A `TestEntityEndsWith` request builder.
   */
  static requestBuilder(): TestEntityEndsWithRequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityEndsWith`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityEndsWith`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntityEndsWith>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
export interface TestEntityEndsWithType {
  keyProperty: string;
}
export declare namespace TestEntityEndsWith {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY: EdmTypeField<
    TestEntityEndsWith,
    'Edm.String',
    false,
    true
  >;
  /**
   * All fields of the TestEntityEndsWith entity.
   */
  const _allFields: Array<
    EdmTypeField<TestEntityEndsWith, 'Edm.String', false, true>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<TestEntityEndsWith>;
  /**
   * All key fields of the TestEntityEndsWith entity.
   */
  const _keyFields: Array<Field<TestEntityEndsWith, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property TestEntityEndsWith.
   */
  const _keys: {
    [keys: string]: Field<TestEntityEndsWith, boolean, boolean>;
  };
}
//# sourceMappingURL=TestEntityEndsWith.d.ts.map
