import { TestEntityLvl2SingleLinkRequestBuilder } from './TestEntityLvl2SingleLinkRequestBuilder';
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
 * This class represents the entity "A_TestEntityLvl2SingleLink" of service "API_TEST_SRV".
 */
export declare class TestEntityLvl2SingleLink
  extends EntityV4
  implements TestEntityLvl2SingleLinkType
{
  /**
   * Technical entity name for TestEntityLvl2SingleLink.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
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
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty: string;
  /**
   * Returns an entity builder to construct instances of `TestEntityLvl2SingleLink`.
   * @returns A builder that constructs instances of entity type `TestEntityLvl2SingleLink`.
   */
  static builder(): EntityBuilderType<
    TestEntityLvl2SingleLink,
    TestEntityLvl2SingleLinkType
  >;
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityLvl2SingleLink` entity type.
   * @returns A `TestEntityLvl2SingleLink` request builder.
   */
  static requestBuilder(): TestEntityLvl2SingleLinkRequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityLvl2SingleLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityLvl2SingleLink`.
   */
  static customField(
    fieldName: string
  ): CustomFieldV4<TestEntityLvl2SingleLink>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
export interface TestEntityLvl2SingleLinkType {
  stringProperty?: string | null;
  booleanProperty?: boolean | null;
  guidProperty?: string | null;
  int16Property?: number | null;
  keyProperty: string;
}
export declare namespace TestEntityLvl2SingleLink {
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const STRING_PROPERTY: EdmTypeField<
    TestEntityLvl2SingleLink,
    'Edm.String',
    true,
    true
  >;
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const BOOLEAN_PROPERTY: EdmTypeField<
    TestEntityLvl2SingleLink,
    'Edm.Boolean',
    true,
    true
  >;
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const GUID_PROPERTY: EdmTypeField<
    TestEntityLvl2SingleLink,
    'Edm.Guid',
    true,
    true
  >;
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const INT_16_PROPERTY: OrderableEdmTypeField<
    TestEntityLvl2SingleLink,
    'Edm.Int16',
    true,
    true
  >;
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY: EdmTypeField<
    TestEntityLvl2SingleLink,
    'Edm.String',
    false,
    true
  >;
  /**
   * All fields of the TestEntityLvl2SingleLink entity.
   */
  const _allFields: Array<
    | EdmTypeField<TestEntityLvl2SingleLink, 'Edm.String', true, true>
    | EdmTypeField<TestEntityLvl2SingleLink, 'Edm.Boolean', true, true>
    | EdmTypeField<TestEntityLvl2SingleLink, 'Edm.Guid', true, true>
    | OrderableEdmTypeField<TestEntityLvl2SingleLink, 'Edm.Int16', true, true>
    | EdmTypeField<TestEntityLvl2SingleLink, 'Edm.String', false, true>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<TestEntityLvl2SingleLink>;
  /**
   * All key fields of the TestEntityLvl2SingleLink entity.
   */
  const _keyFields: Array<Field<TestEntityLvl2SingleLink, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property TestEntityLvl2SingleLink.
   */
  const _keys: {
    [keys: string]: Field<TestEntityLvl2SingleLink, boolean, boolean>;
  };
}
//# sourceMappingURL=TestEntityLvl2SingleLink.d.ts.map
