/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityLvl2SingleLinkRequestBuilder } from './TestEntityLvl2SingleLinkRequestBuilder';
import {
  AllFields,
  CustomFieldV2,
  EntityBuilderType,
  EntityV2,
  Field,
  NullableBooleanField,
  NullableNumberField,
  NullableStringField,
  StringField
} from '../../../../../src';

/**
 * This class represents the entity "A_TestEntityLvl2SingleLink" of service "API_TEST_SRV".
 */
export class TestEntityLvl2SingleLink
  extends EntityV2
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
   * Returns an entity builder to construct instances of `TestEntityLvl2SingleLink`.
   * @returns A builder that constructs instances of entity type `TestEntityLvl2SingleLink`.
   */
  static builder(): EntityBuilderType<
    TestEntityLvl2SingleLink,
    TestEntityLvl2SingleLinkType
  > {
    return EntityV2.entityBuilder(TestEntityLvl2SingleLink);
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
  ): CustomFieldV2<TestEntityLvl2SingleLink> {
    return EntityV2.customFieldSelector(fieldName, TestEntityLvl2SingleLink);
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
  keyProperty: string;
  stringProperty?: string | null;
  booleanProperty?: boolean | null;
  guidProperty?: string | null;
  int16Property?: number | null;
}

export namespace TestEntityLvl2SingleLink {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY: StringField<TestEntityLvl2SingleLink> =
    new StringField('KeyProperty', TestEntityLvl2SingleLink, 'Edm.String');
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const STRING_PROPERTY: NullableStringField<TestEntityLvl2SingleLink> =
    new NullableStringField(
      'StringProperty',
      TestEntityLvl2SingleLink,
      'Edm.String'
    );
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BOOLEAN_PROPERTY: NullableBooleanField<TestEntityLvl2SingleLink> =
    new NullableBooleanField(
      'BooleanProperty',
      TestEntityLvl2SingleLink,
      'Edm.Boolean'
    );
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GUID_PROPERTY: NullableStringField<TestEntityLvl2SingleLink> =
    new NullableStringField(
      'GuidProperty',
      TestEntityLvl2SingleLink,
      'Edm.Guid'
    );
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_16_PROPERTY: NullableNumberField<TestEntityLvl2SingleLink> =
    new NullableNumberField(
      'Int16Property',
      TestEntityLvl2SingleLink,
      'Edm.Int16'
    );
  /**
   * All fields of the TestEntityLvl2SingleLink entity.
   */
  export const _allFields: Array<
    | StringField<TestEntityLvl2SingleLink>
    | NullableStringField<TestEntityLvl2SingleLink>
    | NullableBooleanField<TestEntityLvl2SingleLink>
    | NullableNumberField<TestEntityLvl2SingleLink>
  > = [
    TestEntityLvl2SingleLink.KEY_PROPERTY,
    TestEntityLvl2SingleLink.STRING_PROPERTY,
    TestEntityLvl2SingleLink.BOOLEAN_PROPERTY,
    TestEntityLvl2SingleLink.GUID_PROPERTY,
    TestEntityLvl2SingleLink.INT_16_PROPERTY
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
  export const _keyFields: Array<Field<TestEntityLvl2SingleLink>> = [
    TestEntityLvl2SingleLink.KEY_PROPERTY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityLvl2SingleLink.
   */
  export const _keys: { [keys: string]: Field<TestEntityLvl2SingleLink> } =
    TestEntityLvl2SingleLink._keyFields.reduce(
      (
        acc: { [keys: string]: Field<TestEntityLvl2SingleLink> },
        field: Field<TestEntityLvl2SingleLink>
      ) => {
        acc[field._fieldName] = field;
        return acc;
      },
      {}
    );
}
