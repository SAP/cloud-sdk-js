import { TestEntityApi } from '@sap-cloud-sdk/test-services/v2/test-service/TestEntityApi';
import {
  testEntityMultiLinkApi,
  testEntitySingleLinkApi
} from '../test/test-util';

describe('remote state', () => {
  it('setOrInitializeRemoteState() sets remote state on entity', () => {
    const entity = new TestEntityApi()
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
