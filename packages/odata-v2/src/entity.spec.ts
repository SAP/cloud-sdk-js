import { CommonEntity } from '@sap-cloud-sdk/odata-common/test/common-entity';
import { testEntityApiCustom } from '@sap-cloud-sdk/odata-v4/test/test-util';
import { customTestDeSerializers } from '../../../test-resources/test/test-util';
import {
  testEntityApi,
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
    const expected = new CommonEntity<
      CustomDeSerializers<typeof customTestDeSerializers>
    >(testEntityApiCustom.schema);
    expected.stringProperty = 25;
    expect(builder.build()).toEqual(expected);
  });
});
