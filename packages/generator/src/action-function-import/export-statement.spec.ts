import { EOL } from 'os';
import { orderBreakfast } from '../../test/test-util/data-model';
import { exportStatement } from './export-statement';

describe('export-statement', () => {
  it('exportStatement', () => {
    const actual = exportStatement([orderBreakfast], 'functionImports');

    expect(actual.declarationKind).toEqual('const');
    expect(actual.isExported).toBeTruthy();
    expect(actual.declarations).toEqual([
      { name: 'functionImports', initializer: `{\norderBreakfast${EOL}}` }
    ]);
  });
});
