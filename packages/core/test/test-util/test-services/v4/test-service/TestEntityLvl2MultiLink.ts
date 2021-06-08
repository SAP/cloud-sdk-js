/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityLvl2MultiLinkRequestBuilder } from './TestEntityLvl2MultiLinkRequestBuilder';
import {
  AllFields,
  BooleanField,
  CustomFieldV4,
  EntityBuilderType,
  EntityV4,
  Field,
  NumberField,
  OneToManyLink,
  StringField
} from '../../../../../src';

/**
 * This class represents the entity "A_TestEntityLvl2MultiLink" of service "API_TEST_SRV".
 */
export class TestEntityLvl2MultiLink
  extends EntityV4
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
   * One-to-many navigation property to the [[TestEntityLvl3MultiLink]] entity.
   */
  toMultiLink2!: TestEntityLvl3MultiLink[];

  /**
   * Returns an entity builder to construct instances of `TestEntityLvl2MultiLink`.
   * @returns A builder that constructs instances of entity type `TestEntityLvl2MultiLink`.
   */
  static builder(): EntityBuilderType<
    TestEntityLvl2MultiLink,
    TestEntityLvl2MultiLinkType
  > {
    return EntityV4.entityBuilder(TestEntityLvl2MultiLink);
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
  ): CustomFieldV4<TestEntityLvl2MultiLink> {
    return EntityV4.customFieldSelector(fieldName, TestEntityLvl2MultiLink);
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
  TestEntityLvl3MultiLink,
  TestEntityLvl3MultiLinkType
} from './TestEntityLvl3MultiLink';

export interface TestEntityLvl2MultiLinkType {
  stringProperty?: string | null;
  booleanProperty?: boolean | null;
  guidProperty?: string | null;
  int16Property?: number | null;
  keyProperty: string;
  toMultiLink2: TestEntityLvl3MultiLinkType[];
}

export namespace TestEntityLvl2MultiLink {
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const STRING_PROPERTY: StringField<TestEntityLvl2MultiLink> =
    new StringField('StringProperty', TestEntityLvl2MultiLink, 'Edm.String');
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BOOLEAN_PROPERTY: BooleanField<TestEntityLvl2MultiLink> =
    new BooleanField('BooleanProperty', TestEntityLvl2MultiLink, 'Edm.Boolean');
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GUID_PROPERTY: StringField<TestEntityLvl2MultiLink> =
    new StringField('GuidProperty', TestEntityLvl2MultiLink, 'Edm.Guid');
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_16_PROPERTY: NumberField<TestEntityLvl2MultiLink> =
    new NumberField('Int16Property', TestEntityLvl2MultiLink, 'Edm.Int16');
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY: StringField<TestEntityLvl2MultiLink> =
    new StringField('KeyProperty', TestEntityLvl2MultiLink, 'Edm.String');
  /**
   * Static representation of the one-to-many navigation property [[toMultiLink2]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_MULTI_LINK_2: OneToManyLink<
    TestEntityLvl2MultiLink,
    TestEntityLvl3MultiLink
  > = new OneToManyLink(
    'to_MultiLink2',
    TestEntityLvl2MultiLink,
    TestEntityLvl3MultiLink
  );
  /**
   * All fields of the TestEntityLvl2MultiLink entity.
   */
  export const _allFields: Array<
    | StringField<TestEntityLvl2MultiLink>
    | BooleanField<TestEntityLvl2MultiLink>
    | NumberField<TestEntityLvl2MultiLink>
    | OneToManyLink<TestEntityLvl2MultiLink, TestEntityLvl3MultiLink>
  > = [
    TestEntityLvl2MultiLink.STRING_PROPERTY,
    TestEntityLvl2MultiLink.BOOLEAN_PROPERTY,
    TestEntityLvl2MultiLink.GUID_PROPERTY,
    TestEntityLvl2MultiLink.INT_16_PROPERTY,
    TestEntityLvl2MultiLink.KEY_PROPERTY,
    TestEntityLvl2MultiLink.TO_MULTI_LINK_2
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
  export const _keyFields: Array<Field<TestEntityLvl2MultiLink>> = [
    TestEntityLvl2MultiLink.KEY_PROPERTY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityLvl2MultiLink.
   */
  export const _keys: { [keys: string]: Field<TestEntityLvl2MultiLink> } =
    TestEntityLvl2MultiLink._keyFields.reduce(
      (
        acc: { [keys: string]: Field<TestEntityLvl2MultiLink> },
        field: Field<TestEntityLvl2MultiLink>
      ) => {
        acc[field._fieldName] = field;
        return acc;
      },
      {}
    );
}
