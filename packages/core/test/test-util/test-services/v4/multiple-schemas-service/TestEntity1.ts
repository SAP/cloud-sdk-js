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
  Constructable,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  EnumField,
  Field,
  FieldBuilder,
  OrderableEdmTypeField
} from '../../../../../src';

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
  const _fieldBuilder: FieldBuilder<Constructable<TestEntity1>> =
    new FieldBuilder(TestEntity1);
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
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_16_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'Int16Property',
    'Edm.Int16',
    true
  );
  /**
   * Static representation of the [[enumProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ENUM_PROPERTY = _fieldBuilder.buildEnumField(
    'EnumProperty',
    TestEnumType1,
    true
  );
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COMPLEX_TYPE_PROPERTY = _fieldBuilder.buildComplexTypeField(
    'ComplexTypeProperty',
    TestComplexType1Field,
    true
  );
  /**
   * All fields of the TestEntity1 entity.
   */
  export const _allFields: Array<
    | EdmTypeField<TestEntity1, 'Edm.String', false, true>
    | OrderableEdmTypeField<TestEntity1, 'Edm.Int16', true, true>
    | EnumField<TestEntity1, TestEnumType1, true, true>
    | TestComplexType1Field<TestEntity1, true, true>
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
  export const _keyFields: Array<Field<TestEntity1, boolean, boolean>> = [
    TestEntity1.KEY_PROPERTY_STRING
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntity1.
   */
  export const _keys: { [keys: string]: Field<TestEntity1, boolean, boolean> } =
    TestEntity1._keyFields.reduce(
      (
        acc: { [keys: string]: Field<TestEntity1, boolean, boolean> },
        field: Field<TestEntity1, boolean, boolean>
      ) => {
        acc[field._fieldName] = field;
        return acc;
      },
      {}
    );
}
