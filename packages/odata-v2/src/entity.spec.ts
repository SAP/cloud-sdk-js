import {
  testEntityApi,
  testEntityMultiLinkApi,
  testEntitySingleLinkApi
} from '../test/test-util';

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
