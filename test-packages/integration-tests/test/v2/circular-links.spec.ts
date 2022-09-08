import {
  testEntityCircularLinkChildApi,
  testEntityCircularLinkParentApi
} from './test-util';

describe('Cyclic links', () => {
  it('should be defined', () => {
    expect(
      testEntityCircularLinkParentApi.schema.TO_CHILD._linkedEntityApi
    ).toBeDefined();
    expect(
      testEntityCircularLinkChildApi.schema.TO_PARENT._linkedEntityApi
    ).toBeDefined();
  });
});
