/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CaseTestRequestBuilder } from './CaseTestRequestBuilder';
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
 * This class represents the entity "A_CaseTest" of service "API_TEST_SRV".
 */
export class CaseTest extends EntityV2 implements CaseTestType {
  /**
   * Technical entity name for CaseTest.
   */
  static _entityName = 'A_CaseTest';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * Key Property String.
   */
  keyPropertyString!: string;

  /**
   * Returns an entity builder to construct instances of `CaseTest`.
   * @returns A builder that constructs instances of entity type `CaseTest`.
   */
  static builder(): EntityBuilderType<CaseTest, CaseTestType> {
    return EntityV2.entityBuilder(CaseTest);
  }

  /**
   * Returns a request builder to construct requests for operations on the `CaseTest` entity type.
   * @returns A `CaseTest` request builder.
   */
  static requestBuilder(): CaseTestRequestBuilder {
    return new CaseTestRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `CaseTest`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `CaseTest`.
   */
  static customField(fieldName: string): CustomFieldV2<CaseTest> {
    return EntityV2.customFieldSelector(fieldName, CaseTest);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface CaseTestType {
  keyPropertyString: string;
}

export namespace CaseTest {
  const _fieldBuilder: FieldBuilder<Constructable<CaseTest>> = new FieldBuilder(
    CaseTest
  );
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
   * All fields of the CaseTest entity.
   */
  export const _allFields: Array<
    EdmTypeField<CaseTest, 'Edm.String', false, true>
  > = [CaseTest.KEY_PROPERTY_STRING];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<CaseTest> = new AllFields('*', CaseTest);
  /**
   * All key fields of the CaseTest entity.
   */
  export const _keyFields: Array<Field<CaseTest, boolean, boolean>> = [
    CaseTest.KEY_PROPERTY_STRING
  ];
  /**
   * Mapping of all key field names to the respective static field property CaseTest.
   */
  export const _keys: { [keys: string]: Field<CaseTest, boolean, boolean> } =
    CaseTest._keyFields.reduce(
      (
        acc: { [keys: string]: Field<CaseTest, boolean, boolean> },
        field: Field<CaseTest, boolean, boolean>
      ) => {
        acc[field._fieldName] = field;
        return acc;
      },
      {}
    );
}
