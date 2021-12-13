import {
  testEntityApi, testEntityCircularLinkChildApi, testEntityCircularLinkParentApi,
  testEntityLvl2MultiLinkApi,
  testEntityMultiLinkApi,
  testEntitySingleLinkApi
} from '../test/test-util';

describe('entity', () => {
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
    ]
  };

  beforeEach(() => {
    entity = testEntityApi.entityBuilder()
      .stringProperty('1')
      .collectionProperty(['a', 'b'])
      .toSingleLink(
        testEntitySingleLinkApi.entityBuilder()
          .toSingleLink(
            testEntityLvl2MultiLinkApi.entityBuilder().stringProperty('test').build()
          )
          .withCustomFields({
            customField: 2
          })
          .build()
      )
      .toMultiLink([
        testEntityMultiLinkApi.entityBuilder()
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

  it('asObject', () => {
    const currentState = entity.asObject();

    expect(currentState).toEqual({ ...state, customField: 1 });
    expect(currentState.collectionProperty).not.toBe(entity.collectionProperty);
  });

  it('setOrInitializeRemoteState() sets specific state', () => {
    expect(entity.getUpdatedProperties()).toEqual(state);

    entity.setOrInitializeRemoteState(state);

    expect(entity.getUpdatedProperties()).toEqual({});
  });

  it('asObject() does not run endlessly', () => {
    const parent = testEntityCircularLinkParentApi.entityBuilder()
      .keyProperty('parent')
      .build();
    const child1 = testEntityCircularLinkChildApi.entityBuilder()
      .keyProperty('child1')
      .toParent(parent)
      .build();
    const child2 = testEntityCircularLinkChildApi.entityBuilder()
      .keyProperty('child2')
      .toParent(parent)
      .build();

    parent.toFirstChild = child1;
    parent.toChildren = [child1, child2];

    expect(parent['asObject']()).toEqual({
      keyProperty: 'parent',
      toFirstChild: {
        keyProperty: 'child1'
      },
      toChildren: [{ keyProperty: 'child1' }, { keyProperty: 'child2' }]
    });

    expect(child1['asObject']()).toEqual({
      keyProperty: 'child1',
      toParent: {
        keyProperty: 'parent'
      }
    });
  });
});
