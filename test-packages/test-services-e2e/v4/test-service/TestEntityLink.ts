/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityLinkRequestBuilder } from './TestEntityLinkRequestBuilder';
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
 * This class represents the entity "TestEntityLink" of service "TestService".
 */
export class TestEntityLink extends EntityV4 implements TestEntityLinkType {
  /**
   * Technical entity name for TestEntityLink.
   */
  static _entityName = 'TestEntityLink';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/odata/test-service';
  /**
   * Key Test Entity Link.
   */
  keyTestEntityLink!: number;
  /**
   * Key To Test Entity.
   */
  keyToTestEntity!: number;
  /**
   * String Property.
   * Maximum length: 111.
   * @nullable
   */
  stringProperty?: string;

  /**
   * Returns an entity builder to construct instances of `TestEntityLink`.
   * @returns A builder that constructs instances of entity type `TestEntityLink`.
   */
  static builder(): EntityBuilderType<TestEntityLink, TestEntityLinkType> {
    return EntityV4.entityBuilder(TestEntityLink);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntityLink` entity type.
   * @returns A `TestEntityLink` request builder.
   */
  static requestBuilder(): TestEntityLinkRequestBuilder {
    return new TestEntityLinkRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityLink`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntityLink> {
    return EntityV4.customFieldSelector(fieldName, TestEntityLink);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntityLinkType {
  keyTestEntityLink: number;
  keyToTestEntity: number;
  stringProperty?: string | null;
}

export namespace TestEntityLink {
  /**
   * Static representation of the [[keyTestEntityLink]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_TEST_ENTITY_LINK: NumberField<TestEntityLink> = new NumberField(
    'KeyTestEntityLink',
    TestEntityLink,
    'Edm.Int32'
  );
  /**
   * Static representation of the [[keyToTestEntity]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_TO_TEST_ENTITY: NumberField<TestEntityLink> = new NumberField(
    'KeyToTestEntity',
    TestEntityLink,
    'Edm.Int32'
  );
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const STRING_PROPERTY: StringField<TestEntityLink> = new StringField(
    'StringProperty',
    TestEntityLink,
    'Edm.String'
  );
  /**
   * All fields of the TestEntityLink entity.
   */
  export const _allFields: Array<
    NumberField<TestEntityLink> | StringField<TestEntityLink>
  > = [
    TestEntityLink.KEY_TEST_ENTITY_LINK,
    TestEntityLink.KEY_TO_TEST_ENTITY,
    TestEntityLink.STRING_PROPERTY
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntityLink> = new AllFields(
    '*',
    TestEntityLink
  );
  /**
   * All key fields of the TestEntityLink entity.
   */
  export const _keyFields: Array<Field<TestEntityLink>> = [
    TestEntityLink.KEY_TEST_ENTITY_LINK,
    TestEntityLink.KEY_TO_TEST_ENTITY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityLink.
   */
  export const _keys: {
    [keys: string]: Field<TestEntityLink>;
  } = TestEntityLink._keyFields.reduce(
    (
      acc: { [keys: string]: Field<TestEntityLink> },
      field: Field<TestEntityLink>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
