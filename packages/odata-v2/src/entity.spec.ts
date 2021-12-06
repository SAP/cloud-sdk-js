import { TestEntityMultiLinkApi } from '@sap-cloud-sdk/test-services/v2/test-service';
import { TestEntityApi } from '@sap-cloud-sdk/test-services/v2/test-service/TestEntityApi';

describe('remote state', () => {
  it('setOrInitializeRemoteState() sets remote state on entity', () => {
    const entity = new TestEntityApi()
      .entityBuilder()
      .stringProperty('test')
      .toSingleLink(
        new TestEntitySingleLinkApi()
          .entityBuilder()
          .stringProperty('singleLink')
          .build()
      )
      .toMultiLink([
        new TestEntityMultiLinkApi()
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
