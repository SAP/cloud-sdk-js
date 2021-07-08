import { TestEntityLinkRequestBuilder } from './TestEntityLinkRequestBuilder';
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
 * This class represents the entity "TestEntityLink" of service "TestService".
 */
export declare class TestEntityLink
  extends EntityV4
  implements TestEntityLinkType
{
  /**
   * Technical entity name for TestEntityLink.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * Key Test Entity Link.
   */
  keyTestEntityLink: number;
  /**
   * Key To Test Entity.
   */
  keyToTestEntity: number;
  /**
   * String Property.
   * Maximum length: 111.
   * @nullable
   */
  stringProperty?: string;
  /**
   * Returns an entity builder to construct instances of `TestEntityLink`.
   * @returns A builder that constructs instances of entity type `TestEntityLink`.
   */
  static builder(): EntityBuilderType<TestEntityLink, TestEntityLinkType>;
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityLink` entity type.
   * @returns A `TestEntityLink` request builder.
   */
  static requestBuilder(): TestEntityLinkRequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityLink`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntityLink>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
export interface TestEntityLinkType {
  keyTestEntityLink: number;
  keyToTestEntity: number;
  stringProperty?: string | null;
}
export declare namespace TestEntityLink {
  /**
   * Static representation of the [[keyTestEntityLink]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_TEST_ENTITY_LINK: OrderableEdmTypeField<
    TestEntityLink,
    'Edm.Int32',
    false,
    true
  >;
  /**
   * Static representation of the [[keyToTestEntity]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_TO_TEST_ENTITY: OrderableEdmTypeField<
    TestEntityLink,
    'Edm.Int32',
    false,
    true
  >;
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const STRING_PROPERTY: EdmTypeField<TestEntityLink, 'Edm.String', true, true>;
  /**
   * All fields of the TestEntityLink entity.
   */
  const _allFields: Array<
    | OrderableEdmTypeField<TestEntityLink, 'Edm.Int32', false, true>
    | EdmTypeField<TestEntityLink, 'Edm.String', true, true>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<TestEntityLink>;
  /**
   * All key fields of the TestEntityLink entity.
   */
  const _keyFields: Array<Field<TestEntityLink, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property TestEntityLink.
   */
  const _keys: {
    [keys: string]: Field<TestEntityLink, boolean, boolean>;
  };
}
//# sourceMappingURL=TestEntityLink.d.ts.map
