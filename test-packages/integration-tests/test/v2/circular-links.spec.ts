import {
  TestEntityCircularLinkChild,
  TestEntityCircularLinkParent
} from '@sap-cloud-sdk/test-services/v2/test-service';

describe('Cyclic links', () => {
  it('should be defined', () => {
    expect(TestEntityCircularLinkParent.TO_CHILD._linkedEntity).toBeDefined();
    expect(TestEntityCircularLinkChild.TO_PARENT._linkedEntity).toBeDefined();
  });
});
