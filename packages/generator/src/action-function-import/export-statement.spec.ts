import { unixEOL } from '@sap-cloud-sdk/util';
import { orderBreakfast } from '@sap-cloud-sdk/private-test-utils/data-model';
import { exportStatement } from './export-statement';

describe('export-statement', () => {
  it('exportStatement', () => {
    const actual = exportStatement([orderBreakfast], 'functionImports');

    expect(actual.declarationKind).toEqual('const');
    expect(actual.isExported).toBeTruthy();
    expect(actual.declarations).toEqual([
      { name: 'functionImports', initializer: `{\norderBreakfast${unixEOL}}` }
    ]);
  });
});
