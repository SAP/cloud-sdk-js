/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { MultiSchemaTestEntityRequestBuilder } from './MultiSchemaTestEntityRequestBuilder';
import {
  AllFields,
  Constructable,
  CustomFieldV2,
  EdmTypeField,
  EntityBuilderType,
  EntityV2,
  Field,
  FieldBuilder
} from '../../../../../src';

/**
 * This class represents the entity "MultiSchemaTestEntity" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export class MultiSchemaTestEntity
  extends EntityV2
  implements MultiSchemaTestEntityType
{
  /**
   * Technical entity name for MultiSchemaTestEntity.
   */
  static _entityName = 'MultiSchemaTestEntity';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = 'VALUE_IS_UNDEFINED';
  /**
   * Key Property.
   */
  keyProperty!: string;

  /**
   * Returns an entity builder to construct instances of `MultiSchemaTestEntity`.
   * @returns A builder that constructs instances of entity type `MultiSchemaTestEntity`.
   */
  static builder(): EntityBuilderType<
    MultiSchemaTestEntity,
    MultiSchemaTestEntityType
  > {
    return EntityV2.entityBuilder(MultiSchemaTestEntity);
  }

  /**
   * Returns a request builder to construct requests for operations on the `MultiSchemaTestEntity` entity type.
   * @returns A `MultiSchemaTestEntity` request builder.
   */
  static requestBuilder(): MultiSchemaTestEntityRequestBuilder {
    return new MultiSchemaTestEntityRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `MultiSchemaTestEntity`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `MultiSchemaTestEntity`.
   */
  static customField(fieldName: string): CustomFieldV2<MultiSchemaTestEntity> {
    return EntityV2.customFieldSelector(fieldName, MultiSchemaTestEntity);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface MultiSchemaTestEntityType {
  keyProperty: string;
}

export namespace MultiSchemaTestEntity {
  const _fieldBuilder: FieldBuilder<Constructable<MultiSchemaTestEntity>> =
    new FieldBuilder(MultiSchemaTestEntity);
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
   * All fields of the MultiSchemaTestEntity entity.
   */
  export const _allFields: Array<
    EdmTypeField<MultiSchemaTestEntity, 'Edm.String', false, true>
  > = [MultiSchemaTestEntity.KEY_PROPERTY];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<MultiSchemaTestEntity> = new AllFields(
    '*',
    MultiSchemaTestEntity
  );
  /**
   * All key fields of the MultiSchemaTestEntity entity.
   */
  export const _keyFields: Array<
    Field<MultiSchemaTestEntity, boolean, boolean>
  > = [MultiSchemaTestEntity.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property MultiSchemaTestEntity.
   */
  export const _keys: {
    [keys: string]: Field<MultiSchemaTestEntity, boolean, boolean>;
  } = MultiSchemaTestEntity._keyFields.reduce(
    (
      acc: { [keys: string]: Field<MultiSchemaTestEntity, boolean, boolean> },
      field: Field<MultiSchemaTestEntity, boolean, boolean>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
