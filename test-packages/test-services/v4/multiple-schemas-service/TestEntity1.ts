/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntity1RequestBuilder } from './TestEntity1RequestBuilder';
import { TestComplexType1, TestComplexType1Field } from './TestComplexType1';
import { TestEnumType1 } from './TestEnumType1';
import {
  AllFields,
  CustomFieldV4,
  EntityBuilderType,
  EntityV4,
  EnumField,
  Field,
  NumberField,
  StringField
} from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "A_TestEntity1" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export class TestEntity1 extends EntityV4 implements TestEntity1Type {
  /**
   * Technical entity name for TestEntity1.
   */
  static _entityName = 'A_TestEntity1';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
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
   * Enum Property.
   * @nullable
   */
  enumProperty?: TestEnumType1;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestComplexType1;

  /**
   * Returns an entity builder to construct instances of `TestEntity1`.
   * @returns A builder that constructs instances of entity type `TestEntity1`.
   */
  static builder(): EntityBuilderType<TestEntity1, TestEntity1Type> {
    return EntityV4.entityBuilder(TestEntity1);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntity1` entity type.
   * @returns A `TestEntity1` request builder.
   */
  static requestBuilder(): TestEntity1RequestBuilder {
    return new TestEntity1RequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity1`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity1`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntity1> {
    return EntityV4.customFieldSelector(fieldName, TestEntity1);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntity1Type {
  keyPropertyString: string;
  int16Property?: number | null;
  enumProperty?: TestEnumType1 | null;
  complexTypeProperty?: TestComplexType1 | null;
}

export namespace TestEntity1 {
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_STRING: StringField<TestEntity1> = new StringField(
    'KeyPropertyString',
    TestEntity1,
    'Edm.String'
  );
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_16_PROPERTY: NumberField<TestEntity1> = new NumberField(
    'Int16Property',
    TestEntity1,
    'Edm.Int16'
  );
  /**
   * Static representation of the [[enumProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ENUM_PROPERTY: EnumField<TestEntity1> = new EnumField(
    'EnumProperty',
    TestEntity1
  );
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COMPLEX_TYPE_PROPERTY: TestComplexType1Field<TestEntity1> =
    new TestComplexType1Field('ComplexTypeProperty', TestEntity1);
  /**
   * All fields of the TestEntity1 entity.
   */
  export const _allFields: Array<
    | StringField<TestEntity1>
    | NumberField<TestEntity1>
    | EnumField<TestEntity1>
    | TestComplexType1Field<TestEntity1>
  > = [
    TestEntity1.KEY_PROPERTY_STRING,
    TestEntity1.INT_16_PROPERTY,
    TestEntity1.ENUM_PROPERTY,
    TestEntity1.COMPLEX_TYPE_PROPERTY
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntity1> = new AllFields(
    '*',
    TestEntity1
  );
  /**
   * All key fields of the TestEntity1 entity.
   */
  export const _keyFields: Array<Field<TestEntity1>> = [
    TestEntity1.KEY_PROPERTY_STRING
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntity1.
   */
  export const _keys: { [keys: string]: Field<TestEntity1> } =
    TestEntity1._keyFields.reduce(
      (
        acc: { [keys: string]: Field<TestEntity1> },
        field: Field<TestEntity1>
      ) => {
        acc[field._fieldName] = field;
        return acc;
      },
      {}
    );
}
