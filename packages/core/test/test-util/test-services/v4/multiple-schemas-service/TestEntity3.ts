/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntity3RequestBuilder } from './TestEntity3RequestBuilder';
import { TestComplexType2, TestComplexType2Field } from './TestComplexType2';
import { TestEnumType2 } from './TestEnumType2';
import {
  AllFields,
  Constructable,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  EnumField,
  Field,
  FieldBuilder
} from '../../../../../src';

/**
 * This class represents the entity "A_TestEntity3" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export class TestEntity3 extends EntityV4 implements TestEntity3Type {
  /**
   * Technical entity name for TestEntity3.
   */
  static _entityName = 'A_TestEntity3';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * Key Property String.
   */
  keyPropertyString!: string;
  /**
   * Enum Property.
   * @nullable
   */
  enumProperty?: TestEnumType2;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestComplexType2;

  /**
   * Returns an entity builder to construct instances of `TestEntity3`.
   * @returns A builder that constructs instances of entity type `TestEntity3`.
   */
  static builder(): EntityBuilderType<TestEntity3, TestEntity3Type> {
    return EntityV4.entityBuilder(TestEntity3);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntity3` entity type.
   * @returns A `TestEntity3` request builder.
   */
  static requestBuilder(): TestEntity3RequestBuilder {
    return new TestEntity3RequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity3`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity3`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntity3> {
    return EntityV4.customFieldSelector(fieldName, TestEntity3);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntity3Type {
  keyPropertyString: string;
  enumProperty?: TestEnumType2 | null;
  complexTypeProperty?: TestComplexType2 | null;
}

export namespace TestEntity3 {
  const _fieldBuilder: FieldBuilder<Constructable<TestEntity3>> =
    new FieldBuilder(TestEntity3);
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
   * Static representation of the [[enumProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ENUM_PROPERTY = _fieldBuilder.buildEnumField(
    'EnumProperty',
    TestEnumType2,
    true
  );
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COMPLEX_TYPE_PROPERTY = _fieldBuilder.buildComplexTypeField(
    'ComplexTypeProperty',
    TestComplexType2Field,
    true
  );
  /**
   * All fields of the TestEntity3 entity.
   */
  export const _allFields: Array<
    | EdmTypeField<TestEntity3, 'Edm.String', false, true>
    | EnumField<TestEntity3, TestEnumType2, true, true>
    | TestComplexType2Field<TestEntity3, true, true>
  > = [
    TestEntity3.KEY_PROPERTY_STRING,
    TestEntity3.ENUM_PROPERTY,
    TestEntity3.COMPLEX_TYPE_PROPERTY
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntity3> = new AllFields(
    '*',
    TestEntity3
  );
  /**
   * All key fields of the TestEntity3 entity.
   */
  export const _keyFields: Array<Field<TestEntity3, boolean, boolean>> = [
    TestEntity3.KEY_PROPERTY_STRING
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntity3.
   */
  export const _keys: { [keys: string]: Field<TestEntity3, boolean, boolean> } =
    TestEntity3._keyFields.reduce(
      (
        acc: { [keys: string]: Field<TestEntity3, boolean, boolean> },
        field: Field<TestEntity3, boolean, boolean>
      ) => {
        acc[field._fieldName] = field;
        return acc;
      },
      {}
    );
}
