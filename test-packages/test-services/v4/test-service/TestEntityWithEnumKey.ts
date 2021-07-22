/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityWithEnumKeyRequestBuilder } from './TestEntityWithEnumKeyRequestBuilder';
import { TestEnumType } from './TestEnumType';
import {
  AllFields,
  Constructable,
  CustomFieldV4,
  EntityBuilderType,
  EntityV4,
  EnumField,
  Field,
  FieldBuilder
} from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "A_TestEntityWithEnumKey" of service "API_TEST_SRV".
 */
export class TestEntityWithEnumKey
  extends EntityV4
  implements TestEntityWithEnumKeyType
{
  /**
   * Technical entity name for TestEntityWithEnumKey.
   */
  static _entityName = 'A_TestEntityWithEnumKey';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * Key Property Enum 1.
   */
  keyPropertyEnum1!: TestEnumType;

  /**
   * Returns an entity builder to construct instances of `TestEntityWithEnumKey`.
   * @returns A builder that constructs instances of entity type `TestEntityWithEnumKey`.
   */
  static builder(): EntityBuilderType<
    TestEntityWithEnumKey,
    TestEntityWithEnumKeyType
  > {
    return EntityV4.entityBuilder(TestEntityWithEnumKey);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntityWithEnumKey` entity type.
   * @returns A `TestEntityWithEnumKey` request builder.
   */
  static requestBuilder(): TestEntityWithEnumKeyRequestBuilder {
    return new TestEntityWithEnumKeyRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityWithEnumKey`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityWithEnumKey`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntityWithEnumKey> {
    return EntityV4.customFieldSelector(fieldName, TestEntityWithEnumKey);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntityWithEnumKeyType {
  keyPropertyEnum1: TestEnumType;
}

export namespace TestEntityWithEnumKey {
  const _fieldBuilder: FieldBuilder<Constructable<TestEntityWithEnumKey>> =
    new FieldBuilder(TestEntityWithEnumKey);
  /**
   * Static representation of the [[keyPropertyEnum1]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_ENUM_1 = _fieldBuilder.buildEnumField(
    'KeyPropertyEnum1',
    TestEnumType,
    false
  );
  /**
   * All fields of the TestEntityWithEnumKey entity.
   */
  export const _allFields: Array<
    EnumField<TestEntityWithEnumKey, TestEnumType, false, true>
  > = [TestEntityWithEnumKey.KEY_PROPERTY_ENUM_1];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntityWithEnumKey> = new AllFields(
    '*',
    TestEntityWithEnumKey
  );
  /**
   * All key fields of the TestEntityWithEnumKey entity.
   */
  export const _keyFields: Array<
    Field<TestEntityWithEnumKey, boolean, boolean>
  > = [TestEntityWithEnumKey.KEY_PROPERTY_ENUM_1];
  /**
   * Mapping of all key field names to the respective static field property TestEntityWithEnumKey.
   */
  export const _keys: {
    [keys: string]: Field<TestEntityWithEnumKey, boolean, boolean>;
  } = TestEntityWithEnumKey._keyFields.reduce(
    (
      acc: { [keys: string]: Field<TestEntityWithEnumKey, boolean, boolean> },
      field: Field<TestEntityWithEnumKey, boolean, boolean>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
