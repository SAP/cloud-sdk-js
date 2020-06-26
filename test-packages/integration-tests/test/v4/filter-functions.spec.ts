/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { filterFunctions } from '@sap-cloud-sdk/core/v4';

describe('filter functions', () => {
  it('exports v2 specific functions', () => {
    expect(filterFunctions.contains).toBeDefined();
  });

  it('exports common functions', () => {
    expect(filterFunctions.substring).toBeDefined();
  });
});
