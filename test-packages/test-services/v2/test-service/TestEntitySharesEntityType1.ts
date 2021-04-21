/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntitySharesEntityType1RequestBuilder } from './TestEntitySharesEntityType1RequestBuilder';
import {
  AllFields,
  CustomFieldV2,
  EntityBuilderType,
  EntityV2,
  Field,
  StringField
} from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "A_TestEntitySharesEntityType1" of service "API_TEST_SRV".
 */
export class TestEntitySharesEntityType1
  extends EntityV2
  implements TestEntitySharesEntityType1Type {
  /**
   * Technical entity name for TestEntitySharesEntityType1.
   */
  static _entityName = 'A_TestEntitySharesEntityType1';
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
   * Returns an entity builder to construct instances of `TestEntitySharesEntityType1`.
   * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType1`.
   */
  static builder(): EntityBuilderType<
    TestEntitySharesEntityType1,
    TestEntitySharesEntityType1Type
  > {
    return EntityV2.entityBuilder(TestEntitySharesEntityType1);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntitySharesEntityType1` entity type.
   * @returns A `TestEntitySharesEntityType1` request builder.
   */
  static requestBuilder(): TestEntitySharesEntityType1RequestBuilder {
    return new TestEntitySharesEntityType1RequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntitySharesEntityType1`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType1`.
   */
  static customField(
    fieldName: string
  ): CustomFieldV2<TestEntitySharesEntityType1> {
    return EntityV2.customFieldSelector(fieldName, TestEntitySharesEntityType1);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntitySharesEntityType1Type {
  keyProperty: string;
}

export namespace TestEntitySharesEntityType1 {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY: StringField<TestEntitySharesEntityType1> = new StringField(
    'KeyProperty',
    TestEntitySharesEntityType1,
    'Edm.String'
  );
  /**
   * All fields of the TestEntitySharesEntityType1 entity.
   */
  export const _allFields: Array<StringField<TestEntitySharesEntityType1>> = [
    TestEntitySharesEntityType1.KEY_PROPERTY
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntitySharesEntityType1> = new AllFields(
    '*',
    TestEntitySharesEntityType1
  );
  /**
   * All key fields of the TestEntitySharesEntityType1 entity.
   */
  export const _keyFields: Array<Field<TestEntitySharesEntityType1>> = [
    TestEntitySharesEntityType1.KEY_PROPERTY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntitySharesEntityType1.
   */
  export const _keys: {
    [keys: string]: Field<TestEntitySharesEntityType1>;
  } = TestEntitySharesEntityType1._keyFields.reduce(
    (
      acc: { [keys: string]: Field<TestEntitySharesEntityType1> },
      field: Field<TestEntitySharesEntityType1>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
