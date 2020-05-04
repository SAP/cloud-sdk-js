
import {
  AllFields,
  CustomField,
  Entity,
  EntityBuilderType, GetAllRequestBuilder,
  RequestBuilder,
  Selectable,
  StringField
} from '../../../packages/core/src';
import { ODataV4 } from '../../../packages/core/src/odata-v4';
import { GetAllRequestBuilderV4 } from '../../../packages/core/src/request-builder/get-all-request-builder-v4';
import { CollectionField } from '../../../packages/core/src/selectable/collection-field';


export class TestEntityV4 extends Entity<ODataV4> implements TestEntityTypeV4 {
  keyPropertyGuid: string;
  static requestBuilder(): TestEntityV4RequestBuilder {
    return new TestEntityV4RequestBuilder();
  }
  static _entityName = 'A_TestEntityV4';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for TestEntity.
   */
  static _serviceName = 'API_TEST_SRV_V$';
  static _version = new ODataV4();


  static builder(): EntityBuilderType<TestEntityV4, TestEntityV4TypeForceMandatory,ODataV4> {
    return Entity.entityBuilder(TestEntityV4);
  }
  static customField(fieldName: string): CustomField<TestEntityV4> {
    return Entity.customFieldSelector(fieldName, TestEntityV4);
  }
}


export interface TestEntityTypeV4 {
  keyPropertyGuid: string;
}

export interface TestEntityV4TypeForceMandatory {
  keyPropertyGuid: string;
}

export namespace TestEntityV4 {

  export const KEY_PROPERTY_GUID: StringField<TestEntityV4> = new StringField('KeyPropertyGuid', TestEntityV4, 'Edm.Guid');

  export const My_COLLECTION:CollectionField<TestEntityV4> = new CollectionField<TestEntityV4>('MyCollection',TestEntityV4,'Edm.String')

  export const _allFields: Array<StringField<TestEntityV4>> =
  [TestEntityV4.KEY_PROPERTY_GUID]

  export const ALL_FIELDS: AllFields<TestEntityV4> = new AllFields('*', TestEntityV4);
  /**
   * All key fields of the TestEntity entity.
   */
  export const _keyFields: Array<Selectable<TestEntityV4>> = [TestEntityV4.KEY_PROPERTY_GUID];

  export const _keys: { [keys: string]: Selectable<TestEntityV4> } = TestEntityV4._keyFields.reduce((acc: { [keys: string]: Selectable<TestEntityV4> }, field: Selectable<TestEntityV4>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}


export class TestEntityV4RequestBuilder extends RequestBuilder<TestEntityV4,ODataV4> {
  getAll(): GetAllRequestBuilderV4<TestEntityV4> {
    return new GetAllRequestBuilderV4(TestEntityV4);
  }
}

TestEntityV4.requestBuilder().getAll().execute({url:'foo'});

const foo = TestEntityV4.requestBuilder()._entityConstructor;


