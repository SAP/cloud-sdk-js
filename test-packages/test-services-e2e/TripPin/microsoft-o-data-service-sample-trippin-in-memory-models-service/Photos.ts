/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { PhotosRequestBuilder } from './PhotosRequestBuilder';
import { BigNumber } from 'bignumber.js';
import {
  AllFields,
  Constructable,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  Field,
  FieldBuilder,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "Photos" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
export class Photos extends EntityV4 implements PhotosType {
  /**
   * Technical entity name for Photos.
   */
  static _entityName = 'Photos';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath =
    'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
  /**
   * Id.
   */
  id!: BigNumber;
  /**
   * Name.
   * @nullable
   */
  name?: string;

  /**
   * Returns an entity builder to construct instances of `Photos`.
   * @returns A builder that constructs instances of entity type `Photos`.
   */
  static builder(): EntityBuilderType<Photos, PhotosType> {
    return EntityV4.entityBuilder(Photos);
  }

  /**
   * Returns a request builder to construct requests for operations on the `Photos` entity type.
   * @returns A `Photos` request builder.
   */
  static requestBuilder(): PhotosRequestBuilder {
    return new PhotosRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Photos`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Photos`.
   */
  static customField(fieldName: string): CustomFieldV4<Photos> {
    return EntityV4.customFieldSelector(fieldName, Photos);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface PhotosType {
  id: BigNumber;
  name?: string | null;
}

export namespace Photos {
  const _fieldBuilder: FieldBuilder<Constructable<Photos>> = new FieldBuilder(
    Photos
  );
  /**
   * Static representation of the [[id]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ID = _fieldBuilder.buildEdmTypeField('Id', 'Edm.Int64', false);
  /**
   * Static representation of the [[name]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const NAME = _fieldBuilder.buildEdmTypeField(
    'Name',
    'Edm.String',
    true
  );
  /**
   * All fields of the Photos entity.
   */
  export const _allFields: Array<
    | OrderableEdmTypeField<Photos, 'Edm.Int64', false, true>
    | EdmTypeField<Photos, 'Edm.String', true, true>
  > = [Photos.ID, Photos.NAME];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<Photos> = new AllFields('*', Photos);
  /**
   * All key fields of the Photos entity.
   */
  export const _keyFields: Array<Field<Photos, boolean, boolean>> = [Photos.ID];
  /**
   * Mapping of all key field names to the respective static field property Photos.
   */
  export const _keys: { [keys: string]: Field<Photos, boolean, boolean> } =
    Photos._keyFields.reduce(
      (
        acc: { [keys: string]: Field<Photos, boolean, boolean> },
        field: Field<Photos, boolean, boolean>
      ) => {
        acc[field._fieldName] = field;
        return acc;
      },
      {}
    );
}
