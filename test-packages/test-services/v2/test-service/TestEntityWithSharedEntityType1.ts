/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityWithSharedEntityType1RequestBuilder } from './TestEntityWithSharedEntityType1RequestBuilder';
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
 * This class represents the entity "A_TestEntityWithSharedEntityType1" of service "API_TEST_SRV".
 */
export class TestEntityWithSharedEntityType1
  extends EntityV2
  implements TestEntityWithSharedEntityType1Type
{
  /**
   * Technical entity name for TestEntityWithSharedEntityType1.
   */
  static _entityName = 'A_TestEntityWithSharedEntityType1';
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
   * Returns an entity builder to construct instances of `TestEntityWithSharedEntityType1`.
   * @returns A builder that constructs instances of entity type `TestEntityWithSharedEntityType1`.
   */
  static builder(): EntityBuilderType<
    TestEntityWithSharedEntityType1,
    TestEntityWithSharedEntityType1Type
  > {
    return EntityV2.entityBuilder(TestEntityWithSharedEntityType1);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntityWithSharedEntityType1` entity type.
   * @returns A `TestEntityWithSharedEntityType1` request builder.
   */
  static requestBuilder(): TestEntityWithSharedEntityType1RequestBuilder {
    return new TestEntityWithSharedEntityType1RequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityWithSharedEntityType1`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityWithSharedEntityType1`.
   */
  static customField(
    fieldName: string
  ): CustomFieldV2<TestEntityWithSharedEntityType1> {
    return EntityV2.customFieldSelector(
      fieldName,
      TestEntityWithSharedEntityType1
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

export interface TestEntityWithSharedEntityType1Type {
  keyProperty: string;
}

export namespace TestEntityWithSharedEntityType1 {
  const _fieldBuilder: FieldBuilder<
    Constructable<TestEntityWithSharedEntityType1>
  > = new FieldBuilder(TestEntityWithSharedEntityType1);
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * All fields of the TestEntityWithSharedEntityType1 entity.
   */
  export const _allFields: Array<
    EdmTypeField<TestEntityWithSharedEntityType1, 'Edm.String', false, true>
  > = [TestEntityWithSharedEntityType1.KEY_PROPERTY];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntityWithSharedEntityType1> =
    new AllFields('*', TestEntityWithSharedEntityType1);
  /**
   * All key fields of the TestEntityWithSharedEntityType1 entity.
   */
  export const _keyFields: Array<
    Field<TestEntityWithSharedEntityType1, boolean, boolean>
  > = [TestEntityWithSharedEntityType1.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntityWithSharedEntityType1.
   */
  export const _keys: {
    [keys: string]: Field<TestEntityWithSharedEntityType1, boolean, boolean>;
  } = TestEntityWithSharedEntityType1._keyFields.reduce(
    (
      acc: {
        [keys: string]: Field<
          TestEntityWithSharedEntityType1,
          boolean,
          boolean
        >;
      },
      field: Field<TestEntityWithSharedEntityType1, boolean, boolean>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
