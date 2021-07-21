import { TestEntityLvl2MultiLinkRequestBuilder } from './TestEntityLvl2MultiLinkRequestBuilder';
import {
  AllFields,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  Field,
  OneToManyLink,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntityLvl2MultiLink" of service "API_TEST_SRV".
 */
export declare class TestEntityLvl2MultiLink
  extends EntityV4
  implements TestEntityLvl2MultiLinkType
{
  /**
   * Technical entity name for TestEntityLvl2MultiLink.
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
   * One-to-many navigation property to the [[TestEntityLvl3MultiLink]] entity.
   */
  toMultiLink2: TestEntityLvl3MultiLink[];
  /**
   * Returns an entity builder to construct instances of `TestEntityLvl2MultiLink`.
   * @returns A builder that constructs instances of entity type `TestEntityLvl2MultiLink`.
   */
  static builder(): EntityBuilderType<
    TestEntityLvl2MultiLink,
    TestEntityLvl2MultiLinkType
  >;
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityLvl2MultiLink` entity type.
   * @returns A `TestEntityLvl2MultiLink` request builder.
   */
  static requestBuilder(): TestEntityLvl2MultiLinkRequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityLvl2MultiLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityLvl2MultiLink`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntityLvl2MultiLink>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
import {
  TestEntityLvl3MultiLink,
  TestEntityLvl3MultiLinkType
} from './TestEntityLvl3MultiLink';
export interface TestEntityLvl2MultiLinkType {
  stringProperty?: string | null;
  booleanProperty?: boolean | null;
  guidProperty?: string | null;
  int16Property?: number | null;
  keyProperty: string;
  toMultiLink2: TestEntityLvl3MultiLinkType[];
}
export declare namespace TestEntityLvl2MultiLink {
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const STRING_PROPERTY: EdmTypeField<
    TestEntityLvl2MultiLink,
    'Edm.String',
    true,
    true
  >;
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const BOOLEAN_PROPERTY: EdmTypeField<
    TestEntityLvl2MultiLink,
    'Edm.Boolean',
    true,
    true
  >;
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const GUID_PROPERTY: EdmTypeField<
    TestEntityLvl2MultiLink,
    'Edm.Guid',
    true,
    true
  >;
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const INT_16_PROPERTY: OrderableEdmTypeField<
    TestEntityLvl2MultiLink,
    'Edm.Int16',
    true,
    true
  >;
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY: EdmTypeField<
    TestEntityLvl2MultiLink,
    'Edm.String',
    false,
    true
  >;
  /**
   * Static representation of the one-to-many navigation property [[toMultiLink2]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const TO_MULTI_LINK_2: OneToManyLink<
    TestEntityLvl2MultiLink,
    TestEntityLvl3MultiLink
  >;
  /**
   * All fields of the TestEntityLvl2MultiLink entity.
   */
  const _allFields: Array<
    | EdmTypeField<TestEntityLvl2MultiLink, 'Edm.String', true, true>
    | EdmTypeField<TestEntityLvl2MultiLink, 'Edm.Boolean', true, true>
    | EdmTypeField<TestEntityLvl2MultiLink, 'Edm.Guid', true, true>
    | OrderableEdmTypeField<TestEntityLvl2MultiLink, 'Edm.Int16', true, true>
    | EdmTypeField<TestEntityLvl2MultiLink, 'Edm.String', false, true>
    | OneToManyLink<TestEntityLvl2MultiLink, TestEntityLvl3MultiLink>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<TestEntityLvl2MultiLink>;
  /**
   * All key fields of the TestEntityLvl2MultiLink entity.
   */
  const _keyFields: Array<Field<TestEntityLvl2MultiLink, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property TestEntityLvl2MultiLink.
   */
  const _keys: {
    [keys: string]: Field<TestEntityLvl2MultiLink, boolean, boolean>;
  };
}
//# sourceMappingURL=TestEntityLvl2MultiLink.d.ts.map
