/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntitySingleLinkRequestBuilder } from './TestEntitySingleLinkRequestBuilder';
import { AllFields, BooleanField, CustomField, Entity, EntityBuilderType, Field, Link, NumberField, OneToOneLink, Selectable, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "A_TestEntitySingleLink" of service "API_TEST_SRV".
 */
export class TestEntitySingleLink extends Entity implements TestEntitySingleLinkType {
  /**
   * Technical entity name for TestEntitySingleLink.
   */
  static _entityName = 'A_TestEntitySingleLink';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for TestEntitySingleLink.
   */
  static _serviceName = 'API_TEST_SRV';
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
  toSingleLink!: TestEntityLvl2SingleLink;

  /**
   * Returns an entity builder to construct instances `TestEntitySingleLink`.
   * @returns A builder that constructs instances of entity type `TestEntitySingleLink`.
   */
  static builder(): EntityBuilderType<TestEntitySingleLink, TestEntitySingleLinkTypeForceMandatory> {
    return Entity.entityBuilder(TestEntitySingleLink);
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
  static customField(fieldName: string): CustomField<TestEntitySingleLink> {
    return Entity.customFieldSelector(fieldName, TestEntitySingleLink);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

import { TestEntityLvl2MultiLink, TestEntityLvl2MultiLinkType } from './TestEntityLvl2MultiLink';
import { TestEntityLvl2SingleLink, TestEntityLvl2SingleLinkType } from './TestEntityLvl2SingleLink';

export interface TestEntitySingleLinkType {
  keyProperty: string;
  stringProperty?: string;
  booleanProperty?: boolean;
  guidProperty?: string;
  int16Property?: number;
  toMultiLink: TestEntityLvl2MultiLinkType[];
  toSingleLink: TestEntityLvl2SingleLinkType;
}

export interface TestEntitySingleLinkTypeForceMandatory {
  keyProperty: string;
  stringProperty: string;
  booleanProperty: boolean;
  guidProperty: string;
  int16Property: number;
  toMultiLink: TestEntityLvl2MultiLinkType[];
  toSingleLink: TestEntityLvl2SingleLinkType;
}

export namespace TestEntitySingleLink {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY: StringField<TestEntitySingleLink> = new StringField('KeyProperty', TestEntitySingleLink, 'Edm.String');
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const STRING_PROPERTY: StringField<TestEntitySingleLink> = new StringField('StringProperty', TestEntitySingleLink, 'Edm.String');
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BOOLEAN_PROPERTY: BooleanField<TestEntitySingleLink> = new BooleanField('BooleanProperty', TestEntitySingleLink, 'Edm.Boolean');
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GUID_PROPERTY: StringField<TestEntitySingleLink> = new StringField('GuidProperty', TestEntitySingleLink, 'Edm.Guid');
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_16_PROPERTY: NumberField<TestEntitySingleLink> = new NumberField('Int16Property', TestEntitySingleLink, 'Edm.Int16');
  /**
   * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_MULTI_LINK: Link<TestEntitySingleLink, TestEntityLvl2MultiLink> = new Link('to_MultiLink', TestEntitySingleLink, TestEntityLvl2MultiLink);
  /**
   * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_SINGLE_LINK: OneToOneLink<TestEntitySingleLink, TestEntityLvl2SingleLink> = new OneToOneLink('to_SingleLink', TestEntitySingleLink, TestEntityLvl2SingleLink);
  /**
   * All fields of the TestEntitySingleLink entity.
   */
  export const _allFields: Array<StringField<TestEntitySingleLink> | BooleanField<TestEntitySingleLink> | NumberField<TestEntitySingleLink> | Link<TestEntitySingleLink, TestEntityLvl2MultiLink> | OneToOneLink<TestEntitySingleLink, TestEntityLvl2SingleLink>> = [
    TestEntitySingleLink.KEY_PROPERTY,
    TestEntitySingleLink.STRING_PROPERTY,
    TestEntitySingleLink.BOOLEAN_PROPERTY,
    TestEntitySingleLink.GUID_PROPERTY,
    TestEntitySingleLink.INT_16_PROPERTY,
    TestEntitySingleLink.TO_MULTI_LINK,
    TestEntitySingleLink.TO_SINGLE_LINK
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntitySingleLink> = new AllFields('*', TestEntitySingleLink);
  /**
   * All key fields of the TestEntitySingleLink entity.
   */
  export const _keyFields: Array<Selectable<TestEntitySingleLink>> = [TestEntitySingleLink.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntitySingleLink.
   */
  export const _keys: { [keys: string]: Selectable<TestEntitySingleLink> } = TestEntitySingleLink._keyFields.reduce((acc: { [keys: string]: Selectable<TestEntitySingleLink> }, field: Selectable<TestEntitySingleLink>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
