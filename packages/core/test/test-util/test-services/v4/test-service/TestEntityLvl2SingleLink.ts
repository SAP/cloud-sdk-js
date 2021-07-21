/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityLvl2SingleLinkRequestBuilder } from './TestEntityLvl2SingleLinkRequestBuilder';
import {
  AllFields,
  Constructable,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  Field,
  FieldBuilder,
  OrderableEdmTypeField
} from '../../../../../src';

/**
 * This class represents the entity "A_TestEntityLvl2SingleLink" of service "API_TEST_SRV".
 */
export class TestEntityLvl2SingleLink
  extends EntityV4
  implements TestEntityLvl2SingleLinkType
{
  /**
   * Technical entity name for TestEntityLvl2SingleLink.
   */
  static _entityName = 'A_TestEntityLvl2SingleLink';
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
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty!: string;

  /**
   * Returns an entity builder to construct instances of `TestEntityLvl2SingleLink`.
   * @returns A builder that constructs instances of entity type `TestEntityLvl2SingleLink`.
   */
  static builder(): EntityBuilderType<
    TestEntityLvl2SingleLink,
    TestEntityLvl2SingleLinkType
  > {
    return EntityV4.entityBuilder(TestEntityLvl2SingleLink);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntityLvl2SingleLink` entity type.
   * @returns A `TestEntityLvl2SingleLink` request builder.
   */
  static requestBuilder(): TestEntityLvl2SingleLinkRequestBuilder {
    return new TestEntityLvl2SingleLinkRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityLvl2SingleLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityLvl2SingleLink`.
   */
  static customField(
    fieldName: string
  ): CustomFieldV4<TestEntityLvl2SingleLink> {
    return EntityV4.customFieldSelector(fieldName, TestEntityLvl2SingleLink);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntityLvl2SingleLinkType {
  stringProperty?: string | null;
  booleanProperty?: boolean | null;
  guidProperty?: string | null;
  int16Property?: number | null;
  keyProperty: string;
}

export namespace TestEntityLvl2SingleLink {
  const _fieldBuilder: FieldBuilder<Constructable<TestEntityLvl2SingleLink>> =
    new FieldBuilder(TestEntityLvl2SingleLink);
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
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * All fields of the TestEntityLvl2SingleLink entity.
   */
  export const _allFields: Array<
    | EdmTypeField<TestEntityLvl2SingleLink, 'Edm.String', true, true>
    | EdmTypeField<TestEntityLvl2SingleLink, 'Edm.Boolean', true, true>
    | EdmTypeField<TestEntityLvl2SingleLink, 'Edm.Guid', true, true>
    | OrderableEdmTypeField<TestEntityLvl2SingleLink, 'Edm.Int16', true, true>
    | EdmTypeField<TestEntityLvl2SingleLink, 'Edm.String', false, true>
  > = [
    TestEntityLvl2SingleLink.STRING_PROPERTY,
    TestEntityLvl2SingleLink.BOOLEAN_PROPERTY,
    TestEntityLvl2SingleLink.GUID_PROPERTY,
    TestEntityLvl2SingleLink.INT_16_PROPERTY,
    TestEntityLvl2SingleLink.KEY_PROPERTY
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntityLvl2SingleLink> = new AllFields(
    '*',
    TestEntityLvl2SingleLink
  );
  /**
   * All key fields of the TestEntityLvl2SingleLink entity.
   */
  export const _keyFields: Array<
    Field<TestEntityLvl2SingleLink, boolean, boolean>
  > = [TestEntityLvl2SingleLink.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntityLvl2SingleLink.
   */
  export const _keys: {
    [keys: string]: Field<TestEntityLvl2SingleLink, boolean, boolean>;
  } = TestEntityLvl2SingleLink._keyFields.reduce(
    (
      acc: {
        [keys: string]: Field<TestEntityLvl2SingleLink, boolean, boolean>;
      },
      field: Field<TestEntityLvl2SingleLink, boolean, boolean>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
