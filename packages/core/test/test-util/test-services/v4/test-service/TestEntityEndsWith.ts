/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityEndsWithRequestBuilder } from './TestEntityEndsWithRequestBuilder';
import {
  AllFields,
  Constructable,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  Field,
  FieldBuilder
} from '../../../../../src';

/**
 * This class represents the entity "A_TestEntityEndsWithCollection" of service "API_TEST_SRV".
 */
export class TestEntityEndsWith
  extends EntityV4
  implements TestEntityEndsWithType
{
  /**
   * Technical entity name for TestEntityEndsWith.
   */
  static _entityName = 'A_TestEntityEndsWithCollection';
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
   * Returns an entity builder to construct instances of `TestEntityEndsWith`.
   * @returns A builder that constructs instances of entity type `TestEntityEndsWith`.
   */
  static builder(): EntityBuilderType<
    TestEntityEndsWith,
    TestEntityEndsWithType
  > {
    return EntityV4.entityBuilder(TestEntityEndsWith);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntityEndsWith` entity type.
   * @returns A `TestEntityEndsWith` request builder.
   */
  static requestBuilder(): TestEntityEndsWithRequestBuilder {
    return new TestEntityEndsWithRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityEndsWith`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityEndsWith`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntityEndsWith> {
    return EntityV4.customFieldSelector(fieldName, TestEntityEndsWith);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntityEndsWithType {
  keyProperty: string;
}

export namespace TestEntityEndsWith {
  const _fieldBuilder: FieldBuilder<Constructable<TestEntityEndsWith>> =
    new FieldBuilder(TestEntityEndsWith);
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
   * All fields of the TestEntityEndsWith entity.
   */
  export const _allFields: Array<
    EdmTypeField<TestEntityEndsWith, 'Edm.String', false, true>
  > = [TestEntityEndsWith.KEY_PROPERTY];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntityEndsWith> = new AllFields(
    '*',
    TestEntityEndsWith
  );
  /**
   * All key fields of the TestEntityEndsWith entity.
   */
  export const _keyFields: Array<Field<TestEntityEndsWith, boolean, boolean>> =
    [TestEntityEndsWith.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntityEndsWith.
   */
  export const _keys: {
    [keys: string]: Field<TestEntityEndsWith, boolean, boolean>;
  } = TestEntityEndsWith._keyFields.reduce(
    (
      acc: { [keys: string]: Field<TestEntityEndsWith, boolean, boolean> },
      field: Field<TestEntityEndsWith, boolean, boolean>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
