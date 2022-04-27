import { TestEntitySingleLinkRequestBuilder } from './TestEntitySingleLinkRequestBuilder';
import {
  AllFields,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  Field,
  OneToManyLink,
  OneToOneLink,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntitySingleLink" of service "API_TEST_SRV".
 */
export declare class TestEntitySingleLink
  extends EntityV4
  implements TestEntitySingleLinkType
{
  /**
   * Technical entity name for TestEntitySingleLink.
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
   * One-to-many navigation property to the [[TestEntityLvl2MultiLink]] entity.
   */
  toMultiLink: TestEntityLvl2MultiLink[];
  /**
   * One-to-one navigation property to the [[TestEntityLvl2SingleLink]] entity.
   */
  toSingleLink?: TestEntityLvl2SingleLink | null;
  /**
   * Returns an entity builder to construct instances of `TestEntitySingleLink`.
   * @returns A builder that constructs instances of entity type `TestEntitySingleLink`.
   */
  static builder(): EntityBuilderType<
    TestEntitySingleLink,
    TestEntitySingleLinkType
  >;
  /**
   * Returns a request builder to construct requests for operations on the `TestEntitySingleLink` entity type.
   * @returns A `TestEntitySingleLink` request builder.
   */
  static requestBuilder(): TestEntitySingleLinkRequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntitySingleLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntitySingleLink`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntitySingleLink>;
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
export interface TestEntitySingleLinkType {
  stringProperty?: string | null;
  booleanProperty?: boolean | null;
  guidProperty?: string | null;
  int16Property?: number | null;
  keyProperty: string;
  toMultiLink: TestEntityLvl2MultiLinkType[];
  toSingleLink?: TestEntityLvl2SingleLinkType | null;
}
export declare namespace TestEntitySingleLink {
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const STRING_PROPERTY: EdmTypeField<
    TestEntitySingleLink,
    'Edm.String',
    true,
    true
  >;
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const BOOLEAN_PROPERTY: EdmTypeField<
    TestEntitySingleLink,
    'Edm.Boolean',
    true,
    true
  >;
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const GUID_PROPERTY: EdmTypeField<
    TestEntitySingleLink,
    'Edm.Guid',
    true,
    true
  >;
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const INT_16_PROPERTY: OrderableEdmTypeField<
    TestEntitySingleLink,
    'Edm.Int16',
    true,
    true
  >;
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY: EdmTypeField<
    TestEntitySingleLink,
    'Edm.String',
    false,
    true
  >;
  /**
   * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const TO_MULTI_LINK: OneToManyLink<
    TestEntitySingleLink,
    TestEntityLvl2MultiLink
  >;
  /**
   * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const TO_SINGLE_LINK: OneToOneLink<
    TestEntitySingleLink,
    TestEntityLvl2SingleLink
  >;
  /**
   * All fields of the TestEntitySingleLink entity.
   */
  const _allFields: Array<
    | EdmTypeField<TestEntitySingleLink, 'Edm.String', true, true>
    | EdmTypeField<TestEntitySingleLink, 'Edm.Boolean', true, true>
    | EdmTypeField<TestEntitySingleLink, 'Edm.Guid', true, true>
    | OrderableEdmTypeField<TestEntitySingleLink, 'Edm.Int16', true, true>
    | EdmTypeField<TestEntitySingleLink, 'Edm.String', false, true>
    | OneToManyLink<TestEntitySingleLink, TestEntityLvl2MultiLink>
    | OneToOneLink<TestEntitySingleLink, TestEntityLvl2SingleLink>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<TestEntitySingleLink>;
  /**
   * All key fields of the TestEntitySingleLink entity.
   */
  const _keyFields: Array<Field<TestEntitySingleLink, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property TestEntitySingleLink.
   */
  const _keys: {
    [keys: string]: Field<TestEntitySingleLink, boolean, boolean>;
  };
}
//# sourceMappingURL=TestEntitySingleLink.d.ts.map
