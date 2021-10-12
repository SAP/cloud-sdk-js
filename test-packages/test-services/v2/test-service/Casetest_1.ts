/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Casetest_1RequestBuilder } from './Casetest_1RequestBuilder';
import {
  AllFields,
  Constructable,
  CustomFieldV2,
  EdmTypeField,
  EntityBuilderType,
  EntityV2,
  Field,
  FieldBuilder
} from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "A_CASETEST" of service "API_TEST_SRV".
 */
export class Casetest_1 extends EntityV2 implements Casetest_1Type {
  /**
   * Technical entity name for Casetest_1.
   */
  static _entityName = 'A_CASETEST';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * Key Property String.
   */
  keyPropertyString!: string;

  /**
   * Returns an entity builder to construct instances of `Casetest_1`.
   * @returns A builder that constructs instances of entity type `Casetest_1`.
   */
  static builder(): EntityBuilderType<Casetest_1, Casetest_1Type> {
    return EntityV2.entityBuilder(Casetest_1);
  }

  /**
   * Returns a request builder to construct requests for operations on the `Casetest_1` entity type.
   * @returns A `Casetest_1` request builder.
   */
  static requestBuilder(): Casetest_1RequestBuilder {
    return new Casetest_1RequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Casetest_1`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Casetest_1`.
   */
  static customField(fieldName: string): CustomFieldV2<Casetest_1> {
    return EntityV2.customFieldSelector(fieldName, Casetest_1);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface Casetest_1Type {
  keyPropertyString: string;
}

export namespace Casetest_1 {
  const _fieldBuilder: FieldBuilder<Constructable<Casetest_1>> =
    new FieldBuilder(Casetest_1);
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_STRING = _fieldBuilder.buildEdmTypeField(
    'KeyPropertyString',
    'Edm.String',
    false
  );
  /**
   * All fields of the Casetest_1 entity.
   */
  export const _allFields: Array<
    EdmTypeField<Casetest_1, 'Edm.String', false, true>
  > = [Casetest_1.KEY_PROPERTY_STRING];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<Casetest_1> = new AllFields(
    '*',
    Casetest_1
  );
  /**
   * All key fields of the Casetest_1 entity.
   */
  export const _keyFields: Array<Field<Casetest_1, boolean, boolean>> = [
    Casetest_1.KEY_PROPERTY_STRING
  ];
  /**
   * Mapping of all key field names to the respective static field property Casetest_1.
   */
  export const _keys: { [keys: string]: Field<Casetest_1, boolean, boolean> } =
    Casetest_1._keyFields.reduce(
      (
        acc: { [keys: string]: Field<Casetest_1, boolean, boolean> },
        field: Field<Casetest_1, boolean, boolean>
      ) => {
        acc[field._fieldName] = field;
        return acc;
      },
      {}
    );
}
