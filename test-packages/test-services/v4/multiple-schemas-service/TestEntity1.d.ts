import { TestEntity1RequestBuilder } from './TestEntity1RequestBuilder';
import { TestComplexType1, TestComplexType1Field } from './TestComplexType1';
import { TestEnumType1 } from './TestEnumType1';
import {
  AllFields,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  EnumField,
  Field,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntity1" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export declare class TestEntity1 extends EntityV4 implements TestEntity1Type {
  /**
   * Technical entity name for TestEntity1.
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
   * Int 16 Property.
   * @nullable
   */
  int16Property?: number;
  /**
   * Enum Property.
   * @nullable
   */
  enumProperty?: TestEnumType1;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestComplexType1;
  /**
   * Returns an entity builder to construct instances of `TestEntity1`.
   * @returns A builder that constructs instances of entity type `TestEntity1`.
   */
  static builder(): EntityBuilderType<TestEntity1, TestEntity1Type>;
  /**
   * Returns a request builder to construct requests for operations on the `TestEntity1` entity type.
   * @returns A `TestEntity1` request builder.
   */
  static requestBuilder(): TestEntity1RequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity1`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity1`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntity1>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
export interface TestEntity1Type {
  keyPropertyString: string;
  int16Property?: number | null;
  enumProperty?: TestEnumType1 | null;
  complexTypeProperty?: TestComplexType1 | null;
}
export declare namespace TestEntity1 {
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY_STRING: EdmTypeField<
    TestEntity1,
    'Edm.String',
    false,
    true
  >;
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const INT_16_PROPERTY: OrderableEdmTypeField<
    TestEntity1,
    'Edm.Int16',
    true,
    true
  >;
  /**
   * Static representation of the [[enumProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const ENUM_PROPERTY: EnumField<TestEntity1, TestEnumType1, true, true>;
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const COMPLEX_TYPE_PROPERTY: TestComplexType1Field<TestEntity1, true, true>;
  /**
   * All fields of the TestEntity1 entity.
   */
  const _allFields: Array<
    | EdmTypeField<TestEntity1, 'Edm.String', false, true>
    | OrderableEdmTypeField<TestEntity1, 'Edm.Int16', true, true>
    | EnumField<TestEntity1, TestEnumType1, true, true>
    | TestComplexType1Field<TestEntity1, true, true>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<TestEntity1>;
  /**
   * All key fields of the TestEntity1 entity.
   */
  const _keyFields: Array<Field<TestEntity1, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property TestEntity1.
   */
  const _keys: {
    [keys: string]: Field<TestEntity1, boolean, boolean>;
  };
}
//# sourceMappingURL=TestEntity1.d.ts.map
