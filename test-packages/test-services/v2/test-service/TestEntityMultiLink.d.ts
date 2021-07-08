import { TestEntityMultiLinkRequestBuilder } from './TestEntityMultiLinkRequestBuilder';
import {
  AllFields,
  CustomFieldV2,
  EdmTypeField,
  EntityBuilderType,
  EntityV2,
  Field,
  Link,
  OneToOneLink,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntityMultiLink" of service "API_TEST_SRV".
 */
export declare class TestEntityMultiLink
  extends EntityV2
  implements TestEntityMultiLinkType
{
  /**
   * Technical entity name for TestEntityMultiLink.
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
   * One-to-many navigation property to the [[TestEntityLvl2MultiLink]] entity.
   */
  toMultiLink: TestEntityLvl2MultiLink[];
  /**
   * One-to-one navigation property to the [[TestEntityLvl2SingleLink]] entity.
   */
  toSingleLink?: TestEntityLvl2SingleLink | null;
  /**
   * Returns an entity builder to construct instances of `TestEntityMultiLink`.
   * @returns A builder that constructs instances of entity type `TestEntityMultiLink`.
   */
  static builder(): EntityBuilderType<
    TestEntityMultiLink,
    TestEntityMultiLinkType
  >;
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityMultiLink` entity type.
   * @returns A `TestEntityMultiLink` request builder.
   */
  static requestBuilder(): TestEntityMultiLinkRequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityMultiLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityMultiLink`.
   */
  static customField(fieldName: string): CustomFieldV2<TestEntityMultiLink>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
import {
  TestEntityLvl2MultiLink,
  TestEntityLvl2MultiLinkType
} from './TestEntityLvl2MultiLink';
import {
  TestEntityLvl2SingleLink,
  TestEntityLvl2SingleLinkType
} from './TestEntityLvl2SingleLink';
export interface TestEntityMultiLinkType {
  keyProperty: string;
  stringProperty?: string | null;
  booleanProperty?: boolean | null;
  guidProperty?: string | null;
  int16Property?: number | null;
  toMultiLink: TestEntityLvl2MultiLinkType[];
  toSingleLink?: TestEntityLvl2SingleLinkType | null;
}
export declare namespace TestEntityMultiLink {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY: EdmTypeField<
    TestEntityMultiLink,
    'Edm.String',
    false,
    true
  >;
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const STRING_PROPERTY: EdmTypeField<
    TestEntityMultiLink,
    'Edm.String',
    true,
    true
  >;
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const BOOLEAN_PROPERTY: EdmTypeField<
    TestEntityMultiLink,
    'Edm.Boolean',
    true,
    true
  >;
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const GUID_PROPERTY: EdmTypeField<
    TestEntityMultiLink,
    'Edm.Guid',
    true,
    true
  >;
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const INT_16_PROPERTY: OrderableEdmTypeField<
    TestEntityMultiLink,
    'Edm.Int16',
    true,
    true
  >;
  /**
   * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const TO_MULTI_LINK: Link<TestEntityMultiLink, TestEntityLvl2MultiLink>;
  /**
   * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const TO_SINGLE_LINK: OneToOneLink<
    TestEntityMultiLink,
    TestEntityLvl2SingleLink
  >;
  /**
   * All fields of the TestEntityMultiLink entity.
   */
  const _allFields: Array<
    | EdmTypeField<TestEntityMultiLink, 'Edm.String', false, true>
    | EdmTypeField<TestEntityMultiLink, 'Edm.String', true, true>
    | EdmTypeField<TestEntityMultiLink, 'Edm.Boolean', true, true>
    | EdmTypeField<TestEntityMultiLink, 'Edm.Guid', true, true>
    | OrderableEdmTypeField<TestEntityMultiLink, 'Edm.Int16', true, true>
    | Link<TestEntityMultiLink, TestEntityLvl2MultiLink>
    | OneToOneLink<TestEntityMultiLink, TestEntityLvl2SingleLink>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<TestEntityMultiLink>;
  /**
   * All key fields of the TestEntityMultiLink entity.
   */
  const _keyFields: Array<Field<TestEntityMultiLink, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property TestEntityMultiLink.
   */
  const _keys: {
    [keys: string]: Field<TestEntityMultiLink, boolean, boolean>;
  };
}
//# sourceMappingURL=TestEntityMultiLink.d.ts.map
