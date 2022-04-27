import { MultiSchemaTestEntityRequestBuilder } from './MultiSchemaTestEntityRequestBuilder';
import {
  AllFields,
  CustomFieldV2,
  EdmTypeField,
  EntityBuilderType,
  EntityV2,
  Field
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "MultiSchemaTestEntity" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export declare class MultiSchemaTestEntity
  extends EntityV2
  implements MultiSchemaTestEntityType
{
  /**
   * Technical entity name for MultiSchemaTestEntity.
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
   * Returns an entity builder to construct instances of `MultiSchemaTestEntity`.
   * @returns A builder that constructs instances of entity type `MultiSchemaTestEntity`.
   */
  static builder(): EntityBuilderType<
    MultiSchemaTestEntity,
    MultiSchemaTestEntityType
  >;
  /**
   * Returns a request builder to construct requests for operations on the `MultiSchemaTestEntity` entity type.
   * @returns A `MultiSchemaTestEntity` request builder.
   */
  static requestBuilder(): MultiSchemaTestEntityRequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `MultiSchemaTestEntity`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `MultiSchemaTestEntity`.
   */
  static customField(fieldName: string): CustomFieldV2<MultiSchemaTestEntity>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
export interface MultiSchemaTestEntityType {
  keyProperty: string;
}
export declare namespace MultiSchemaTestEntity {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY: EdmTypeField<
    MultiSchemaTestEntity,
    'Edm.String',
    false,
    true
  >;
  /**
   * All fields of the MultiSchemaTestEntity entity.
   */
  const _allFields: Array<
    EdmTypeField<MultiSchemaTestEntity, 'Edm.String', false, true>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<MultiSchemaTestEntity>;
  /**
   * All key fields of the MultiSchemaTestEntity entity.
   */
  const _keyFields: Array<Field<MultiSchemaTestEntity, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property MultiSchemaTestEntity.
   */
  const _keys: {
    [keys: string]: Field<MultiSchemaTestEntity, boolean, boolean>;
  };
}
//# sourceMappingURL=MultiSchemaTestEntity.d.ts.map
