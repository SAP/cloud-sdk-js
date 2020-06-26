/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  filterFunctions,
  substring,
  substringOf,
  length
} from '@sap-cloud-sdk/core';

describe('filter functions', () => {
  it('exports v2 specific functions', () => {
    expect(filterFunctions.replace).toBeDefined();
  });

  it('exports common functions', () => {
    expect(filterFunctions.substring).toBeDefined();
  });

  it('exports length, substring, substringOf directly for backwards compatibility', () => {
    expect(substring).toBeDefined();
    expect(substringOf).toBeDefined();
    expect(length).toBeDefined();
  });
});
