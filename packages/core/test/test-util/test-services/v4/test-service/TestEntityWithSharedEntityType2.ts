/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityWithSharedEntityType2RequestBuilder } from './TestEntityWithSharedEntityType2RequestBuilder';
import {
  AllFields,
  CustomFieldV4,
  EntityBuilderType,
  EntityV4,
  Field,
  StringField
} from '../../../../../src';

/**
 * This class represents the entity "A_TestEntityWithSharedEntityType2" of service "API_TEST_SRV".
 */
export class TestEntityWithSharedEntityType2
  extends EntityV4
  implements TestEntityWithSharedEntityType2Type
{
  /**
   * Technical entity name for TestEntityWithSharedEntityType2.
   */
  static _entityName = 'A_TestEntityWithSharedEntityType2';
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
   * Returns an entity builder to construct instances of `TestEntityWithSharedEntityType2`.
   * @returns A builder that constructs instances of entity type `TestEntityWithSharedEntityType2`.
   */
  static builder(): EntityBuilderType<
    TestEntityWithSharedEntityType2,
    TestEntityWithSharedEntityType2Type
  > {
    return EntityV4.entityBuilder(TestEntityWithSharedEntityType2);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntityWithSharedEntityType2` entity type.
   * @returns A `TestEntityWithSharedEntityType2` request builder.
   */
  static requestBuilder(): TestEntityWithSharedEntityType2RequestBuilder {
    return new TestEntityWithSharedEntityType2RequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityWithSharedEntityType2`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityWithSharedEntityType2`.
   */
  static customField(
    fieldName: string
  ): CustomFieldV4<TestEntityWithSharedEntityType2> {
    return EntityV4.customFieldSelector(
      fieldName,
      TestEntityWithSharedEntityType2
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

export interface TestEntityWithSharedEntityType2Type {
  keyProperty: string;
}

export namespace TestEntityWithSharedEntityType2 {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY: StringField<TestEntityWithSharedEntityType2> =
    new StringField(
      'KeyProperty',
      TestEntityWithSharedEntityType2,
      'Edm.String'
    );
  /**
   * All fields of the TestEntityWithSharedEntityType2 entity.
   */
  export const _allFields: Array<StringField<TestEntityWithSharedEntityType2>> =
    [TestEntityWithSharedEntityType2.KEY_PROPERTY];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntityWithSharedEntityType2> =
    new AllFields('*', TestEntityWithSharedEntityType2);
  /**
   * All key fields of the TestEntityWithSharedEntityType2 entity.
   */
  export const _keyFields: Array<Field<TestEntityWithSharedEntityType2>> = [
    TestEntityWithSharedEntityType2.KEY_PROPERTY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityWithSharedEntityType2.
   */
  export const _keys: {
    [keys: string]: Field<TestEntityWithSharedEntityType2>;
  } = TestEntityWithSharedEntityType2._keyFields.reduce(
    (
      acc: { [keys: string]: Field<TestEntityWithSharedEntityType2> },
      field: Field<TestEntityWithSharedEntityType2>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
