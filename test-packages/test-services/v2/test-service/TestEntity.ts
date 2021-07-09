/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityRequestBuilder } from './TestEntityRequestBuilder';
import { Moment } from 'moment';
import { BigNumber } from 'bignumber.js';
import { TestComplexType, TestComplexTypeField } from './TestComplexType';
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
  OrderableEdmTypeField,
  Time
} from '@sap-cloud-sdk/core';

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
   * Int 32 Property.
   * @nullable
   */
  int32Property?: number;
  /**
   * Int 64 Property.
   * @nullable
   */
  int64Property?: BigNumber;
  /**
   * Decimal Property.
   * @nullable
   */
  decimalProperty?: BigNumber;
  /**
   * Single Property.
   * @nullable
   */
  singleProperty?: number;
  /**
   * Double Property.
   * @nullable
   */
  doubleProperty?: number;
  /**
   * Float Property.
   * @nullable
   */
  floatProperty?: number;
  /**
   * Time Property.
   * @nullable
   */
  timeProperty?: Time;
  /**
   * Date Time Property.
   * @nullable
   */
  dateTimeProperty?: Moment;
  /**
   * Date Time Off Set Property.
   * @nullable
   */
  dateTimeOffSetProperty?: Moment;
  /**
   * Byte Property.
   * @nullable
   */
  byteProperty?: number;
  /**
   * S Byte Property.
   * @nullable
   */
  sByteProperty?: number;
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
  static customField(fieldName: string): CustomFieldV2<TestEntity> {
    return EntityV2.customFieldSelector(fieldName, TestEntity);
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

export interface TestEntityType {
  keyPropertyGuid: string;
  keyPropertyString: string;
  stringProperty?: string | null;
  booleanProperty?: boolean | null;
  guidProperty?: string | null;
  int16Property?: number | null;
  int32Property?: number | null;
  int64Property?: BigNumber | null;
  decimalProperty?: BigNumber | null;
  singleProperty?: number | null;
  doubleProperty?: number | null;
  floatProperty?: number | null;
  timeProperty?: Time | null;
  dateTimeProperty?: Moment | null;
  dateTimeOffSetProperty?: Moment | null;
  byteProperty?: number | null;
  sByteProperty?: number | null;
  somethingTheSdkDoesNotSupport?: any | null;
  complexTypeProperty?: TestComplexType | null;
  toMultiLink: TestEntityMultiLinkType[];
  toOtherMultiLink: TestEntityOtherMultiLinkType[];
  toSingleLink?: TestEntitySingleLinkType | null;
}

export namespace TestEntity {
  const _fieldBuilder: FieldBuilder<Constructable<TestEntity>> =
    new FieldBuilder(TestEntity);
  /**
   * Static representation of the [[keyPropertyGuid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_GUID = _fieldBuilder.buildEdmTypeField(
    'KeyPropertyGuid',
    'Edm.Guid',
    false
  );
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_STRING = _fieldBuilder.buildEdmTypeField(
    'KeyPropertyString',
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
   * Static representation of the [[int32Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_32_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'Int32Property',
    'Edm.Int32',
    true
  );
  /**
   * Static representation of the [[int64Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_64_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'Int64Property',
    'Edm.Int64',
    true
  );
  /**
   * Static representation of the [[decimalProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DECIMAL_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'DecimalProperty',
    'Edm.Decimal',
    true
  );
  /**
   * Static representation of the [[singleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SINGLE_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'SingleProperty',
    'Edm.Single',
    true
  );
  /**
   * Static representation of the [[doubleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DOUBLE_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'DoubleProperty',
    'Edm.Double',
    true
  );
  /**
   * Static representation of the [[floatProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const FLOAT_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'FloatProperty',
    'Edm.Float',
    true
  );
  /**
   * Static representation of the [[timeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TIME_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'TimeProperty',
    'Edm.Time',
    true
  );
  /**
   * Static representation of the [[dateTimeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATE_TIME_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'DateTimeProperty',
    'Edm.DateTime',
    true
  );
  /**
   * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATE_TIME_OFF_SET_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'DateTimeOffSetProperty',
    'Edm.DateTimeOffset',
    true
  );
  /**
   * Static representation of the [[byteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BYTE_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'ByteProperty',
    'Edm.Byte',
    true
  );
  /**
   * Static representation of the [[sByteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const S_BYTE_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'SByteProperty',
    'Edm.SByte',
    true
  );
  /**
   * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SOMETHING_THE_SDK_DOES_NOT_SUPPORT =
    _fieldBuilder.buildEdmTypeField(
      'SomethingTheSDKDoesNotSupport',
      'Edm.Any',
      true
    );
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COMPLEX_TYPE_PROPERTY = _fieldBuilder.buildComplexTypeField(
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
    | EdmTypeField<TestEntity, 'Edm.Guid', false, true>
    | EdmTypeField<TestEntity, 'Edm.String', false, true>
    | EdmTypeField<TestEntity, 'Edm.String', true, true>
    | EdmTypeField<TestEntity, 'Edm.Boolean', true, true>
    | EdmTypeField<TestEntity, 'Edm.Guid', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.Int16', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.Int32', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.Int64', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.Decimal', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.Single', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.Double', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.Float', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.Time', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.DateTime', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.DateTimeOffset', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.Byte', true, true>
    | OrderableEdmTypeField<TestEntity, 'Edm.SByte', true, true>
    | EdmTypeField<TestEntity, 'Edm.Any', true, true>
    | TestComplexTypeField<TestEntity, true, true>
    | Link<TestEntity, TestEntityMultiLink>
    | Link<TestEntity, TestEntityOtherMultiLink>
    | OneToOneLink<TestEntity, TestEntitySingleLink>
  > = [
    TestEntity.KEY_PROPERTY_GUID,
    TestEntity.KEY_PROPERTY_STRING,
    TestEntity.STRING_PROPERTY,
    TestEntity.BOOLEAN_PROPERTY,
    TestEntity.GUID_PROPERTY,
    TestEntity.INT_16_PROPERTY,
    TestEntity.INT_32_PROPERTY,
    TestEntity.INT_64_PROPERTY,
    TestEntity.DECIMAL_PROPERTY,
    TestEntity.SINGLE_PROPERTY,
    TestEntity.DOUBLE_PROPERTY,
    TestEntity.FLOAT_PROPERTY,
    TestEntity.TIME_PROPERTY,
    TestEntity.DATE_TIME_PROPERTY,
    TestEntity.DATE_TIME_OFF_SET_PROPERTY,
    TestEntity.BYTE_PROPERTY,
    TestEntity.S_BYTE_PROPERTY,
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
  export const _keyFields: Array<Field<TestEntity, boolean, boolean>> = [
    TestEntity.KEY_PROPERTY_GUID,
    TestEntity.KEY_PROPERTY_STRING
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntity.
   */
  export const _keys: { [keys: string]: Field<TestEntity, boolean, boolean> } =
    TestEntity._keyFields.reduce(
      (
        acc: { [keys: string]: Field<TestEntity, boolean, boolean> },
        field: Field<TestEntity, boolean, boolean>
      ) => {
        acc[field._fieldName] = field;
        return acc;
      },
      {}
    );
}
