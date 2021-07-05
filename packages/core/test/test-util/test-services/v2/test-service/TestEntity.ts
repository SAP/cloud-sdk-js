/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityRequestBuilder } from './TestEntityRequestBuilder';
import { TestComplexType, TestComplexTypeField } from './TestComplexType';
import {
  AllFields,
  CustomFieldV2,
  EdmTypeShared,
  EntityBuilderType,
  EntityV2,
  Field,
  Link,
  OneToOneLink
} from '../../../../../src';

/**
 * This class represents the entity "A_TestEntity" of service "API_TEST_SRV".
 */
export class TestEntity extends EntityV2 implements TestEntityType {
  /**
   * Technical entity name for TestEntity.
   */
  static _entityName = 'A_TestEntity';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * Key Property Guid.
   */
  keyPropertyGuid!: string;
  /**
   * Key Property String.
   */
  keyPropertyString!: string;
  /**
   * Int 16 Property.
   * @nullable
   */
  int16Property?: number;
  /**
   * Something The Sdk Does Not Support.
   * @nullable
   */
  somethingTheSdkDoesNotSupport?: any;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestComplexType;
  /**
   * One-to-many navigation property to the [[TestEntityMultiLink]] entity.
   */
  toMultiLink!: TestEntityMultiLink[];
  /**
   * One-to-many navigation property to the [[TestEntityOtherMultiLink]] entity.
   */
  toOtherMultiLink!: TestEntityOtherMultiLink[];
  /**
   * One-to-one navigation property to the [[TestEntitySingleLink]] entity.
   */
  toSingleLink?: TestEntitySingleLink | null;

  /**
   * Returns an entity builder to construct instances of `TestEntity`.
   * @returns A builder that constructs instances of entity type `TestEntity`.
   */
  static builder(): EntityBuilderType<TestEntity, TestEntityType> {
    return EntityV2.entityBuilder(TestEntity);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntity` entity type.
   * @returns A `TestEntity` request builder.
   */
  static requestBuilder(): TestEntityRequestBuilder {
    return new TestEntityRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity`.
   */
  static customField<PropertyNullableT extends boolean>(
    fieldName: string,
    isNullable: PropertyNullableT
  ): CustomFieldV2<TestEntity, PropertyNullableT> {
    return EntityV2.customFieldSelector(fieldName, TestEntity, isNullable);
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
  TestEntityMultiLink,
  TestEntityMultiLinkType
} from './TestEntityMultiLink';
import {
  TestEntityOtherMultiLink,
  TestEntityOtherMultiLinkType
} from './TestEntityOtherMultiLink';
import {
  TestEntitySingleLink,
  TestEntitySingleLinkType
} from './TestEntitySingleLink';
import {
  SelectableEdmField,
  SelectableOrderableEdmField
} from '../../../../../src/odata-common/selectable';
import { FieldBuilder } from '../../../../../src/odata-common/selectable/field-builder';

export interface TestEntityType {
  keyPropertyGuid: string;
  keyPropertyString: string;
  int16Property?: number | null;
  somethingTheSdkDoesNotSupport?: any | null;
  complexTypeProperty?: TestComplexType | null;
  toMultiLink: TestEntityMultiLinkType[];
  toOtherMultiLink: TestEntityOtherMultiLinkType[];
  toSingleLink?: TestEntitySingleLinkType | null;
}

const fieldBuilder = new FieldBuilder(TestEntity);

export namespace TestEntity {
  /**
   * Static representation of the [[keyPropertyGuid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_GUID = fieldBuilder.buildEdmTypeField(
    'KeyPropertyGuid',
    'Edm.Guid',
    false
  );
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_STRING = fieldBuilder.buildEdmTypeField(
    'KeyPropertyString',
    'Edm.String',
    true
  );

  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_16_PROPERTY = fieldBuilder.buildEdmTypeField(
    'Int16Property',
    'Edm.Int16',
    true
  );

  /**
   * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SOMETHING_THE_SDK_DOES_NOT_SUPPORT =
    fieldBuilder.buildEdmTypeField(
      'SomethingTheSDKDoesNotSupport',
      'Edm.Any',
      false
    );
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COMPLEX_TYPE_PROPERTY = fieldBuilder.buildComplexTypeField(
    'ComplexTypeProperty',
    TestComplexTypeField,
    true
  );
  /**
   * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_MULTI_LINK: Link<TestEntity, TestEntityMultiLink> = new Link(
    'to_MultiLink',
    TestEntity,
    TestEntityMultiLink
  );
  /**
   * Static representation of the one-to-many navigation property [[toOtherMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_OTHER_MULTI_LINK: Link<TestEntity, TestEntityOtherMultiLink> =
    new Link('to_OtherMultiLink', TestEntity, TestEntityOtherMultiLink);
  /**
   * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_SINGLE_LINK: OneToOneLink<TestEntity, TestEntitySingleLink> =
    new OneToOneLink('to_SingleLink', TestEntity, TestEntitySingleLink);
  /**
   * All fields of the TestEntity entity.
   */
  export const _allFields: Array<
    | SelectableEdmField<TestEntity, EdmTypeShared<'any'>, boolean>
    | TestComplexTypeField<TestEntity, boolean>
    | Link<TestEntity, TestEntityMultiLink>
    | Link<TestEntity, TestEntityOtherMultiLink>
    | OneToOneLink<TestEntity, TestEntitySingleLink>
  > = [
    TestEntity.KEY_PROPERTY_GUID,
    TestEntity.KEY_PROPERTY_STRING,

    TestEntity.INT_16_PROPERTY,

    TestEntity.SOMETHING_THE_SDK_DOES_NOT_SUPPORT,
    TestEntity.COMPLEX_TYPE_PROPERTY,
    TestEntity.TO_MULTI_LINK,
    TestEntity.TO_OTHER_MULTI_LINK,
    TestEntity.TO_SINGLE_LINK
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntity> = new AllFields(
    '*',
    TestEntity
  );
  /**
   * All key fields of the TestEntity entity.
   */
  export const _keyFields: Array<Field<TestEntity, boolean>> = [
    TestEntity.KEY_PROPERTY_GUID,
    TestEntity.KEY_PROPERTY_STRING
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntity.
   */
  export const _keys: { [keys: string]: Field<TestEntity, boolean> } =
    TestEntity._keyFields.reduce(
      (
        acc: { [keys: string]: Field<TestEntity, boolean> },
        field: Field<TestEntity, boolean>
      ) => {
        acc[field._fieldName] = field;
        return acc;
      },
      {}
    );
}
