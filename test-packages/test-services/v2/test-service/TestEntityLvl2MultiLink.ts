/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityLvl2MultiLinkRequestBuilder } from './TestEntityLvl2MultiLinkRequestBuilder';
import {
  AllFields,
  Constructable,
  CustomFieldV2,
  EdmTypeField,
  EntityBuilderType,
  EntityV2,
  Field,
  FieldBuilder,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "A_TestEntityLvl2MultiLink" of service "API_TEST_SRV".
 */
export class TestEntityLvl2MultiLink
  extends EntityV2
  implements TestEntityLvl2MultiLinkType
{
  /**
   * Technical entity name for TestEntityLvl2MultiLink.
   */
  static _entityName = 'A_TestEntityLvl2MultiLink';
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
   * String Property.
   * Maximum length: 10.
   * @nullable
   */
  stringProperty?: string;
  /**
   * Boolean Property.
   * @nullable
   */
  booleanProperty?: boolean;
  /**
   * Guid Property.
   * @nullable
   */
  guidProperty?: string;
  /**
   * Int 16 Property.
   * @nullable
   */
  int16Property?: number;

  /**
   * Returns an entity builder to construct instances of `TestEntityLvl2MultiLink`.
   * @returns A builder that constructs instances of entity type `TestEntityLvl2MultiLink`.
   */
  static builder(): EntityBuilderType<
    TestEntityLvl2MultiLink,
    TestEntityLvl2MultiLinkType
  > {
    return EntityV2.entityBuilder(TestEntityLvl2MultiLink);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntityLvl2MultiLink` entity type.
   * @returns A `TestEntityLvl2MultiLink` request builder.
   */
  static requestBuilder(): TestEntityLvl2MultiLinkRequestBuilder {
    return new TestEntityLvl2MultiLinkRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityLvl2MultiLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityLvl2MultiLink`.
   */
  static customField(
    fieldName: string
  ): CustomFieldV2<TestEntityLvl2MultiLink> {
    return EntityV2.customFieldSelector(fieldName, TestEntityLvl2MultiLink);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntityLvl2MultiLinkType {
  keyProperty: string;
  stringProperty?: string | null;
  booleanProperty?: boolean | null;
  guidProperty?: string | null;
  int16Property?: number | null;
}

export namespace TestEntityLvl2MultiLink {
  const _fieldBuilder: FieldBuilder<Constructable<TestEntityLvl2MultiLink>> =
    new FieldBuilder(TestEntityLvl2MultiLink);
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
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const STRING_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BOOLEAN_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'BooleanProperty',
    'Edm.Boolean',
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
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_16_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'Int16Property',
    'Edm.Int16',
    true
  );
  /**
   * All fields of the TestEntityLvl2MultiLink entity.
   */
  export const _allFields: Array<
    | EdmTypeField<TestEntityLvl2MultiLink, 'Edm.String', false, true>
    | EdmTypeField<TestEntityLvl2MultiLink, 'Edm.String', true, true>
    | EdmTypeField<TestEntityLvl2MultiLink, 'Edm.Boolean', true, true>
    | EdmTypeField<TestEntityLvl2MultiLink, 'Edm.Guid', true, true>
    | OrderableEdmTypeField<TestEntityLvl2MultiLink, 'Edm.Int16', true, true>
  > = [
    TestEntityLvl2MultiLink.KEY_PROPERTY,
    TestEntityLvl2MultiLink.STRING_PROPERTY,
    TestEntityLvl2MultiLink.BOOLEAN_PROPERTY,
    TestEntityLvl2MultiLink.GUID_PROPERTY,
    TestEntityLvl2MultiLink.INT_16_PROPERTY
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntityLvl2MultiLink> = new AllFields(
    '*',
    TestEntityLvl2MultiLink
  );
  /**
   * All key fields of the TestEntityLvl2MultiLink entity.
   */
  export const _keyFields: Array<
    Field<TestEntityLvl2MultiLink, boolean, boolean>
  > = [TestEntityLvl2MultiLink.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntityLvl2MultiLink.
   */
  export const _keys: {
    [keys: string]: Field<TestEntityLvl2MultiLink, boolean, boolean>;
  } = TestEntityLvl2MultiLink._keyFields.reduce(
    (
      acc: { [keys: string]: Field<TestEntityLvl2MultiLink, boolean, boolean> },
      field: Field<TestEntityLvl2MultiLink, boolean, boolean>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
