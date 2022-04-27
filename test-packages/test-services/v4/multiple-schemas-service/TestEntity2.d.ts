import { TestEntity2RequestBuilder } from './TestEntity2RequestBuilder';
import {
  AllFields,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  Field,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntity2" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export declare class TestEntity2 extends EntityV4 implements TestEntity2Type {
  /**
   * Technical entity name for TestEntity2.
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
   * Single Property.
   * @nullable
   */
  singleProperty?: number;
  /**
   * Returns an entity builder to construct instances of `TestEntity2`.
   * @returns A builder that constructs instances of entity type `TestEntity2`.
   */
  static builder(): EntityBuilderType<TestEntity2, TestEntity2Type>;
  /**
   * Returns a request builder to construct requests for operations on the `TestEntity2` entity type.
   * @returns A `TestEntity2` request builder.
   */
  static requestBuilder(): TestEntity2RequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity2`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity2`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntity2>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
export interface TestEntity2Type {
  keyPropertyString: string;
  singleProperty?: number | null;
}
export declare namespace TestEntity2 {
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY_STRING: EdmTypeField<
    TestEntity2,
    'Edm.String',
    false,
    true
  >;
  /**
   * Static representation of the [[singleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const SINGLE_PROPERTY: OrderableEdmTypeField<
    TestEntity2,
    'Edm.Single',
    true,
    true
  >;
  /**
   * All fields of the TestEntity2 entity.
   */
  const _allFields: Array<
    | EdmTypeField<TestEntity2, 'Edm.String', false, true>
    | OrderableEdmTypeField<TestEntity2, 'Edm.Single', true, true>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<TestEntity2>;
  /**
   * All key fields of the TestEntity2 entity.
   */
  const _keyFields: Array<Field<TestEntity2, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property TestEntity2.
   */
  const _keys: {
    [keys: string]: Field<TestEntity2, boolean, boolean>;
  };
}
//# sourceMappingURL=TestEntity2.d.ts.map
