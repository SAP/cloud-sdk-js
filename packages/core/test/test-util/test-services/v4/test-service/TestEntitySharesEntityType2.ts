/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntitySharesEntityType2RequestBuilder } from './TestEntitySharesEntityType2RequestBuilder';
import {
  AllFields,
  CustomFieldV4,
  EntityBuilderType,
  EntityV4,
  Field,
  StringField
} from '../../../../../src';

/**
 * This class represents the entity "A_TestEntitySharesEntityType2" of service "API_TEST_SRV".
 */
export class TestEntitySharesEntityType2
  extends EntityV4
  implements TestEntitySharesEntityType2Type {
  /**
   * Technical entity name for TestEntitySharesEntityType2.
   */
  static _entityName = 'A_TestEntitySharesEntityType2';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty!: string;

  /**
   * Returns an entity builder to construct instances of `TestEntitySharesEntityType2`.
   * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType2`.
   */
  static builder(): EntityBuilderType<
    TestEntitySharesEntityType2,
    TestEntitySharesEntityType2Type
  > {
    return EntityV4.entityBuilder(TestEntitySharesEntityType2);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntitySharesEntityType2` entity type.
   * @returns A `TestEntitySharesEntityType2` request builder.
   */
  static requestBuilder(): TestEntitySharesEntityType2RequestBuilder {
    return new TestEntitySharesEntityType2RequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntitySharesEntityType2`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType2`.
   */
  static customField(
    fieldName: string
  ): CustomFieldV4<TestEntitySharesEntityType2> {
    return EntityV4.customFieldSelector(fieldName, TestEntitySharesEntityType2);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntitySharesEntityType2Type {
  keyProperty: string;
}

export namespace TestEntitySharesEntityType2 {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY: StringField<TestEntitySharesEntityType2> = new StringField(
    'KeyProperty',
    TestEntitySharesEntityType2,
    'Edm.String'
  );
  /**
   * All fields of the TestEntitySharesEntityType2 entity.
   */
  export const _allFields: Array<StringField<TestEntitySharesEntityType2>> = [
    TestEntitySharesEntityType2.KEY_PROPERTY
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntitySharesEntityType2> = new AllFields(
    '*',
    TestEntitySharesEntityType2
  );
  /**
   * All key fields of the TestEntitySharesEntityType2 entity.
   */
  export const _keyFields: Array<Field<TestEntitySharesEntityType2>> = [
    TestEntitySharesEntityType2.KEY_PROPERTY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntitySharesEntityType2.
   */
  export const _keys: {
    [keys: string]: Field<TestEntitySharesEntityType2>;
  } = TestEntitySharesEntityType2._keyFields.reduce(
    (
      acc: { [keys: string]: Field<TestEntitySharesEntityType2> },
      field: Field<TestEntitySharesEntityType2>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
