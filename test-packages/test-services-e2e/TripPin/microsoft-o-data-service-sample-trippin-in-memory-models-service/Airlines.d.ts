import { AirlinesRequestBuilder } from './AirlinesRequestBuilder';
import {
  AllFields,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  Field
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "Airlines" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
export declare class Airlines extends EntityV4 implements AirlinesType {
  /**
   * Technical entity name for Airlines.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * Airline Code.
   */
  airlineCode: string;
  /**
   * Name.
   */
  name: string;
  /**
   * Returns an entity builder to construct instances of `Airlines`.
   * @returns A builder that constructs instances of entity type `Airlines`.
   */
  static builder(): EntityBuilderType<Airlines, AirlinesType>;
  /**
   * Returns a request builder to construct requests for operations on the `Airlines` entity type.
   * @returns A `Airlines` request builder.
   */
  static requestBuilder(): AirlinesRequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Airlines`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Airlines`.
   */
  static customField(fieldName: string): CustomFieldV4<Airlines>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
export interface AirlinesType {
  airlineCode: string;
  name: string;
}
export declare namespace Airlines {
  /**
   * Static representation of the [[airlineCode]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const AIRLINE_CODE: EdmTypeField<Airlines, 'Edm.String', false, true>;
  /**
   * Static representation of the [[name]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const NAME: EdmTypeField<Airlines, 'Edm.String', false, true>;
  /**
   * All fields of the Airlines entity.
   */
  const _allFields: Array<EdmTypeField<Airlines, 'Edm.String', false, true>>;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<Airlines>;
  /**
   * All key fields of the Airlines entity.
   */
  const _keyFields: Array<Field<Airlines, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property Airlines.
   */
  const _keys: {
    [keys: string]: Field<Airlines, boolean, boolean>;
  };
}
//# sourceMappingURL=Airlines.d.ts.map
