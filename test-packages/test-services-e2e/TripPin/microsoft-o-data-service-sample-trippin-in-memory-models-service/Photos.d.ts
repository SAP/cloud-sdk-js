import { PhotosRequestBuilder } from './PhotosRequestBuilder';
import { BigNumber } from 'bignumber.js';
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
 * This class represents the entity "Photos" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
export declare class Photos extends EntityV4 implements PhotosType {
  /**
   * Technical entity name for Photos.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * Id.
   */
  id: BigNumber;
  /**
   * Name.
   * @nullable
   */
  name?: string;
  /**
   * Returns an entity builder to construct instances of `Photos`.
   * @returns A builder that constructs instances of entity type `Photos`.
   */
  static builder(): EntityBuilderType<Photos, PhotosType>;
  /**
   * Returns a request builder to construct requests for operations on the `Photos` entity type.
   * @returns A `Photos` request builder.
   */
  static requestBuilder(): PhotosRequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Photos`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Photos`.
   */
  static customField(fieldName: string): CustomFieldV4<Photos>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
export interface PhotosType {
  id: BigNumber;
  name?: string | null;
}
export declare namespace Photos {
  /**
   * Static representation of the [[id]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const ID: OrderableEdmTypeField<Photos, 'Edm.Int64', false, true>;
  /**
   * Static representation of the [[name]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const NAME: EdmTypeField<Photos, 'Edm.String', true, true>;
  /**
   * All fields of the Photos entity.
   */
  const _allFields: Array<
    | OrderableEdmTypeField<Photos, 'Edm.Int64', false, true>
    | EdmTypeField<Photos, 'Edm.String', true, true>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<Photos>;
  /**
   * All key fields of the Photos entity.
   */
  const _keyFields: Array<Field<Photos, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property Photos.
   */
  const _keys: {
    [keys: string]: Field<Photos, boolean, boolean>;
  };
}
//# sourceMappingURL=Photos.d.ts.map
