/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityRequestBuilder } from './TestEntityRequestBuilder';
import { Moment, Duration } from 'moment';
import { BigNumber } from 'bignumber.js';
import {
  AllFields,
  AnyField,
  BigNumberField,
  BooleanField,
  CollectionField,
  CustomFieldV4,
  DateField, DeSerializationMiddlewareInterface,
  DurationField,
  EntityBuilderType,
  EntityV4,
  EnumField,
  Field,
  NumberField,
  OneToManyLink,
  OneToOneLink,
  StringField,
  Time,
  TimeField
} from '../../../../../src';

/**
 * This class represents the entity "A_TestEntity" of service "API_TEST_SRV".
 */
export class TestEntity<T1 = string, T2 = number> extends EntityV4<T1, T2> implements TestEntityType<T1, T2> {
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
  stringProperty?: T1;
  int32Property?: T2;

  static builder<T1=string, T2=number>(): EntityBuilderType<TestEntity<T1, T2>, TestEntityType<T1, T2>>;
  static builder<newT1, newT2>(middleware: DeSerializationMiddlewareInterface<newT1, newT2>): EntityBuilderType<TestEntity<newT1, newT2>, TestEntityType<newT1, newT2>>;
  /**
   * Returns an entity builder to construct instances of `TestEntity`.
   * @returns A builder that constructs instances of entity type `TestEntity`.
   */
  static builder<T1, T2, newT1, newT2>(middleware?: DeSerializationMiddlewareInterface<newT1, newT2>){
    return middleware? EntityV4.entityBuilder(TestEntity) as EntityBuilderType<TestEntity<newT1, newT2>, TestEntityType<newT1, newT2>> : EntityV4.entityBuilder(TestEntity) as EntityBuilderType<TestEntity<T1, T2>, TestEntityType<T1, T2>>;
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
  static customField<T1, T2>(fieldName: string): CustomFieldV4<TestEntity<T1, T2>> {
    return EntityV4.customFieldSelector(fieldName, TestEntity) as CustomFieldV4<TestEntity<T1, T2>>;
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntityType<T1, T2> {
  keyPropertyGuid: string;
  keyPropertyString: string;
  stringProperty?: T1 | null;
  int32Property?: T2 | null;
}

export namespace TestEntity {
  /**
   * Static representation of the [[keyPropertyGuid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_GUID: StringField<TestEntity<any, any>> = new StringField('KeyPropertyGuid', TestEntity, 'Edm.Guid');
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_STRING: StringField<TestEntity<any, any>> = new StringField('KeyPropertyString', TestEntity, 'Edm.String');
  export const STRING_PROPERTY: StringField<TestEntity<any, any>> = new StringField('StringProperty', TestEntity, 'Edm.String');
  export const INT_32_PROPERTY: NumberField<TestEntity<any, any>> = new NumberField('Int32Property', TestEntity, 'Edm.Int32');
  /**
   * All fields of the TestEntity entity.
   */
  export const _allFields: Array< StringField<TestEntity> | NumberField<TestEntity> > = [
    TestEntity.KEY_PROPERTY_GUID,
    TestEntity.KEY_PROPERTY_STRING,
    TestEntity.STRING_PROPERTY,
    TestEntity.INT_32_PROPERTY,
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntity<any, any>> = new AllFields('*', TestEntity);
  /**
   * All key fields of the TestEntity entity.
   */
  export const _keyFields: Array<Field<TestEntity<any, any>>> = [TestEntity.KEY_PROPERTY_GUID, TestEntity.KEY_PROPERTY_STRING];
  /**
   * Mapping of all key field names to the respective static field property TestEntity.
   */
  export const _keys: { [keys: string]: Field<TestEntity<any, any>> } = TestEntity._keyFields.reduce((acc: { [keys: string]: Field<TestEntity<any, any>> }, field: Field<TestEntity<any, any>>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
