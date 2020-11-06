/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { BatchRequestBuilder } from '../../src/odata-common';

describe('batch request builder', () => {
  it('initializes headers correctly', () => {
    const requestBuilder = new BatchRequestBuilder('path', [], {});
    expect(requestBuilder.requestConfig.contentType).toMatch(
      /multipart\/mixed; boundary=.*/
    );
  });
});
