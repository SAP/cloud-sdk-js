import { unixEOL } from '@sap-cloud-sdk/util';
import { orderBreakfast } from '../../test/test-util/data-model';
import { exportStatement } from './export-statement';

describe('export-statement', () => {
  it('exportStatement', () => {
    const actual = exportStatement([orderBreakfast]);

    expect(actual.declarationKind).toEqual('const');
    expect(actual.isExported).toBeTruthy();
    expect(actual.declarations).toEqual([
      { name: 'operations', initializer: `{\norderBreakfast${unixEOL}}` }
    ]);
  });
});
