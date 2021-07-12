/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityCircularLinkParentRequestBuilder } from './TestEntityCircularLinkParentRequestBuilder';
import {
  AllFields,
  Constructable,
  CustomFieldV2,
  EdmTypeField,
  EntityBuilderType,
  EntityV2,
  Field,
  FieldBuilder,
  Link
} from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "A_TestEntityCircularLinkParent" of service "API_TEST_SRV".
 */
export class TestEntityCircularLinkParent
  extends EntityV2
  implements TestEntityCircularLinkParentType
{
  /**
   * Technical entity name for TestEntityCircularLinkParent.
   */
  static _entityName = 'A_TestEntityCircularLinkParent';
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
  toChild!: TestEntityCircularLinkChild[];

  /**
   * Returns an entity builder to construct instances of `TestEntityCircularLinkParent`.
   * @returns A builder that constructs instances of entity type `TestEntityCircularLinkParent`.
   */
  static builder(): EntityBuilderType<
    TestEntityCircularLinkParent,
    TestEntityCircularLinkParentType
  > {
    return EntityV2.entityBuilder(TestEntityCircularLinkParent);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntityCircularLinkParent` entity type.
   * @returns A `TestEntityCircularLinkParent` request builder.
   */
  static requestBuilder(): TestEntityCircularLinkParentRequestBuilder {
    return new TestEntityCircularLinkParentRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityCircularLinkParent`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityCircularLinkParent`.
   */
  static customField(
    fieldName: string
  ): CustomFieldV2<TestEntityCircularLinkParent> {
    return EntityV2.customFieldSelector(
      fieldName,
      TestEntityCircularLinkParent
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

import {
  TestEntityCircularLinkChild,
  TestEntityCircularLinkChildType
} from './TestEntityCircularLinkChild';

export interface TestEntityCircularLinkParentType {
  keyProperty: string;
  toChild: TestEntityCircularLinkChildType[];
}

export namespace TestEntityCircularLinkParent {
  const _fieldBuilder: FieldBuilder<
    Constructable<TestEntityCircularLinkParent>
  > = new FieldBuilder(TestEntityCircularLinkParent);
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
   * Static representation of the one-to-many navigation property [[toChild]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_CHILD: Link<
    TestEntityCircularLinkParent,
    TestEntityCircularLinkChild
  > = new Link(
    'to_Child',
    TestEntityCircularLinkParent,
    TestEntityCircularLinkChild
  );
  /**
   * All fields of the TestEntityCircularLinkParent entity.
   */
  export const _allFields: Array<
    | EdmTypeField<TestEntityCircularLinkParent, 'Edm.String', false, true>
    | Link<TestEntityCircularLinkParent, TestEntityCircularLinkChild>
  > = [
    TestEntityCircularLinkParent.KEY_PROPERTY,
    TestEntityCircularLinkParent.TO_CHILD
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntityCircularLinkParent> =
    new AllFields('*', TestEntityCircularLinkParent);
  /**
   * All key fields of the TestEntityCircularLinkParent entity.
   */
  export const _keyFields: Array<
    Field<TestEntityCircularLinkParent, boolean, boolean>
  > = [TestEntityCircularLinkParent.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntityCircularLinkParent.
   */
  export const _keys: {
    [keys: string]: Field<TestEntityCircularLinkParent, boolean, boolean>;
  } = TestEntityCircularLinkParent._keyFields.reduce(
    (
      acc: {
        [keys: string]: Field<TestEntityCircularLinkParent, boolean, boolean>;
      },
      field: Field<TestEntityCircularLinkParent, boolean, boolean>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
