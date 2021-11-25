import { CommonEntityRequestBuilder } from './CommonEntityRequestBuilder';
import { CommonComplexType, CommonComplexTypeField } from './CommonComplexType';
import { CustomField, Entity } from '@sap-cloud-sdk/odata-v4';
import {
  AllFields,
  CollectionField,
  EdmTypeField,
  EntityBuilderType,
  Field,
  OneToOneLink,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-common/internal';
/**
 * This class represents the entity "A_CommonEntity" of service "API_COMMON_SRV".
 */
export declare class CommonEntity extends Entity implements CommonEntityType {
  /**
   * Technical entity name for CommonEntity.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * Key Property Guid.
   */
  keyPropertyGuid: string;
  /**
   * Key Property String.
   */
  keyPropertyString: string;
  /**
   * String Property.
   * Maximum length: 10.
   * @nullable
   */
  stringProperty?: string;
  /**
   * Int 16 Property.
   * @nullable
   */
  int16Property?: number;
  /**
   * Collection Property.
   * Maximum length: 10.
   * @nullable
   */
  collectionProperty?: string[];
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: CommonComplexType;
  /**
   * One-to-one navigation property to the [[CommonEntitySingleLink]] entity.
   */
  toSingleLink?: CommonEntitySingleLink | null;
  /**
   * Returns an entity builder to construct instances of `CommonEntity`.
   * @returns A builder that constructs instances of entity type `CommonEntity`.
   */
  static builder(): EntityBuilderType<CommonEntity, CommonEntityType>;
  /**
   * Returns a request builder to construct requests for operations on the `CommonEntity` entity type.
   * @returns A `CommonEntity` request builder.
   */
  static requestBuilder(): CommonEntityRequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `CommonEntity`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `CommonEntity`.
   */
  static customField(fieldName: string): CustomField<CommonEntity>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
import {
  CommonEntitySingleLink,
  CommonEntitySingleLinkType
} from './CommonEntitySingleLink';
export interface CommonEntityType {
  keyPropertyGuid: string;
  keyPropertyString: string;
  stringProperty?: string | null;
  int16Property?: number | null;
  collectionProperty?: string[] | null;
  complexTypeProperty?: CommonComplexType | null;
  toSingleLink?: CommonEntitySingleLinkType | null;
}
export declare namespace CommonEntity {
  /**
   * Static representation of the [[keyPropertyGuid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY_GUID: EdmTypeField<CommonEntity, 'Edm.Guid', false, true>;
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY_STRING: EdmTypeField<
    CommonEntity,
    'Edm.String',
    false,
    true
  >;
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const STRING_PROPERTY: EdmTypeField<CommonEntity, 'Edm.String', true, true>;
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const INT_16_PROPERTY: OrderableEdmTypeField<
    CommonEntity,
    'Edm.Int16',
    true,
    true
  >;
  /**
   * Static representation of the [[collectionProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const COLLECTION_PROPERTY: CollectionField<
    CommonEntity,
    'Edm.String',
    true,
    true
  >;
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const COMPLEX_TYPE_PROPERTY: CommonComplexTypeField<CommonEntity, true, true>;
  /**
   * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const TO_SINGLE_LINK: OneToOneLink<CommonEntity, CommonEntitySingleLink>;
  /**
   * All fields of the CommonEntity entity.
   */
  const _allFields: Array<
    | EdmTypeField<CommonEntity, 'Edm.Guid', false, true>
    | EdmTypeField<CommonEntity, 'Edm.String', false, true>
    | EdmTypeField<CommonEntity, 'Edm.String', true, true>
    | OrderableEdmTypeField<CommonEntity, 'Edm.Int16', true, true>
    | CollectionField<CommonEntity, 'Edm.String', true, true>
    | CommonComplexTypeField<CommonEntity, true, true>
    | OneToOneLink<CommonEntity, CommonEntitySingleLink>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<CommonEntity>;
  /**
   * All key fields of the CommonEntity entity.
   */
  const _keyFields: Array<Field<CommonEntity, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property CommonEntity.
   */
  const _keys: {
    [keys: string]: Field<CommonEntity, boolean, boolean>;
  };
}
//# sourceMappingURL=CommonEntity.d.ts.map
