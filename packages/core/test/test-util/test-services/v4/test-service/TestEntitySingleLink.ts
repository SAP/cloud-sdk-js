/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntitySingleLinkRequestBuilder } from './TestEntitySingleLinkRequestBuilder';
import {
  AllFields,
  Constructable,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  Field,
  FieldBuilder,
  OneToManyLink,
  OneToOneLink,
  OrderableEdmTypeField
} from '../../../../../src';

/**
 * This class represents the entity "A_TestEntitySingleLink" of service "API_TEST_SRV".
 */
export class TestEntitySingleLink
  extends EntityV4
  implements TestEntitySingleLinkType
{
  /**
   * Technical entity name for TestEntitySingleLink.
   */
  static _entityName = 'A_TestEntitySingleLink';
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
   * One-to-many navigation property to the [[TestEntityLvl2MultiLink]] entity.
   */
  toMultiLink!: TestEntityLvl2MultiLink[];
  /**
   * One-to-one navigation property to the [[TestEntityLvl2SingleLink]] entity.
   */
  toSingleLink?: TestEntityLvl2SingleLink | null;

  /**
   * Returns an entity builder to construct instances of `TestEntitySingleLink`.
   * @returns A builder that constructs instances of entity type `TestEntitySingleLink`.
   */
  static builder(): EntityBuilderType<
    TestEntitySingleLink,
    TestEntitySingleLinkType
  > {
    return EntityV4.entityBuilder(TestEntitySingleLink);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntitySingleLink` entity type.
   * @returns A `TestEntitySingleLink` request builder.
   */
  static requestBuilder(): TestEntitySingleLinkRequestBuilder {
    return new TestEntitySingleLinkRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntitySingleLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntitySingleLink`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntitySingleLink> {
    return EntityV4.customFieldSelector(fieldName, TestEntitySingleLink);
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

export interface TestEntitySingleLinkType {
  stringProperty?: string | null;
  booleanProperty?: boolean | null;
  guidProperty?: string | null;
  int16Property?: number | null;
  keyProperty: string;
  toMultiLink: TestEntityLvl2MultiLinkType[];
  toSingleLink?: TestEntityLvl2SingleLinkType | null;
}

export namespace TestEntitySingleLink {
  const _fieldBuilder: FieldBuilder<Constructable<TestEntitySingleLink>> =
    new FieldBuilder(TestEntitySingleLink);
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
   * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_MULTI_LINK: OneToManyLink<
    TestEntitySingleLink,
    TestEntityLvl2MultiLink
  > = new OneToManyLink(
    'to_MultiLink',
    TestEntitySingleLink,
    TestEntityLvl2MultiLink
  );
  /**
   * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_SINGLE_LINK: OneToOneLink<
    TestEntitySingleLink,
    TestEntityLvl2SingleLink
  > = new OneToOneLink(
    'to_SingleLink',
    TestEntitySingleLink,
    TestEntityLvl2SingleLink
  );
  /**
   * All fields of the TestEntitySingleLink entity.
   */
  export const _allFields: Array<
    | EdmTypeField<TestEntitySingleLink, 'Edm.String', true, true>
    | EdmTypeField<TestEntitySingleLink, 'Edm.Boolean', true, true>
    | EdmTypeField<TestEntitySingleLink, 'Edm.Guid', true, true>
    | OrderableEdmTypeField<TestEntitySingleLink, 'Edm.Int16', true, true>
    | EdmTypeField<TestEntitySingleLink, 'Edm.String', false, true>
    | OneToManyLink<TestEntitySingleLink, TestEntityLvl2MultiLink>
    | OneToOneLink<TestEntitySingleLink, TestEntityLvl2SingleLink>
  > = [
    TestEntitySingleLink.STRING_PROPERTY,
    TestEntitySingleLink.BOOLEAN_PROPERTY,
    TestEntitySingleLink.GUID_PROPERTY,
    TestEntitySingleLink.INT_16_PROPERTY,
    TestEntitySingleLink.KEY_PROPERTY,
    TestEntitySingleLink.TO_MULTI_LINK,
    TestEntitySingleLink.TO_SINGLE_LINK
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntitySingleLink> = new AllFields(
    '*',
    TestEntitySingleLink
  );
  /**
   * All key fields of the TestEntitySingleLink entity.
   */
  export const _keyFields: Array<
    Field<TestEntitySingleLink, boolean, boolean>
  > = [TestEntitySingleLink.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntitySingleLink.
   */
  export const _keys: {
    [keys: string]: Field<TestEntitySingleLink, boolean, boolean>;
  } = TestEntitySingleLink._keyFields.reduce(
    (
      acc: { [keys: string]: Field<TestEntitySingleLink, boolean, boolean> },
      field: Field<TestEntitySingleLink, boolean, boolean>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
