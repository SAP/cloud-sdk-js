import { Casetest_1RequestBuilder } from './Casetest_1RequestBuilder';
import {
  AllFields,
  CustomFieldV2,
  EdmTypeField,
  EntityBuilderType,
  EntityV2,
  Field
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_CASETEST" of service "API_TEST_SRV".
 */
export declare class Casetest_1 extends EntityV2 implements Casetest_1Type {
  /**
   * Technical entity name for Casetest_1.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * Key Property String.
   */
  keyPropertyString: string;
  /**
   * Returns an entity builder to construct instances of `Casetest_1`.
   * @returns A builder that constructs instances of entity type `Casetest_1`.
   */
  static builder(): EntityBuilderType<Casetest_1, Casetest_1Type>;
  /**
   * Returns a request builder to construct requests for operations on the `Casetest_1` entity type.
   * @returns A `Casetest_1` request builder.
   */
  static requestBuilder(): Casetest_1RequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Casetest_1`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Casetest_1`.
   */
  static customField(fieldName: string): CustomFieldV2<Casetest_1>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
export interface Casetest_1Type {
  keyPropertyString: string;
}
export declare namespace Casetest_1 {
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY_STRING: EdmTypeField<
    Casetest_1,
    'Edm.String',
    false,
    true
  >;
  /**
   * All fields of the Casetest_1 entity.
   */
  const _allFields: Array<EdmTypeField<Casetest_1, 'Edm.String', false, true>>;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<Casetest_1>;
  /**
   * All key fields of the Casetest_1 entity.
   */
  const _keyFields: Array<Field<Casetest_1, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property Casetest_1.
   */
  const _keys: {
    [keys: string]: Field<Casetest_1, boolean, boolean>;
  };
}
//# sourceMappingURL=Casetest_1.d.ts.map
