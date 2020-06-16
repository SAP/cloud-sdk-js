/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  TestEntityCircularLinkChild,
  TestEntityCircularLinkParent
} from '@sap-cloud-sdk/test-services/test-service';

describe('Cyclic links', () => {
  it('should be defined', () => {
    expect(TestEntityCircularLinkParent.TO_CHILD._linkedEntity).toBeDefined();
    expect(TestEntityCircularLinkChild.TO_PARENT._linkedEntity).toBeDefined();
  });
});
