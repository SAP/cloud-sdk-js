import {
  defaultDestination,
  mockGetRequest,
} from '../../../../test-resources/test/test-util';
import {
  testEntityResourcePath
} from '../../test/test-util';
import { getByKeyRequestBuilder } from '../../test/common-request-config';
import { commonEntityApi } from '../../test/common-entity';

describe('GetByKeyRequestBuilder', () => {

  describe('execute', () => {
    it('returns entity by key', async () => {
      const entityData = createOriginalTestEntityData1();
      const expected = createTestEntity(entityData);

      mockGetRequest(
        {
          path: testEntityResourcePath(
            expected.keyPropertyGuid,
            expected.keyPropertyString
          ),
          responseBody: { d: entityData }
        },
        commonEntityApi
      );

      const actual = await getByKeyRequestBuilder({keys: {
        KeyPropertyGuid: '123e4567-e89b-12d3-a456-426614174000',
        KeyPropertyString: 'ABCDE'
      }}).execute(defaultDestination);
      expect(actual).toEqual(expected);
      expect(actual.versionIdentifier).toBeUndefined();
    });
  });

});

export function createTestEntity(
  originalData: Record<string, any>
) {
  const entityBuilder = commonEntityApi.entityBuilder();

  if ('KeyPropertyGuid' in originalData) {
    entityBuilder.keyPropertyGuid(originalData.KeyPropertyGuid);
  }
  if ('KeyPropertyString' in originalData) {
    entityBuilder.keyPropertyString(originalData.KeyPropertyString);
  }
  if ('StringProperty' in originalData) {
    entityBuilder.stringProperty(originalData.StringProperty);
  }
  if ('Int16Property' in originalData) {
    entityBuilder.int16Property(originalData.Int16Property);
  }
  const entity = entityBuilder.build().setOrInitializeRemoteState();

  // if (originalData.to_SingleLink) {
  //   entity.toSingleLink = testEntitySingleLinkApi
  //     .entityBuilder()
  //     .keyProperty(originalData.to_SingleLink.KeyProperty)
  //     .build();
  // }
  //
  // if (originalData.to_MultiLink) {
  //   entity.toMultiLink = originalData.to_MultiLink.map(ml =>
  //     testEntityMultiLinkApi.entityBuilder().keyProperty(ml.KeyProperty).build()
  //   );
  // }

  return entity;
}

export function createOriginalTestEntityData1() {
  return {
    KeyPropertyGuid: '123e4567-e89b-12d3-a456-426614174000',
    KeyPropertyString: 'ABCDE',
    StringProperty: 'FGHIJ',
    BooleanProperty: false,
    Int16Property: 13
  };
}
