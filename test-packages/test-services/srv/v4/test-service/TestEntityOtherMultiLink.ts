/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityOtherMultiLinkRequestBuilder } from './TestEntityOtherMultiLinkRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Field, StringField } from '@sap-cloud-sdk/core/v4';

/**
 * This class represents the entity "A_TestEntityOtherMultiLink" of service "API_TEST_SRV".
 */
export class TestEntityOtherMultiLink extends Entity implements TestEntityOtherMultiLinkType {
  /**
   * Technical entity name for TestEntityOtherMultiLink.
   */
  static _entityName = 'A_TestEntityOtherMultiLink';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for TestEntityOtherMultiLink.
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
   * Returns an entity builder to construct instances `TestEntityOtherMultiLink`.
   * @returns A builder that constructs instances of entity type `TestEntityOtherMultiLink`.
   */
  static builder(): EntityBuilderType<TestEntityOtherMultiLink, TestEntityOtherMultiLinkTypeForceMandatory> {
    return Entity.entityBuilder(TestEntityOtherMultiLink);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntityOtherMultiLink` entity type.
   * @returns A `TestEntityOtherMultiLink` request builder.
   */
  static requestBuilder(): TestEntityOtherMultiLinkRequestBuilder {
    return new TestEntityOtherMultiLinkRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityOtherMultiLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityOtherMultiLink`.
   */
  static customField(fieldName: string): CustomField<TestEntityOtherMultiLink> {
    return Entity.customFieldSelector(fieldName, TestEntityOtherMultiLink);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntityOtherMultiLinkType {
  keyProperty: string;
}

export interface TestEntityOtherMultiLinkTypeForceMandatory {
  keyProperty: string;
}

export namespace TestEntityOtherMultiLink {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY: StringField<TestEntityOtherMultiLink> = new StringField('KeyProperty', TestEntityOtherMultiLink, 'Edm.String');
  /**
   * All fields of the TestEntityOtherMultiLink entity.
   */
  export const _allFields: Array<StringField<TestEntityOtherMultiLink>> = [
    TestEntityOtherMultiLink.KEY_PROPERTY
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntityOtherMultiLink> = new AllFields('*', TestEntityOtherMultiLink);
  /**
   * All key fields of the TestEntityOtherMultiLink entity.
   */
  export const _keyFields: Array<Field<TestEntityOtherMultiLink>> = [TestEntityOtherMultiLink.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntityOtherMultiLink.
   */
  export const _keys: { [keys: string]: Field<TestEntityOtherMultiLink> } = TestEntityOtherMultiLink._keyFields.reduce((acc: { [keys: string]: Field<TestEntityOtherMultiLink> }, field: Field<TestEntityOtherMultiLink>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
