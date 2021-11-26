import {
  TestEntity,
  TestEntityMultiLink,
  TestEntitySingleLink
} from '@sap-cloud-sdk/test-services/v2/test-service';

describe('entity', () => {
  describe('remote state', () => {
    it('setOrInitializeRemoteState() sets remote state on entity', () => {
      const entity = TestEntity.builder()
        .stringProperty('test')
        .toSingleLink(
          TestEntitySingleLink.builder().stringProperty('singleLink').build()
        )
        .toMultiLink([
          TestEntityMultiLink.builder().stringProperty('multiLink').build()
        ])
        .withCustomFields({ custom: 'custom' })
        .build()
        .setOrInitializeRemoteState();

      expect(entity['remoteState']).toStrictEqual(entity['asObject']());
      expect(entity.getUpdatedPropertyNames()).toStrictEqual([]);
    });
  });
});
