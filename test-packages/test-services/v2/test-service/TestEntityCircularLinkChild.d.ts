import { TestEntityCircularLinkChildRequestBuilder } from './TestEntityCircularLinkChildRequestBuilder';
import {
  AllFields,
  CustomFieldV2,
  EdmTypeField,
  EntityBuilderType,
  EntityV2,
  Field,
  Link
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntityCircularLinkChild" of service "API_TEST_SRV".
 */
export declare class TestEntityCircularLinkChild
  extends EntityV2
  implements TestEntityCircularLinkChildType
{
  /**
   * Technical entity name for TestEntityCircularLinkChild.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * Key Property.
   */
  keyProperty: string;
  /**
   * One-to-many navigation property to the [[TestEntityCircularLinkChild]] entity.
   */
  toParent: TestEntityCircularLinkChild[];
  /**
   * Returns an entity builder to construct instances of `TestEntityCircularLinkChild`.
   * @returns A builder that constructs instances of entity type `TestEntityCircularLinkChild`.
   */
  static builder(): EntityBuilderType<
    TestEntityCircularLinkChild,
    TestEntityCircularLinkChildType
  >;
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityCircularLinkChild` entity type.
   * @returns A `TestEntityCircularLinkChild` request builder.
   */
  static requestBuilder(): TestEntityCircularLinkChildRequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityCircularLinkChild`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityCircularLinkChild`.
   */
  static customField(
    fieldName: string
  ): CustomFieldV2<TestEntityCircularLinkChild>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
export interface TestEntityCircularLinkChildType {
  keyProperty: string;
  toParent: TestEntityCircularLinkChildType[];
}
export declare namespace TestEntityCircularLinkChild {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY: EdmTypeField<
    TestEntityCircularLinkChild,
    'Edm.String',
    false,
    true
  >;
  /**
   * Static representation of the one-to-many navigation property [[toParent]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const TO_PARENT: Link<
    TestEntityCircularLinkChild,
    TestEntityCircularLinkChild
  >;
  /**
   * All fields of the TestEntityCircularLinkChild entity.
   */
  const _allFields: Array<
    | EdmTypeField<TestEntityCircularLinkChild, 'Edm.String', false, true>
    | Link<TestEntityCircularLinkChild, TestEntityCircularLinkChild>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<TestEntityCircularLinkChild>;
  /**
   * All key fields of the TestEntityCircularLinkChild entity.
   */
  const _keyFields: Array<Field<TestEntityCircularLinkChild, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property TestEntityCircularLinkChild.
   */
  const _keys: {
    [keys: string]: Field<TestEntityCircularLinkChild, boolean, boolean>;
  };
}
//# sourceMappingURL=TestEntityCircularLinkChild.d.ts.map
