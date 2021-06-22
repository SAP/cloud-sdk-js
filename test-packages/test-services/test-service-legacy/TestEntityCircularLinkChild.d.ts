import { TestEntityCircularLinkChildRequestBuilder } from './TestEntityCircularLinkChildRequestBuilder';
import {
  AllFields,
  CustomField,
  Entity,
  EntityBuilderType,
  Link,
  Selectable,
  StringField
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntityCircularLinkChild" of service "API_TEST_SRV".
 */
export declare class TestEntityCircularLinkChild
  extends Entity
  implements TestEntityCircularLinkChildType
{
  /**
   * Technical entity name for TestEntityCircularLinkChild.
   */
  static _entityName: string;
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for TestEntityCircularLinkChild.
   */
  static _serviceName: string;
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
   * Returns an entity builder to construct instances `TestEntityCircularLinkChild`.
   * @returns A builder that constructs instances of entity type `TestEntityCircularLinkChild`.
   */
  static builder(): EntityBuilderType<
    TestEntityCircularLinkChild,
    TestEntityCircularLinkChildTypeForceMandatory
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
  ): CustomField<TestEntityCircularLinkChild>;
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
export interface TestEntityCircularLinkChildTypeForceMandatory {
  keyProperty: string;
  toParent: TestEntityCircularLinkChildType[];
}
export declare namespace TestEntityCircularLinkChild {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY: StringField<TestEntityCircularLinkChild>;
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
    | StringField<TestEntityCircularLinkChild>
    | Link<TestEntityCircularLinkChild, TestEntityCircularLinkChild>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<TestEntityCircularLinkChild>;
  /**
   * All key fields of the TestEntityCircularLinkChild entity.
   */
  const _keyFields: Array<Selectable<TestEntityCircularLinkChild>>;
  /**
   * Mapping of all key field names to the respective static field property TestEntityCircularLinkChild.
   */
  const _keys: {
    [keys: string]: Selectable<TestEntityCircularLinkChild>;
  };
}
//# sourceMappingURL=TestEntityCircularLinkChild.d.ts.map
