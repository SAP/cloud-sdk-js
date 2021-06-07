/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityEndsWithRequestBuilder } from './TestEntityEndsWithRequestBuilder';
import {
  AllFields,
  CustomField,
  Entity,
  EntityBuilderType,
  Field,
  Selectable,
  StringField
} from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "A_TestEntityEndsWithCollection" of service "API_TEST_SRV".
 */
export class TestEntityEndsWith
  extends Entity
  implements TestEntityEndsWithType
{
  /**
   * Technical entity name for TestEntityEndsWith.
   */
  static _entityName = 'A_TestEntityEndsWithCollection';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for TestEntityEndsWith.
   */
  static _serviceName = 'API_TEST_SRV';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * Key Property.
   */
  keyProperty!: string;

  /**
   * Returns an entity builder to construct instances `TestEntityEndsWith`.
   * @returns A builder that constructs instances of entity type `TestEntityEndsWith`.
   */
  static builder(): EntityBuilderType<
    TestEntityEndsWith,
    TestEntityEndsWithTypeForceMandatory
  > {
    return Entity.entityBuilder(TestEntityEndsWith);
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
  static customField(fieldName: string): CustomField<TestEntityEndsWith> {
    return Entity.customFieldSelector(fieldName, TestEntityEndsWith);
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

export interface TestEntityEndsWithTypeForceMandatory {
  keyProperty: string;
}

export namespace TestEntityEndsWith {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY: StringField<TestEntityEndsWith> = new StringField(
    'KeyProperty',
    TestEntityEndsWith,
    'Edm.String'
  );
  /**
   * All fields of the TestEntityEndsWith entity.
   */
  export const _allFields: Array<StringField<TestEntityEndsWith>> = [
    TestEntityEndsWith.KEY_PROPERTY
  ];
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
  export const _keyFields: Array<Selectable<TestEntityEndsWith>> = [
    TestEntityEndsWith.KEY_PROPERTY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityEndsWith.
   */
  export const _keys: {
    [keys: string]: Selectable<TestEntityEndsWith>;
  } = TestEntityEndsWith._keyFields.reduce(
    (
      acc: { [keys: string]: Selectable<TestEntityEndsWith> },
      field: Selectable<TestEntityEndsWith>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
