/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { orderBreakfast } from '../test-util/data-model';
import { exportStatement } from '../../src/action-function-import/export-statement';

describe('export-statement', () => {
  it('exportStatement', () => {
    const actual = exportStatement([orderBreakfast], 'functionImports');

    expect(actual.declarationKind).toEqual('const');
    expect(actual.isExported).toBeTruthy();
    expect(actual.declarations).toEqual([
      { name: 'functionImports', initializer: '{\norderBreakfast\n}' }
    ]);
  });
});
