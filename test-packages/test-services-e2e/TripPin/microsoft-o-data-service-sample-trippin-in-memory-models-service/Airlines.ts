/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { AirlinesRequestBuilder } from './AirlinesRequestBuilder';
import { AllFields, CustomFieldV4, EntityBuilderType, EntityV4, Field, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "Airlines" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
export class Airlines extends EntityV4 implements AirlinesType {
  /**
   * Technical entity name for Airlines.
   */
  static _entityName = 'Airlines';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for Airlines.
   */
  static _serviceName = 'Microsoft.OData.SampleService.Models.TripPin';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = 'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
  /**
   * Airline Code.
   */
  airlineCode!: string;
  /**
   * Name.
   */
  name!: string;

  /**
   * Returns an entity builder to construct instances of `Airlines`.
   * @returns A builder that constructs instances of entity type `Airlines`.
   */
  static builder(): EntityBuilderType<Airlines, AirlinesType> {
    return EntityV4.entityBuilder(Airlines);
  }

  /**
   * Returns a request builder to construct requests for operations on the `Airlines` entity type.
   * @returns A `Airlines` request builder.
   */
  static requestBuilder(): AirlinesRequestBuilder {
    return new AirlinesRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Airlines`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Airlines`.
   */
  static customField(fieldName: string): CustomFieldV4<Airlines> {
    return EntityV4.customFieldSelector(fieldName, Airlines);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface AirlinesType {
  airlineCode: string;
  name: string;
}

export namespace Airlines {
  /**
   * Static representation of the [[airlineCode]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const AIRLINE_CODE: StringField<Airlines> = new StringField('AirlineCode', Airlines, 'Edm.String');
  /**
   * Static representation of the [[name]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const NAME: StringField<Airlines> = new StringField('Name', Airlines, 'Edm.String');
  /**
   * All fields of the Airlines entity.
   */
  export const _allFields: Array<StringField<Airlines>> = [
    Airlines.AIRLINE_CODE,
    Airlines.NAME
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<Airlines> = new AllFields('*', Airlines);
  /**
   * All key fields of the Airlines entity.
   */
  export const _keyFields: Array<Field<Airlines>> = [Airlines.AIRLINE_CODE];
  /**
   * Mapping of all key field names to the respective static field property Airlines.
   */
  export const _keys: { [keys: string]: Field<Airlines> } = Airlines._keyFields.reduce((acc: { [keys: string]: Field<Airlines> }, field: Field<Airlines>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
