/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityCircularLinkChildRequestBuilder } from './TestEntityCircularLinkChildRequestBuilder';
import {
  AllFields,
  CustomFieldV2,
  EntityBuilderType,
  EntityV2,
  Field,
  Link,
  StringField
} from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "A_TestEntityCircularLinkChild" of service "API_TEST_SRV".
 */
export class TestEntityCircularLinkChild
  extends EntityV2
  implements TestEntityCircularLinkChildType {
  /**
   * Technical entity name for TestEntityCircularLinkChild.
   */
  static _entityName = 'A_TestEntityCircularLinkChild';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * Key Property.
   */
  keyProperty!: string;
  /**
   * One-to-many navigation property to the [[TestEntityCircularLinkChild]] entity.
   */
  toParent!: TestEntityCircularLinkChild[];

  /**
   * Returns an entity builder to construct instances of `TestEntityCircularLinkChild`.
   * @returns A builder that constructs instances of entity type `TestEntityCircularLinkChild`.
   */
  static builder(): EntityBuilderType<
    TestEntityCircularLinkChild,
    TestEntityCircularLinkChildType
  > {
    return EntityV2.entityBuilder(TestEntityCircularLinkChild);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntityCircularLinkChild` entity type.
   * @returns A `TestEntityCircularLinkChild` request builder.
   */
  static requestBuilder(): TestEntityCircularLinkChildRequestBuilder {
    return new TestEntityCircularLinkChildRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityCircularLinkChild`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityCircularLinkChild`.
   */
  static customField(
    fieldName: string
  ): CustomFieldV2<TestEntityCircularLinkChild> {
    return EntityV2.customFieldSelector(fieldName, TestEntityCircularLinkChild);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntityCircularLinkChildType {
  keyProperty: string;
  toParent: TestEntityCircularLinkChildType[];
}

export namespace TestEntityCircularLinkChild {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY: StringField<TestEntityCircularLinkChild> = new StringField(
    'KeyProperty',
    TestEntityCircularLinkChild,
    'Edm.String'
  );
  /**
   * Static representation of the one-to-many navigation property [[toParent]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_PARENT: Link<
    TestEntityCircularLinkChild,
    TestEntityCircularLinkChild
  > = new Link(
    'to_Parent',
    TestEntityCircularLinkChild,
    TestEntityCircularLinkChild
  );
  /**
   * All fields of the TestEntityCircularLinkChild entity.
   */
  export const _allFields: Array<
    | StringField<TestEntityCircularLinkChild>
    | Link<TestEntityCircularLinkChild, TestEntityCircularLinkChild>
  > = [
    TestEntityCircularLinkChild.KEY_PROPERTY,
    TestEntityCircularLinkChild.TO_PARENT
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntityCircularLinkChild> = new AllFields(
    '*',
    TestEntityCircularLinkChild
  );
  /**
   * All key fields of the TestEntityCircularLinkChild entity.
   */
  export const _keyFields: Array<Field<TestEntityCircularLinkChild>> = [
    TestEntityCircularLinkChild.KEY_PROPERTY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityCircularLinkChild.
   */
  export const _keys: {
    [keys: string]: Field<TestEntityCircularLinkChild>;
  } = TestEntityCircularLinkChild._keyFields.reduce(
    (
      acc: { [keys: string]: Field<TestEntityCircularLinkChild> },
      field: Field<TestEntityCircularLinkChild>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
