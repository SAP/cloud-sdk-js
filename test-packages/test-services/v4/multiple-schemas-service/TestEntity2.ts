/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntity2RequestBuilder } from './TestEntity2RequestBuilder';
import {
  AllFields,
  CustomFieldV4,
  EntityBuilderType,
  EntityV4,
  Field,
  NumberField,
  StringField
} from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "A_TestEntity2" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export class TestEntity2 extends EntityV4 implements TestEntity2Type {
  /**
   * Technical entity name for TestEntity2.
   */
  static _entityName = 'A_TestEntity2';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * Key Property String.
   */
  keyPropertyString!: string;
  /**
   * Single Property.
   * @nullable
   */
  singleProperty?: number;

  /**
   * Returns an entity builder to construct instances of `TestEntity2`.
   * @returns A builder that constructs instances of entity type `TestEntity2`.
   */
  static builder(): EntityBuilderType<TestEntity2, TestEntity2Type> {
    return EntityV4.entityBuilder(TestEntity2);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntity2` entity type.
   * @returns A `TestEntity2` request builder.
   */
  static requestBuilder(): TestEntity2RequestBuilder {
    return new TestEntity2RequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity2`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity2`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntity2> {
    return EntityV4.customFieldSelector(fieldName, TestEntity2);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntity2Type {
  keyPropertyString: string;
  singleProperty?: number | null;
}

export namespace TestEntity2 {
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_STRING: StringField<TestEntity2> = new StringField(
    'KeyPropertyString',
    TestEntity2,
    'Edm.String'
  );
  /**
   * Static representation of the [[singleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SINGLE_PROPERTY: NumberField<TestEntity2> = new NumberField(
    'SingleProperty',
    TestEntity2,
    'Edm.Single'
  );
  /**
   * All fields of the TestEntity2 entity.
   */
  export const _allFields: Array<
    StringField<TestEntity2> | NumberField<TestEntity2>
  > = [TestEntity2.KEY_PROPERTY_STRING, TestEntity2.SINGLE_PROPERTY];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntity2> = new AllFields(
    '*',
    TestEntity2
  );
  /**
   * All key fields of the TestEntity2 entity.
   */
  export const _keyFields: Array<Field<TestEntity2>> = [
    TestEntity2.KEY_PROPERTY_STRING
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntity2.
   */
  export const _keys: { [keys: string]: Field<TestEntity2> } =
    TestEntity2._keyFields.reduce(
      (
        acc: { [keys: string]: Field<TestEntity2> },
        field: Field<TestEntity2>
      ) => {
        acc[field._fieldName] = field;
        return acc;
      },
      {}
    );
}
