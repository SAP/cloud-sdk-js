import {
  TestEntity,
  TestEntityCircularLinkChild,
  TestEntityCircularLinkParent,
  TestEntityLvl2SingleLink,
  TestEntityMultiLink,
  TestEntitySingleLink
} from '../../test/test-util/test-services/v4/test-service';

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

  it('getCurrentMapKeys does not run endlessly', () => {
    const parent = TestEntityCircularLinkParent.builder()
      .keyProperty('parent')
      .build();
    const child1 = TestEntityCircularLinkChild.builder()
      .keyProperty('child1')
      .toParent(parent)
      .build();
    const child2 = TestEntityCircularLinkChild.builder()
      .keyProperty('child2')
      .toParent(parent)
      .build();

    parent.toFirstChild = child1;
    parent.toChildren = [child1, child2];

    expect(parent['getCurrentMapKeys']()).toEqual({
      keyProperty: 'parent',
      toFirstChild: {
        keyProperty: 'child1'
      },
      toChildren: [{ keyProperty: 'child1' }, { keyProperty: 'child2' }]
    });

    expect(child1['getCurrentMapKeys']()).toEqual({
      keyProperty: 'child1',
      toParent: {
        keyProperty: 'parent'
      }
    });
  });
});
