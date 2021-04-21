/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityEndsWithSomethingElseRequestBuilder } from './TestEntityEndsWithSomethingElseRequestBuilder';
import {
  AllFields,
  CustomFieldV4,
  EntityBuilderType,
  EntityV4,
  Field,
  StringField
} from '../../../../../src';

/**
 * This class represents the entity "A_TestEntityEndsWithSomethingElse" of service "API_TEST_SRV".
 */
export class TestEntityEndsWithSomethingElse
  extends EntityV4
  implements TestEntityEndsWithSomethingElseType {
  /**
   * Technical entity name for TestEntityEndsWithSomethingElse.
   */
  static _entityName = 'A_TestEntityEndsWithSomethingElse';
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
   * Returns an entity builder to construct instances of `TestEntityEndsWithSomethingElse`.
   * @returns A builder that constructs instances of entity type `TestEntityEndsWithSomethingElse`.
   */
  static builder(): EntityBuilderType<
    TestEntityEndsWithSomethingElse,
    TestEntityEndsWithSomethingElseType
  > {
    return EntityV4.entityBuilder(TestEntityEndsWithSomethingElse);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntityEndsWithSomethingElse` entity type.
   * @returns A `TestEntityEndsWithSomethingElse` request builder.
   */
  static requestBuilder(): TestEntityEndsWithSomethingElseRequestBuilder {
    return new TestEntityEndsWithSomethingElseRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityEndsWithSomethingElse`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityEndsWithSomethingElse`.
   */
  static customField(
    fieldName: string
  ): CustomFieldV4<TestEntityEndsWithSomethingElse> {
    return EntityV4.customFieldSelector(
      fieldName,
      TestEntityEndsWithSomethingElse
    );
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntityEndsWithSomethingElseType {
  keyProperty: string;
}

export namespace TestEntityEndsWithSomethingElse {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY: StringField<TestEntityEndsWithSomethingElse> = new StringField(
    'KeyProperty',
    TestEntityEndsWithSomethingElse,
    'Edm.String'
  );
  /**
   * All fields of the TestEntityEndsWithSomethingElse entity.
   */
  export const _allFields: Array<
    StringField<TestEntityEndsWithSomethingElse>
  > = [TestEntityEndsWithSomethingElse.KEY_PROPERTY];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntityEndsWithSomethingElse> = new AllFields(
    '*',
    TestEntityEndsWithSomethingElse
  );
  /**
   * All key fields of the TestEntityEndsWithSomethingElse entity.
   */
  export const _keyFields: Array<Field<TestEntityEndsWithSomethingElse>> = [
    TestEntityEndsWithSomethingElse.KEY_PROPERTY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityEndsWithSomethingElse.
   */
  export const _keys: {
    [keys: string]: Field<TestEntityEndsWithSomethingElse>;
  } = TestEntityEndsWithSomethingElse._keyFields.reduce(
    (
      acc: { [keys: string]: Field<TestEntityEndsWithSomethingElse> },
      field: Field<TestEntityEndsWithSomethingElse>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
