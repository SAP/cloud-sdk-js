import { TestEntity } from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import { customTestDeSerializers } from '../../../test-resources/test/test-util';
import {
  testEntityApi,
  testEntityApiCustom,
  testEntityMultiLinkApi,
  testEntitySingleLinkApi
} from '../test/test-util';
import { CustomDeSerializers } from './de-serializers';

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
