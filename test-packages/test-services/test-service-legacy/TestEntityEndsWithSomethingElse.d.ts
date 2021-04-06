import { TestEntityEndsWithSomethingElseRequestBuilder } from './TestEntityEndsWithSomethingElseRequestBuilder';
import {
  AllFields,
  CustomField,
  Entity,
  EntityBuilderType,
  Selectable,
  StringField
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntityEndsWithSomethingElse" of service "API_TEST_SRV".
 */
export declare class TestEntityEndsWithSomethingElse
  extends Entity
  implements TestEntityEndsWithSomethingElseType {
  /**
   * Technical entity name for TestEntityEndsWithSomethingElse.
   */
  static _entityName: string;
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for TestEntityEndsWithSomethingElse.
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
   * Returns an entity builder to construct instances `TestEntityEndsWithSomethingElse`.
   * @returns A builder that constructs instances of entity type `TestEntityEndsWithSomethingElse`.
   */
  static builder(): EntityBuilderType<
    TestEntityEndsWithSomethingElse,
    TestEntityEndsWithSomethingElseTypeForceMandatory
  >;
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityEndsWithSomethingElse` entity type.
   * @returns A `TestEntityEndsWithSomethingElse` request builder.
   */
  static requestBuilder(): TestEntityEndsWithSomethingElseRequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityEndsWithSomethingElse`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityEndsWithSomethingElse`.
   */
  static customField(
    fieldName: string
  ): CustomField<TestEntityEndsWithSomethingElse>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
export interface TestEntityEndsWithSomethingElseType {
  keyProperty: string;
}
export interface TestEntityEndsWithSomethingElseTypeForceMandatory {
  keyProperty: string;
}
export declare namespace TestEntityEndsWithSomethingElse {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY: StringField<TestEntityEndsWithSomethingElse>;
  /**
   * All fields of the TestEntityEndsWithSomethingElse entity.
   */
  const _allFields: Array<StringField<TestEntityEndsWithSomethingElse>>;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<TestEntityEndsWithSomethingElse>;
  /**
   * All key fields of the TestEntityEndsWithSomethingElse entity.
   */
  const _keyFields: Array<Selectable<TestEntityEndsWithSomethingElse>>;
  /**
   * Mapping of all key field names to the respective static field property TestEntityEndsWithSomethingElse.
   */
  const _keys: {
    [keys: string]: Selectable<TestEntityEndsWithSomethingElse>;
  };
}
//# sourceMappingURL=TestEntityEndsWithSomethingElse.d.ts.map
