import { TestEntity4RequestBuilder } from './TestEntity4RequestBuilder';
import {
  AllFields,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  Field
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntity4" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export declare class TestEntity4 extends EntityV4 implements TestEntity4Type {
  /**
   * Technical entity name for TestEntity4.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * Key Property String.
   */
  keyPropertyString: string;
  /**
   * Boolean Property.
   * @nullable
   */
  booleanProperty?: boolean;
  /**
   * Returns an entity builder to construct instances of `TestEntity4`.
   * @returns A builder that constructs instances of entity type `TestEntity4`.
   */
  static builder(): EntityBuilderType<TestEntity4, TestEntity4Type>;
  /**
   * Returns a request builder to construct requests for operations on the `TestEntity4` entity type.
   * @returns A `TestEntity4` request builder.
   */
  static requestBuilder(): TestEntity4RequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity4`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity4`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntity4>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
export interface TestEntity4Type {
  keyPropertyString: string;
  booleanProperty?: boolean | null;
}
export declare namespace TestEntity4 {
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY_STRING: EdmTypeField<
    TestEntity4,
    'Edm.String',
    false,
    true
  >;
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const BOOLEAN_PROPERTY: EdmTypeField<TestEntity4, 'Edm.Boolean', true, true>;
  /**
   * All fields of the TestEntity4 entity.
   */
  const _allFields: Array<
    | EdmTypeField<TestEntity4, 'Edm.String', false, true>
    | EdmTypeField<TestEntity4, 'Edm.Boolean', true, true>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<TestEntity4>;
  /**
   * All key fields of the TestEntity4 entity.
   */
  const _keyFields: Array<Field<TestEntity4, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property TestEntity4.
   */
  const _keys: {
    [keys: string]: Field<TestEntity4, boolean, boolean>;
  };
}
//# sourceMappingURL=TestEntity4.d.ts.map
