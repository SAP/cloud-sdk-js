/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityMultiLinkRequestBuilder } from './TestEntityMultiLinkRequestBuilder';
import {
  AllFields,
  Constructable,
  CustomFieldV2,
  EdmTypeField,
  EntityBuilderType,
  EntityV2,
  Field,
  FieldBuilder,
  Link,
  OneToOneLink,
  OrderableEdmTypeField
} from '../../../../../src';

/**
 * This class represents the entity "A_TestEntityMultiLink" of service "API_TEST_SRV".
 */
export class TestEntityMultiLink
  extends EntityV2
  implements TestEntityMultiLinkType
{
  /**
   * Technical entity name for TestEntityMultiLink.
   */
  static _entityName = 'A_TestEntityMultiLink';
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
   * One-to-many navigation property to the [[TestEntityLvl2MultiLink]] entity.
   */
  toMultiLink!: TestEntityLvl2MultiLink[];
  /**
   * One-to-one navigation property to the [[TestEntityLvl2SingleLink]] entity.
   */
  toSingleLink?: TestEntityLvl2SingleLink | null;

  /**
   * Returns an entity builder to construct instances of `TestEntityMultiLink`.
   * @returns A builder that constructs instances of entity type `TestEntityMultiLink`.
   */
  static builder(): EntityBuilderType<
    TestEntityMultiLink,
    TestEntityMultiLinkType
  > {
    return EntityV2.entityBuilder(TestEntityMultiLink);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntityMultiLink` entity type.
   * @returns A `TestEntityMultiLink` request builder.
   */
  static requestBuilder(): TestEntityMultiLinkRequestBuilder {
    return new TestEntityMultiLinkRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityMultiLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityMultiLink`.
   */
  static customField(fieldName: string): CustomFieldV2<TestEntityMultiLink> {
    return EntityV2.customFieldSelector(fieldName, TestEntityMultiLink);
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
  TestEntityLvl2MultiLink,
  TestEntityLvl2MultiLinkType
} from './TestEntityLvl2MultiLink';
import {
  TestEntityLvl2SingleLink,
  TestEntityLvl2SingleLinkType
} from './TestEntityLvl2SingleLink';

export interface TestEntityMultiLinkType {
  keyProperty: string;
  stringProperty?: string | null;
  booleanProperty?: boolean | null;
  guidProperty?: string | null;
  int16Property?: number | null;
  toMultiLink: TestEntityLvl2MultiLinkType[];
  toSingleLink?: TestEntityLvl2SingleLinkType | null;
}

export namespace TestEntityMultiLink {
  const _fieldBuilder: FieldBuilder<Constructable<TestEntityMultiLink>> =
    new FieldBuilder(TestEntityMultiLink);
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
   * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_MULTI_LINK: Link<
    TestEntityMultiLink,
    TestEntityLvl2MultiLink
  > = new Link('to_MultiLink', TestEntityMultiLink, TestEntityLvl2MultiLink);
  /**
   * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_SINGLE_LINK: OneToOneLink<
    TestEntityMultiLink,
    TestEntityLvl2SingleLink
  > = new OneToOneLink(
    'to_SingleLink',
    TestEntityMultiLink,
    TestEntityLvl2SingleLink
  );
  /**
   * All fields of the TestEntityMultiLink entity.
   */
  export const _allFields: Array<
    | EdmTypeField<TestEntityMultiLink, 'Edm.String', false, true>
    | EdmTypeField<TestEntityMultiLink, 'Edm.String', true, true>
    | EdmTypeField<TestEntityMultiLink, 'Edm.Boolean', true, true>
    | EdmTypeField<TestEntityMultiLink, 'Edm.Guid', true, true>
    | OrderableEdmTypeField<TestEntityMultiLink, 'Edm.Int16', true, true>
    | Link<TestEntityMultiLink, TestEntityLvl2MultiLink>
    | OneToOneLink<TestEntityMultiLink, TestEntityLvl2SingleLink>
  > = [
    TestEntityMultiLink.KEY_PROPERTY,
    TestEntityMultiLink.STRING_PROPERTY,
    TestEntityMultiLink.BOOLEAN_PROPERTY,
    TestEntityMultiLink.GUID_PROPERTY,
    TestEntityMultiLink.INT_16_PROPERTY,
    TestEntityMultiLink.TO_MULTI_LINK,
    TestEntityMultiLink.TO_SINGLE_LINK
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntityMultiLink> = new AllFields(
    '*',
    TestEntityMultiLink
  );
  /**
   * All key fields of the TestEntityMultiLink entity.
   */
  export const _keyFields: Array<Field<TestEntityMultiLink, boolean, boolean>> =
    [TestEntityMultiLink.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntityMultiLink.
   */
  export const _keys: {
    [keys: string]: Field<TestEntityMultiLink, boolean, boolean>;
  } = TestEntityMultiLink._keyFields.reduce(
    (
      acc: { [keys: string]: Field<TestEntityMultiLink, boolean, boolean> },
      field: Field<TestEntityMultiLink, boolean, boolean>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
