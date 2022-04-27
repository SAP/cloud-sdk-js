import { CaseTestRequestBuilder } from './CaseTestRequestBuilder';
import {
  AllFields,
  CustomFieldV2,
  EdmTypeField,
  EntityBuilderType,
  EntityV2,
  Field
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_CaseTest" of service "API_TEST_SRV".
 */
export declare class CaseTest extends EntityV2 implements CaseTestType {
  /**
   * Technical entity name for CaseTest.
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
   * Returns an entity builder to construct instances of `CaseTest`.
   * @returns A builder that constructs instances of entity type `CaseTest`.
   */
  static builder(): EntityBuilderType<CaseTest, CaseTestType>;
  /**
   * Returns a request builder to construct requests for operations on the `CaseTest` entity type.
   * @returns A `CaseTest` request builder.
   */
  static requestBuilder(): CaseTestRequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `CaseTest`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `CaseTest`.
   */
  static customField(fieldName: string): CustomFieldV2<CaseTest>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
export interface CaseTestType {
  keyPropertyString: string;
}
export declare namespace CaseTest {
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY_STRING: EdmTypeField<CaseTest, 'Edm.String', false, true>;
  /**
   * All fields of the CaseTest entity.
   */
  const _allFields: Array<EdmTypeField<CaseTest, 'Edm.String', false, true>>;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<CaseTest>;
  /**
   * All key fields of the CaseTest entity.
   */
  const _keyFields: Array<Field<CaseTest, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property CaseTest.
   */
  const _keys: {
    [keys: string]: Field<CaseTest, boolean, boolean>;
  };
}
//# sourceMappingURL=CaseTest.d.ts.map
