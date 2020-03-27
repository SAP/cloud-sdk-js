/* eslint-disable */



import { StringField } from './packages/core/src/selectable';
import { Entity } from './packages/core/src';
import { TestEntity, TestEntityMultiLink } from './packages/core/test/test-util/test-services/test-service';
import { asc } from './packages/core/dist/order';


const myValue1: StringField<TestEntity> = new StringField('name', TestEntity, 'Edm.String');

const myValue2: StringField<TestEntityMultiLink> = new StringField('name', TestEntityMultiLink, 'Edm.String');

function doSomeThingFields<T extends Entity>(...fields: StringField<T>[]) {
  return undefined;
}

doSomeThingFields(myValue1, myValue2);

TestEntityMultiLink.requestBuilder()
  .create(new TestEntityMultiLink())
  .asChildOf(new TestEntityMultiLink(), TestEntity.TO_MULTI_LINK);

TestEntity.requestBuilder().getAll().orderBy(
  asc(TestEntityMultiLink.STRING_PROPERTY)
)
