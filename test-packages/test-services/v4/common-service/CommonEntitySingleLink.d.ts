import { CommonEntitySingleLinkRequestBuilder } from './CommonEntitySingleLinkRequestBuilder';
import { CustomField, Entity } from '@sap-cloud-sdk/odata-v4';
import {
  AllFields,
  EdmTypeField,
  EntityBuilderType,
  Field
} from '@sap-cloud-sdk/odata-common/internal';
/**
 * This class represents the entity "A_CommonEntitySingleLink" of service "API_COMMON_SRV".
 */
export declare class CommonEntitySingleLink
  extends Entity
  implements CommonEntitySingleLinkType
{
  /**
   * Technical entity name for CommonEntitySingleLink.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty: string;
  /**
   * String Property.
   * Maximum length: 10.
   * @nullable
   */
  stringProperty?: string;
  /**
   * Returns an entity builder to construct instances of `CommonEntitySingleLink`.
   * @returns A builder that constructs instances of entity type `CommonEntitySingleLink`.
   */
  static builder(): EntityBuilderType<
    CommonEntitySingleLink,
    CommonEntitySingleLinkType
  >;
  /**
   * Returns a request builder to construct requests for operations on the `CommonEntitySingleLink` entity type.
   * @returns A `CommonEntitySingleLink` request builder.
   */
  static requestBuilder(): CommonEntitySingleLinkRequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `CommonEntitySingleLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `CommonEntitySingleLink`.
   */
  static customField(fieldName: string): CustomField<CommonEntitySingleLink>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
export interface CommonEntitySingleLinkType {
  keyProperty: string;
  stringProperty?: string | null;
}
export declare namespace CommonEntitySingleLink {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY: EdmTypeField<
    CommonEntitySingleLink,
    'Edm.String',
    false,
    true
  >;
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const STRING_PROPERTY: EdmTypeField<
    CommonEntitySingleLink,
    'Edm.String',
    true,
    true
  >;
  /**
   * All fields of the CommonEntitySingleLink entity.
   */
  const _allFields: Array<
    | EdmTypeField<CommonEntitySingleLink, 'Edm.String', false, true>
    | EdmTypeField<CommonEntitySingleLink, 'Edm.String', true, true>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<CommonEntitySingleLink>;
  /**
   * All key fields of the CommonEntitySingleLink entity.
   */
  const _keyFields: Array<Field<CommonEntitySingleLink, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property CommonEntitySingleLink.
   */
  const _keys: {
    [keys: string]: Field<CommonEntitySingleLink, boolean, boolean>;
  };
}
//# sourceMappingURL=CommonEntitySingleLink.d.ts.map
