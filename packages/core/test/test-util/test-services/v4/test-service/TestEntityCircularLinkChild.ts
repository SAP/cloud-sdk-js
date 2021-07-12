/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityCircularLinkChildRequestBuilder } from './TestEntityCircularLinkChildRequestBuilder';
import {
  AllFields,
  Constructable,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  Field,
  FieldBuilder,
  OneToOneLink
} from '../../../../../src';

/**
 * This class represents the entity "A_TestEntityCircularLinkChild" of service "API_TEST_SRV".
 */
export class TestEntityCircularLinkChild
  extends EntityV4
  implements TestEntityCircularLinkChildType
{
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
   * Maximum length: 10.
   */
  keyProperty!: string;
  /**
   * One-to-one navigation property to the [[TestEntityCircularLinkParent]] entity.
   */
  toParent?: TestEntityCircularLinkParent | null;

  /**
   * Returns an entity builder to construct instances of `TestEntityCircularLinkChild`.
   * @returns A builder that constructs instances of entity type `TestEntityCircularLinkChild`.
   */
  static builder(): EntityBuilderType<
    TestEntityCircularLinkChild,
    TestEntityCircularLinkChildType
  > {
    return EntityV4.entityBuilder(TestEntityCircularLinkChild);
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
  ): CustomFieldV4<TestEntityCircularLinkChild> {
    return EntityV4.customFieldSelector(fieldName, TestEntityCircularLinkChild);
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
  TestEntityCircularLinkParent,
  TestEntityCircularLinkParentType
} from './TestEntityCircularLinkParent';

export interface TestEntityCircularLinkChildType {
  keyProperty: string;
  toParent?: TestEntityCircularLinkParentType | null;
}

export namespace TestEntityCircularLinkChild {
  const _fieldBuilder: FieldBuilder<
    Constructable<TestEntityCircularLinkChild>
  > = new FieldBuilder(TestEntityCircularLinkChild);
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
   * Static representation of the one-to-one navigation property [[toParent]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_PARENT: OneToOneLink<
    TestEntityCircularLinkChild,
    TestEntityCircularLinkParent
  > = new OneToOneLink(
    'to_Parent',
    TestEntityCircularLinkChild,
    TestEntityCircularLinkParent
  );
  /**
   * All fields of the TestEntityCircularLinkChild entity.
   */
  export const _allFields: Array<
    | EdmTypeField<TestEntityCircularLinkChild, 'Edm.String', false, true>
    | OneToOneLink<TestEntityCircularLinkChild, TestEntityCircularLinkParent>
  > = [
    TestEntityCircularLinkChild.KEY_PROPERTY,
    TestEntityCircularLinkChild.TO_PARENT
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntityCircularLinkChild> =
    new AllFields('*', TestEntityCircularLinkChild);
  /**
   * All key fields of the TestEntityCircularLinkChild entity.
   */
  export const _keyFields: Array<
    Field<TestEntityCircularLinkChild, boolean, boolean>
  > = [TestEntityCircularLinkChild.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntityCircularLinkChild.
   */
  export const _keys: {
    [keys: string]: Field<TestEntityCircularLinkChild, boolean, boolean>;
  } = TestEntityCircularLinkChild._keyFields.reduce(
    (
      acc: {
        [keys: string]: Field<TestEntityCircularLinkChild, boolean, boolean>;
      },
      field: Field<TestEntityCircularLinkChild, boolean, boolean>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
