/*eslint-disable */


import { ODataV4 } from './odata-v4';
import { GetAllRequestBuilderV4 } from './request-builder/get-all-request-builder-v4';
import { CollectionField } from './selectable/collection-field';
import {
  AllFields,
  CustomField,
  Entity,
  EntityBuilderType,
  RequestBuilder,
  Selectable,
  StringField
} from './';

export class TestEntityV4 extends Entity<ODataV4> implements TestEntityTypeV4 {
  stringProperty: string;
  collectionProperty: string[];
  static requestBuilder(): TestEntityV4RequestBuilder {
    return new TestEntityV4RequestBuilder();
  }
  static _entityName = 'A_TestEntityV4';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for TestEntity.
   */
  static _serviceName = 'API_TEST_SRV_V4';
  static _version = new ODataV4();
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV_V4';

  static builder(): EntityBuilderType<
    TestEntityV4,
    TestEntityV4TypeForceMandatory,
    ODataV4
  > {
    return Entity.entityBuilder(TestEntityV4);
  }
  static customField(fieldName: string): CustomField<TestEntityV4, ODataV4> {
    return Entity.customFieldSelector(fieldName, TestEntityV4);
  }
}

export interface TestEntityTypeV4 {
  stringProperty: string;
  collectionProperty: string[];
}

export interface TestEntityV4TypeForceMandatory {
  stringProperty: string;
  collectionProperty: string[];
}

export namespace TestEntityV4 {
  export const STRING_PROPERTY: StringField<
    TestEntityV4,
    ODataV4
  > = new StringField('StringProperty', TestEntityV4, 'Edm.String');

  export const COLLECTION_PROPERTY: CollectionField<TestEntityV4> = new CollectionField<
    TestEntityV4
  >('CollectionProperty', TestEntityV4, 'Edm.String');

  export const _allFields: Selectable<TestEntityV4, ODataV4>[] = [
    TestEntityV4.STRING_PROPERTY,
    TestEntityV4.COLLECTION_PROPERTY
  ];

  export const ALL_FIELDS: AllFields<TestEntityV4, ODataV4> = new AllFields(
    '*',
    TestEntityV4
  );
  /**
   * All key fields of the TestEntity entity.
   */
  export const _keyFields: Selectable<TestEntityV4, ODataV4>[] = [
    TestEntityV4.STRING_PROPERTY
  ];

  export const _keys: {
    [keys: string]: Selectable<TestEntityV4, ODataV4>;
  } = TestEntityV4._keyFields.reduce(
    (
      acc: { [keys: string]: Selectable<TestEntityV4, ODataV4> },
      field: Selectable<TestEntityV4, ODataV4>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}

export class TestEntityV4RequestBuilder extends RequestBuilder<
  TestEntityV4,
  ODataV4
> {
  getAll(): GetAllRequestBuilderV4<TestEntityV4> {
    return new GetAllRequestBuilderV4(TestEntityV4);
  }
}
