/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntity4RequestBuilder } from './TestEntity4RequestBuilder';
import {
  AllFields,
  Constructable,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  Field,
  FieldBuilder
} from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "A_TestEntity4" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export class TestEntity4 extends EntityV4 implements TestEntity4Type {
  /**
   * Technical entity name for TestEntity4.
   */
  static _entityName = 'A_TestEntity4';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * Key Property String.
   */
  keyPropertyString!: string;
  /**
   * Boolean Property.
   * @nullable
   */
  booleanProperty?: boolean;

  /**
   * Returns an entity builder to construct instances of `TestEntity4`.
   * @returns A builder that constructs instances of entity type `TestEntity4`.
   */
  static builder(): EntityBuilderType<TestEntity4, TestEntity4Type> {
    return EntityV4.entityBuilder(TestEntity4);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntity4` entity type.
   * @returns A `TestEntity4` request builder.
   */
  static requestBuilder(): TestEntity4RequestBuilder {
    return new TestEntity4RequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity4`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity4`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntity4> {
    return EntityV4.customFieldSelector(fieldName, TestEntity4);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntity4Type {
  keyPropertyString: string;
  booleanProperty?: boolean | null;
}

export namespace TestEntity4 {
  const _fieldBuilder: FieldBuilder<Constructable<TestEntity4>> =
    new FieldBuilder(TestEntity4);
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
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BOOLEAN_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'BooleanProperty',
    'Edm.Boolean',
    true
  );
  /**
   * All fields of the TestEntity4 entity.
   */
  export const _allFields: Array<
    | EdmTypeField<TestEntity4, 'Edm.String', false, true>
    | EdmTypeField<TestEntity4, 'Edm.Boolean', true, true>
  > = [TestEntity4.KEY_PROPERTY_STRING, TestEntity4.BOOLEAN_PROPERTY];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntity4> = new AllFields(
    '*',
    TestEntity4
  );
  /**
   * All key fields of the TestEntity4 entity.
   */
  export const _keyFields: Array<Field<TestEntity4, boolean, boolean>> = [
    TestEntity4.KEY_PROPERTY_STRING
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntity4.
   */
  export const _keys: { [keys: string]: Field<TestEntity4, boolean, boolean> } =
    TestEntity4._keyFields.reduce(
      (
        acc: { [keys: string]: Field<TestEntity4, boolean, boolean> },
        field: Field<TestEntity4, boolean, boolean>
      ) => {
        acc[field._fieldName] = field;
        return acc;
      },
      {}
    );
}
