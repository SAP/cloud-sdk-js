import { TestEntityLvl3MultiLinkRequestBuilder } from './TestEntityLvl3MultiLinkRequestBuilder';
import {
  AllFields,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  Field
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntityLvl3MultiLink" of service "API_TEST_SRV".
 */
export declare class TestEntityLvl3MultiLink
  extends EntityV4
  implements TestEntityLvl3MultiLinkType
{
  /**
   * Technical entity name for TestEntityLvl3MultiLink.
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
   * Guid Property.
   * @nullable
   */
  guidProperty?: string;
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty: string;
  /**
   * Returns an entity builder to construct instances of `TestEntityLvl3MultiLink`.
   * @returns A builder that constructs instances of entity type `TestEntityLvl3MultiLink`.
   */
  static builder(): EntityBuilderType<
    TestEntityLvl3MultiLink,
    TestEntityLvl3MultiLinkType
  >;
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityLvl3MultiLink` entity type.
   * @returns A `TestEntityLvl3MultiLink` request builder.
   */
  static requestBuilder(): TestEntityLvl3MultiLinkRequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityLvl3MultiLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityLvl3MultiLink`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntityLvl3MultiLink>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
export interface TestEntityLvl3MultiLinkType {
  stringProperty?: string | null;
  guidProperty?: string | null;
  keyProperty: string;
}
export declare namespace TestEntityLvl3MultiLink {
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const STRING_PROPERTY: EdmTypeField<
    TestEntityLvl3MultiLink,
    'Edm.String',
    true,
    true
  >;
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const GUID_PROPERTY: EdmTypeField<
    TestEntityLvl3MultiLink,
    'Edm.Guid',
    true,
    true
  >;
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY: EdmTypeField<
    TestEntityLvl3MultiLink,
    'Edm.String',
    false,
    true
  >;
  /**
   * All fields of the TestEntityLvl3MultiLink entity.
   */
  const _allFields: Array<
    | EdmTypeField<TestEntityLvl3MultiLink, 'Edm.String', true, true>
    | EdmTypeField<TestEntityLvl3MultiLink, 'Edm.Guid', true, true>
    | EdmTypeField<TestEntityLvl3MultiLink, 'Edm.String', false, true>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<TestEntityLvl3MultiLink>;
  /**
   * All key fields of the TestEntityLvl3MultiLink entity.
   */
  const _keyFields: Array<Field<TestEntityLvl3MultiLink, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property TestEntityLvl3MultiLink.
   */
  const _keys: {
    [keys: string]: Field<TestEntityLvl3MultiLink, boolean, boolean>;
  };
}
//# sourceMappingURL=TestEntityLvl3MultiLink.d.ts.map
