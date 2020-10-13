import {
  TestEntity,
  TestEntityLvl2SingleLink,
  TestEntityMultiLink,
  TestEntitySingleLink
} from '../../test-util/test-services/v4/test-service';

describe('entity v4', () => {
  let entity;

  const state = {
    stringProperty: '1',
    collectionProperty: ['a', 'b'],
    toSingleLink: {
      toSingleLink: {
        stringProperty: 'test'
      },
      customField: 2
    },
    toMultiLink: [
      {
        booleanProperty: false,
        customField: 3
      }
    ],
    customField: 1
  };

  beforeEach(() => {
    entity = TestEntity.builder()
      .stringProperty('1')
      .collectionProperty(['a', 'b'])
      .toSingleLink(
        TestEntitySingleLink.builder()
          .toSingleLink(
            TestEntityLvl2SingleLink.builder().stringProperty('test').build()
          )
          .withCustomFields({
            customField: 2
          })
          .build()
      )
      .toMultiLink([
        TestEntityMultiLink.builder()
          .booleanProperty(false)
          .withCustomFields({
            customField: 3
          })
          .build()
      ])
      .withCustomFields({
        customField: 1
      })
      .build();
  });
  it('getCurrentMapKeys', () => {
    const currentState = entity.getCurrentMapKeys();

    expect(currentState).toEqual(state);
    expect(currentState.collectionProperty).not.toBe(entity.collectionProperty);
  });

  it('setOrInitializeRemoteState() sets specific state', () => {
    expect(entity.getUpdatedProperties()).toEqual(state);

    entity.setOrInitializeRemoteState(state);

    expect(entity.getUpdatedProperties()).toEqual({});
  });
});
