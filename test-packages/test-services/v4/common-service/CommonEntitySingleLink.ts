/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CommonEntitySingleLinkRequestBuilder } from './CommonEntitySingleLinkRequestBuilder';
import { CustomField, Entity } from '@sap-cloud-sdk/odata-v4';
import {
  AllFields,
  Constructable,
  EdmTypeField,
  EntityBuilderType,
  Field,
  FieldBuilder
} from '@sap-cloud-sdk/odata-common/internal';

/**
 * This class represents the entity "A_CommonEntitySingleLink" of service "API_COMMON_SRV".
 */
export class CommonEntitySingleLink
  extends Entity
  implements CommonEntitySingleLinkType
{
  /**
   * Technical entity name for CommonEntitySingleLink.
   */
  static _entityName = 'A_CommonEntitySingleLink';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_COMMON_ENTITY_SRV/';
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty!: string;
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
  > {
    return Entity.entityBuilder(CommonEntitySingleLink);
  }

  /**
   * Returns a request builder to construct requests for operations on the `CommonEntitySingleLink` entity type.
   * @returns A `CommonEntitySingleLink` request builder.
   */
  static requestBuilder(): CommonEntitySingleLinkRequestBuilder {
    return new CommonEntitySingleLinkRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `CommonEntitySingleLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `CommonEntitySingleLink`.
   */
  static customField(fieldName: string): CustomField<CommonEntitySingleLink> {
    return Entity.customFieldSelector(fieldName, CommonEntitySingleLink);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface CommonEntitySingleLinkType {
  keyProperty: string;
  stringProperty?: string | null;
}

export namespace CommonEntitySingleLink {
  const _fieldBuilder: FieldBuilder<Constructable<CommonEntitySingleLink>> =
    new FieldBuilder(CommonEntitySingleLink);
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const STRING_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );
  /**
   * All fields of the CommonEntitySingleLink entity.
   */
  export const _allFields: Array<
    | EdmTypeField<CommonEntitySingleLink, 'Edm.String', false, true>
    | EdmTypeField<CommonEntitySingleLink, 'Edm.String', true, true>
  > = [
    CommonEntitySingleLink.KEY_PROPERTY,
    CommonEntitySingleLink.STRING_PROPERTY
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<CommonEntitySingleLink> = new AllFields(
    '*',
    CommonEntitySingleLink
  );
  /**
   * All key fields of the CommonEntitySingleLink entity.
   */
  export const _keyFields: Array<
    Field<CommonEntitySingleLink, boolean, boolean>
  > = [CommonEntitySingleLink.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property CommonEntitySingleLink.
   */
  export const _keys: {
    [keys: string]: Field<CommonEntitySingleLink, boolean, boolean>;
  } = CommonEntitySingleLink._keyFields.reduce(
    (
      acc: { [keys: string]: Field<CommonEntitySingleLink, boolean, boolean> },
      field: Field<CommonEntitySingleLink, boolean, boolean>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
