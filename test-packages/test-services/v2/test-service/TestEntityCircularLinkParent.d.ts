import { TestEntityCircularLinkParentRequestBuilder } from './TestEntityCircularLinkParentRequestBuilder';
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
 * This class represents the entity "A_TestEntityCircularLinkParent" of service "API_TEST_SRV".
 */
export declare class TestEntityCircularLinkParent
  extends EntityV2
  implements TestEntityCircularLinkParentType
{
  /**
   * Technical entity name for TestEntityCircularLinkParent.
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
  toChild: TestEntityCircularLinkChild[];
  /**
   * Returns an entity builder to construct instances of `TestEntityCircularLinkParent`.
   * @returns A builder that constructs instances of entity type `TestEntityCircularLinkParent`.
   */
  static builder(): EntityBuilderType<
    TestEntityCircularLinkParent,
    TestEntityCircularLinkParentType
  >;
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityCircularLinkParent` entity type.
   * @returns A `TestEntityCircularLinkParent` request builder.
   */
  static requestBuilder(): TestEntityCircularLinkParentRequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityCircularLinkParent`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityCircularLinkParent`.
   */
  static customField(
    fieldName: string
  ): CustomFieldV2<TestEntityCircularLinkParent>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
import {
  TestEntityCircularLinkChild,
  TestEntityCircularLinkChildType
} from './TestEntityCircularLinkChild';
export interface TestEntityCircularLinkParentType {
  keyProperty: string;
  toChild: TestEntityCircularLinkChildType[];
}
export declare namespace TestEntityCircularLinkParent {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY: EdmTypeField<
    TestEntityCircularLinkParent,
    'Edm.String',
    false,
    true
  >;
  /**
   * Static representation of the one-to-many navigation property [[toChild]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const TO_CHILD: Link<
    TestEntityCircularLinkParent,
    TestEntityCircularLinkChild
  >;
  /**
   * All fields of the TestEntityCircularLinkParent entity.
   */
  const _allFields: Array<
    | EdmTypeField<TestEntityCircularLinkParent, 'Edm.String', false, true>
    | Link<TestEntityCircularLinkParent, TestEntityCircularLinkChild>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<TestEntityCircularLinkParent>;
  /**
   * All key fields of the TestEntityCircularLinkParent entity.
   */
  const _keyFields: Array<
    Field<TestEntityCircularLinkParent, boolean, boolean>
  >;
  /**
   * Mapping of all key field names to the respective static field property TestEntityCircularLinkParent.
   */
  const _keys: {
    [keys: string]: Field<TestEntityCircularLinkParent, boolean, boolean>;
  };
}
//# sourceMappingURL=TestEntityCircularLinkParent.d.ts.map
