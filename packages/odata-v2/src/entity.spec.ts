import { TestEntity } from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import {
  testEntityApi,
  testEntityApiCustom,
  testEntityMultiLinkApi,
  testEntitySingleLinkApi
} from '../test/test-util';
import type { customTestDeSerializers } from '../../../test-resources/test/test-util';
import type { CustomDeSerializers } from './de-serializers';

describe('entity', () => {
  it('returns enumerable false for _oDataVersion', () => {
    const entity = new TestEntity(testEntityApi);
    expect(
      Object.getOwnPropertyDescriptor(entity, '_oDataVersion')?.enumerable
    ).toBeFalsy();
    expect(entity['_oDataVersion']).toEqual('v2');
  });
});
describe('remote state', () => {
  it('setOrInitializeRemoteState() sets remote state on entity', () => {
    const entity = testEntityApi
      .entityBuilder()
      .stringProperty('test')
      .toSingleLink(
        testEntitySingleLinkApi
          .entityBuilder()
          .stringProperty('singleLink')
          .build()
      )
      .toMultiLink([
        testEntityMultiLinkApi
          .entityBuilder()
          .stringProperty('multiLink')
          .build()
      ])
      .withCustomFields({ custom: 'custom' })
      .build()
      .setOrInitializeRemoteState();

    expect(entity['remoteState']).toStrictEqual(entity['asObject']());
    expect(entity.getUpdatedPropertyNames()).toStrictEqual([]);
  });
});

describe('entity builder with custom (de-)serializers', () => {
  it('builds an entity', () => {
    const builder = testEntityApiCustom.entityBuilder();
    builder.stringProperty(25);
    const expected = new TestEntity<
      CustomDeSerializers<typeof customTestDeSerializers>
    >(testEntityApiCustom);
    expected.stringProperty = 25;
    expect(builder.build()).toEqual(expected);
  });
});
