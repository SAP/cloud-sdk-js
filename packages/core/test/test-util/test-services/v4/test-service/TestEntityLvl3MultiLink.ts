/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityLvl3MultiLinkRequestBuilder } from './TestEntityLvl3MultiLinkRequestBuilder';
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
 * This class represents the entity "A_TestEntityLvl3MultiLink" of service "API_TEST_SRV".
 */
export class TestEntityLvl3MultiLink
  extends EntityV4
  implements TestEntityLvl3MultiLinkType
{
  /**
   * Technical entity name for TestEntityLvl3MultiLink.
   */
  static _entityName = 'A_TestEntityLvl3MultiLink';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * String Property.
   * Maximum length: 10.
   * @nullable
   */
  stringProperty?: string;
  /**
   * Guid Property.
   * @nullable
   */
  guidProperty?: string;
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty!: string;

  /**
   * Returns an entity builder to construct instances of `TestEntityLvl3MultiLink`.
   * @returns A builder that constructs instances of entity type `TestEntityLvl3MultiLink`.
   */
  static builder(): EntityBuilderType<
    TestEntityLvl3MultiLink,
    TestEntityLvl3MultiLinkType
  > {
    return EntityV4.entityBuilder(TestEntityLvl3MultiLink);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntityLvl3MultiLink` entity type.
   * @returns A `TestEntityLvl3MultiLink` request builder.
   */
  static requestBuilder(): TestEntityLvl3MultiLinkRequestBuilder {
    return new TestEntityLvl3MultiLinkRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityLvl3MultiLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityLvl3MultiLink`.
   */
  static customField(
    fieldName: string
  ): CustomFieldV4<TestEntityLvl3MultiLink> {
    return EntityV4.customFieldSelector(fieldName, TestEntityLvl3MultiLink);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntityLvl3MultiLinkType {
  stringProperty?: string | null;
  guidProperty?: string | null;
  keyProperty: string;
}

export namespace TestEntityLvl3MultiLink {
  const _fieldBuilder: FieldBuilder<Constructable<TestEntityLvl3MultiLink>> =
    new FieldBuilder(TestEntityLvl3MultiLink);
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const STRING_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GUID_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'GuidProperty',
    'Edm.Guid',
    true
  );
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
   * All fields of the TestEntityLvl3MultiLink entity.
   */
  export const _allFields: Array<
    | EdmTypeField<TestEntityLvl3MultiLink, 'Edm.String', true, true>
    | EdmTypeField<TestEntityLvl3MultiLink, 'Edm.Guid', true, true>
    | EdmTypeField<TestEntityLvl3MultiLink, 'Edm.String', false, true>
  > = [
    TestEntityLvl3MultiLink.STRING_PROPERTY,
    TestEntityLvl3MultiLink.GUID_PROPERTY,
    TestEntityLvl3MultiLink.KEY_PROPERTY
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntityLvl3MultiLink> = new AllFields(
    '*',
    TestEntityLvl3MultiLink
  );
  /**
   * All key fields of the TestEntityLvl3MultiLink entity.
   */
  export const _keyFields: Array<
    Field<TestEntityLvl3MultiLink, boolean, boolean>
  > = [TestEntityLvl3MultiLink.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntityLvl3MultiLink.
   */
  export const _keys: {
    [keys: string]: Field<TestEntityLvl3MultiLink, boolean, boolean>;
  } = TestEntityLvl3MultiLink._keyFields.reduce(
    (
      acc: { [keys: string]: Field<TestEntityLvl3MultiLink, boolean, boolean> },
      field: Field<TestEntityLvl3MultiLink, boolean, boolean>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
