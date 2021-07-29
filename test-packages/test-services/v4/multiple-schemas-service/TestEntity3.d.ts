import { TestEntity3RequestBuilder } from './TestEntity3RequestBuilder';
import { TestComplexType2, TestComplexType2Field } from './TestComplexType2';
import { TestEnumType2 } from './TestEnumType2';
import {
  AllFields,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  EnumField,
  Field
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntity3" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export declare class TestEntity3 extends EntityV4 implements TestEntity3Type {
  /**
   * Technical entity name for TestEntity3.
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
   * Enum Property.
   * @nullable
   */
  enumProperty?: TestEnumType2;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestComplexType2;
  /**
   * Returns an entity builder to construct instances of `TestEntity3`.
   * @returns A builder that constructs instances of entity type `TestEntity3`.
   */
  static builder(): EntityBuilderType<TestEntity3, TestEntity3Type>;
  /**
   * Returns a request builder to construct requests for operations on the `TestEntity3` entity type.
   * @returns A `TestEntity3` request builder.
   */
  static requestBuilder(): TestEntity3RequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity3`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity3`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntity3>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
export interface TestEntity3Type {
  keyPropertyString: string;
  enumProperty?: TestEnumType2 | null;
  complexTypeProperty?: TestComplexType2 | null;
}
export declare namespace TestEntity3 {
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY_STRING: EdmTypeField<
    TestEntity3,
    'Edm.String',
    false,
    true
  >;
  /**
   * Static representation of the [[enumProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const ENUM_PROPERTY: EnumField<TestEntity3, TestEnumType2, true, true>;
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const COMPLEX_TYPE_PROPERTY: TestComplexType2Field<TestEntity3, true, true>;
  /**
   * All fields of the TestEntity3 entity.
   */
  const _allFields: Array<
    | EdmTypeField<TestEntity3, 'Edm.String', false, true>
    | EnumField<TestEntity3, TestEnumType2, true, true>
    | TestComplexType2Field<TestEntity3, true, true>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<TestEntity3>;
  /**
   * All key fields of the TestEntity3 entity.
   */
  const _keyFields: Array<Field<TestEntity3, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property TestEntity3.
   */
  const _keys: {
    [keys: string]: Field<TestEntity3, boolean, boolean>;
  };
}
//# sourceMappingURL=TestEntity3.d.ts.map
